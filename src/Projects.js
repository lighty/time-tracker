import React, { useState, useReducer } from "react";
import numbering from './Numbering';

const initialProjectState = {
  projects: [
    { id: 1, name: 'reactの勉強' },
    { id: 2, name: 'typescriptの勉強' },
  ],
  message: '',
};

const init = (initialArg) => {
  const projects = localStorage.getItem('projects')
  if (projects) {
    return { projects: JSON.parse(projects), message: '' };
  } else {
    return initialArg;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'addProject':
      const newProject = state.projects.concat([{id: numbering(state.projects), name: action.name}]);
      localStorage.setItem('projects', JSON.stringify(newProject));
      return {
        projects: newProject,
        message: `${action.name}を追加しました`,
      };
    case 'deleteProject':
      const newProject2 = state.projects.filter((p) => p.id !== action.id);
      localStorage.setItem('projects', JSON.stringify(newProject2));
      return {
        projects: newProject2,
        message: `${action.name}を削除しました`,
      };
    default:
      throw new Error();
  }
}

export default function Projects() {
  const [state, dispatch] = useReducer(reducer, initialProjectState, init);

  const handleAddProject = (name) => {
    dispatch({type: 'addProject', name})
  }
  const handleDeleteProject = (id, name) => {
    dispatch({type: 'deleteProject', id, name})
  }

  const project_components = state.projects.map((project) => {
    return <li key={project.name}>{project.name} <DeleteForm onClick={handleDeleteProject} project={project}/></li>;
  });

  return (
    <div>
      <h2>Projects</h2>
      <p>{state.message}</p>
      <div><AddForm onSubmit={handleAddProject}/></div>
      <ul>{project_components}</ul>
    </div>
  );
}

const AddForm = (props) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={value} onChange={handleChange} />
      <input type='submit' value='追加' />
    </form>
  );
}

const DeleteForm = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.project.id, props.project.name);
  }

  return <button onClick={handleClick}>削除</button>;
}
