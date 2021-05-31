import React, { useState, useReducer } from "react";
import numbering from './Numbering';
import { saveTasks, loadTasks, loadProjects, task, project} from './Storage';

export interface taskState {
  tasks: task[];
  message: string;
}

const init = () => {
  return { tasks: loadTasks(), message: '' };
}

type add_task_action  = {
  type: 'addTask';
  name: string;
  project: project;
};

type delete_task_action = {
  type: 'deleteTask';
  name: string;
  id: number;
};
const reducer = (state: taskState, action: add_task_action | delete_task_action ) => {
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

const Tasks = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, null, init);
  const deleteTask = (id: number, name: string) => {
    dispatch({ type: 'deleteTask', id, name });
  };
  const tasks: JSX.Element[] = state.tasks.map(task => {
    return (
      <li key={task.id}>
        {task.name} [{task.project.name}] <DeleteForm onClick={deleteTask} id={task.id} name={task.name}/>
      </li>
    );
  });
  const addTask = (name: string, project: project) => {
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

const AddForm = (props: { onSubmit: (name: string, project: project) => void }) => {
  const [name, setName] = useState('');
  const projects = loadProjects();
  const [project, setProject] = useState(projects[0]);
  const projectOptions = projects.map(project => {
    return <option value={project.id} key={project.id}>{project.name}</option>;
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleProjectChange = (e: { target: { value: string; }; }) => {
    const project = projects.find(p => p.id === parseInt(e.target.value));
    if(project) { setProject(project); }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

const DeleteForm = (props: { onClick: (id: number, name: string) => void; id: number; name: string; }): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onClick(props.id, props.name);
  }

  return <button onClick={handleClick}>削除</button>;
}

export default Tasks;
