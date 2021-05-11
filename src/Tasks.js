import React, { useState, useReducer } from "react";
import numbering from './Numbering';
import { saveTasks, loadTasks, loadProjects } from './Storage';

const initTaskState = {
  tasks: [],
  messsage: '',
};

const init = (initialArg) => {
  const tasks = loadTasks();
  if (tasks) {
    // projectはlocalStorageに入れるときはidで、取り出したときはnameにする
    return { tasks: tasks, message: '' };
  } else {
    return initialArg;
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'addTask': {
      const newTasks = state.tasks.concat([{id: numbering(state.tasks), name: action.name, project: action.project}]);
      saveTasks(newTasks);
      return {
        tasks: newTasks,
        message: `${action.name}を追加しました`,
      }
    }
    case 'deleteTask': {
      const newTasks = state.tasks.filter(t => t.id !== action.id);
      saveTasks(newTasks);
      return {
        tasks: newTasks,
        message: `${action.name}を削除しました`,
      }
    }
    default:
      throw new Error();
  }
}

const Tasks = () => {
  const [state, dispatch] = useReducer(reducer, initTaskState, init);
  const deleteTask = (id, name) => {
    dispatch({type: 'deleteTask', id, name});
  };
  const tasks = state.tasks.map(task => {
    return (
      <li key={task.id}>
        {task.name} [{task.project.name}] <DeleteForm onClick={deleteTask} id={task.id} name={task.name}/>
      </li>
    );
  });
  const addTask = (name, project) => {
    dispatch({type: 'addTask', name: name, project: project});
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
  const projects = loadProjects();
  const [project, setProject] = useState(projects[0]);
  const projectOptions = projects.map(project => {
    return <option value={project.id} key={project.id}>{project.name}</option>;
  });

  const handleNameChange = e => setName(e.target.value);
  const handleProjectChange = e => {
    setProject(projects.find(p => p.id === parseInt(e.target.value)));
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(name, project);
    setName('');
    setProject(projects[0]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={handleNameChange} />
      <select onChange={handleProjectChange} value={project.id}>
        {projectOptions} 
      </select>
      <input type='submit' value='追加' />
    </form>
  );
}

const DeleteForm = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.id, props.name);
  }

  return <button onClick={handleClick}>削除</button>;
}

export default Tasks;
