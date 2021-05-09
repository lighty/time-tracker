import React, { useState } from "react";

const Tasks = () => {
  return (
    <div>
      <h2>Tasks</h2>
      <p>/* state.message */</p>
      <div><AddForm/></div>
    </div>
  );
}

const AddForm = (props) => {
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const projects = JSON.parse(localStorage.getItem('projects'));
  const projectOptions = projects.map(project => <option value={project.name}>{project.name}</option>);

  const handleNameChange = e => setName(e.target.value);
  const handleProjectNameChange = e => setProjectName(e.target.value);

  return (
    <form>
      <input type='text' value={name} onChange={handleNameChange} />
      <select onChange={handleProjectNameChange}>
        {projectOptions} 
      </select>
      <input type='submit' value='追加' />
    </form>
  );
}

export default Tasks;
