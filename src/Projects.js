import React, { useState, useReducer } from "react";

const initialState = {
  projects: [
    { name: 'reactの勉強' },
    { name: 'typescriptの勉強' },
  ],
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'addProject':
      return {
        projects: state.projects.concat([{name: action.name}]),
        message: `${action.name}を追加しました`,
      };
    case 'deleteProject':
      return {
        projects: state.projects.filter((p) => p.name !== action.name),
        message: `${action.name}を削除しました`,
      };
    default:
      throw new Error();
  }
}

export default function Projects() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddProject = (name) => {
    dispatch({type: 'addProject', name: name})
  }
  const handleDeleteProject = (name) => {
    dispatch({type: 'deleteProject', name: name})
  }

  const project_components = state.projects.map((project) => {
    return <li key={project.name}>{project.name} <DeleteForm onClick={handleDeleteProject} name={project.name}/></li>;
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

function AddForm(props){
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

function DeleteForm(props) {
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.name);
  }

  return <button onClick={handleClick}>削除</button>;
}
