import React, { useState } from "react";

export default function Projects() {
  const initialProjects = [
    { name: 'reactの勉強' },
    { name: 'typescriptの勉強' },
  ];
  const [projects, setProjects] = useState(initialProjects);
  const [message, setMessage] = useState('');

  const handleAddProject = (name) => {
    setProjects(projects.concat([{name: name}]));
    setMessage(`${name}を追加しました`);
  }
  const handleDeleteProject = (name) => {
    setProjects(projects.filter((p) => p.name !== name));
    setMessage(`${name}を削除しました`);
  }

  const project_components = projects.map((project) => {
    return <li key={project.name}>{project.name} <DeleteForm onClick={handleDeleteProject} name={project.name}/></li>;
  });

  return (
    <div>
      <h2>Projects</h2>
      <p>{message}</p>
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
