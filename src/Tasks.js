import React, { useState, useReducer } from "react";

const initTaskState = {
  tasks: [
    {name: 'Taskページを作る', projectName: 'TimeTrackerの開発'},
  ],
  messsage: '',
};

const init = (initialArg) => {
  const tasks = localStorage.getItem('tasks')
  if (tasks) {
    return { tasks: JSON.parse(tasks), message: '' };
  } else {
    return initialArg;
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'addTask':
      const newTasks = state.tasks.concat([{name: action.name, projectName: action.projectName}]);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return {
        tasks: newTasks,
        message: `${action.name}を追加しました`,
      }
    case 'deleteTask':
      const newTasks2 = state.tasks.filter(t => t.name !== action.name);
      localStorage.setItem('tasks', JSON.stringify(newTasks2));
      return {
        tasks: newTasks2,
        message: `${action.name}を削除しました`,
      }
    default:
      throw new Error();
  }
}

const Tasks = () => {
  const [state, dispatch] = useReducer(reducer, initTaskState, init);
  const deleteTask = (name) => {
    dispatch({type: 'deleteTask', name: name});
  };
  const tasks = state.tasks.map(task => {
    return (
      <li key={task.name}>
        {task.name} [{task.projectName}] <DeleteForm onClick={deleteTask} name={task.name}/>
      </li>
    );
  });
  const addTask = (name, projectName) => {
    dispatch({type: 'addTask', name: name, projectName: projectName});
  }
  return (
    <div>
      <h2>Tasks</h2>
      <p>{state.message}</p>
      <div><AddForm onSubmit={addTask}/></div>
      <ul>{tasks}</ul>
    </div>
  );
}

const AddForm = (props) => {
  const [name, setName] = useState('');
  const projects = JSON.parse(localStorage.getItem('projects'));
  const [projectName, setProjectName] = useState(projects[0].name);
  const projectOptions = projects.map(project => {
    return <option value={project.name} key={project.name}>{project.name}</option>;
  });

  const handleNameChange = e => setName(e.target.value);
  const handleProjectNameChange = e => setProjectName(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(name, projectName);
    setName('');
    setProjectName(projects[0].name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={handleNameChange} />
      <select onChange={handleProjectNameChange} value={projectName}>
        {projectOptions} 
      </select>
      <input type='submit' value='追加' />
    </form>
  );
}

const DeleteForm = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.name);
  }

  return <button onClick={handleClick}>削除</button>;
}

export default Tasks;
