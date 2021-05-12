import React, { useState, useReducer } from "react";
import numbering from './Numbering';
import { saveProjects, loadProjects } from './Storage';

interface project {
  id: number,
  name: string,
}

interface projectState {
  projects: project[];
  message: string;
}

const initialProjectState: projectState = {
  projects: [
    { id: 1, name: 'reactの勉強' },
    { id: 2, name: 'typescriptの勉強' },
  ],
  message: '',
};

const init = (initialArg: projectState): projectState => {
  const projects = loadProjects();
  if (projects) {
    return { projects: projects, message: '' };
  } else {
    return initialArg;
  }
}

const reducer = (state: projectState, action: { type: string, name: string, id?: number } ) => {
  switch (action.type) {
    case 'addProject': {
      const newProject = state.projects.concat([{id: numbering(state.projects), name: action.name}]);
      saveProjects(newProject);
      return {
        projects: newProject,
        message: `${action.name}を追加しました`,
      };
    }
    case 'deleteProject': {
      const newProject = state.projects.filter((p) => p.id !== action.id);
      saveProjects(newProject);
      return {
        projects: newProject,
        message: `${action.name}を削除しました`,
      };
    }
    default:
      throw new Error();
  }
}

export default function Projects() {
  const [state, dispatch] = useReducer(reducer, initialProjectState, init);

  const handleAddProject = (name: string) => {
    dispatch({type: 'addProject', name, id: undefined })
  }
  const handleDeleteProject = (id: number, name: string) => {
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

const AddForm: React.FC<{onSubmit: Function}> = (props) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

const DeleteForm: React.FC<{onClick: Function, project:project}> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onClick(props.project.id, props.project.name);
  }

  return <button onClick={handleClick}>削除</button>;
}
