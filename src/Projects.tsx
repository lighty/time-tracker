import React, { useReducer, useState } from "react";
import numbering from './Numbering';
import { loadProjects, project, saveProjects } from './Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button,
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core';
import {  } from "@material-ui/core";

export interface projectState {
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
  if (projects.length > 0) {
    return { projects: projects, message: '' };
  } else {
    return initialArg;
  }
}

const reducer = (state: projectState, action: { type: string, name: string, id?: number }) => {
  switch (action.type) {
    case 'addProject': {
      const newProject = state.projects.concat([{ id: numbering(state.projects), name: action.name }]);
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

export default function Projects(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialProjectState, init);

  const handleAddProject = (name: string) => {
    dispatch({ type: 'addProject', name, id: undefined })
  }
  const handleDeleteProject = (id: number, name: string) => {
    dispatch({ type: 'deleteProject', id, name })
  }

  return (
    <div>
      <h2>Projects</h2>
      <p>{state.message}</p>
      <div><AddForm onSubmit={handleAddProject} /></div>
        {
          state.projects.map((project) => (
            <div key={project.name}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="baseline"
              >
                <Grid item xs={2}>
                  {project.name}
                </Grid>
                <Grid item xs={1}>
                  <DeleteForm onClick={handleDeleteProject} project={project} />
                </Grid>
              </Grid>
            </div>
          ))
        }
    </div >
  );
}

const AddForm: React.FC<{ onSubmit: Function }> = (props) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="baseline"
      >
        <Grid item xs={2}>
          <TextField type='text' value={value} onChange={handleChange} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" type='submit' value='追加'>追加</Button>
        </Grid>
      </Grid>
    </form>
  );
}

const DeleteForm: React.FC<{ onClick: Function, project: project }> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onClick(props.project.id, props.project.name);
  }

  return <IconButton onClick={handleClick} ><DeleteIcon /></IconButton>;
}
