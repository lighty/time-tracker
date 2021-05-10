import React, { useState, useReducer } from "react";
import dayjs from 'dayjs'

const initState = {
  entries: [
    {
      name: 'Entriesページの開発',
      projectName: 'Time Trackerの開発',
      isTracking: false,
      startAt: 1620652335350,
      stopAt:  1620652345350,
    }
  ],
  messsage: '',
};

const init = (initialArg) => {
  const entries = localStorage.getItem('entries')
  if (entries) {
    return { entries: JSON.parse(entries), message: '' };
  } else {
    return initialArg;
  }
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'addEntry':
      const newEntries = state.entries.concat([
        {
          name: action.name,
          projectName: action.projectName,
          isTracking: true,
          startAt: Date(),
          stopAt: null,
        }
      ]);
      localStorage.setItem('entries', JSON.stringify(newEntries));
      return {
        entries: newEntries,
        message: `${action.name}の計測を開始しました`,
      }
    default:
      throw new Error();
  }
}

const Entries = () => {
  const [state, dispatch] = useReducer(reducer, initState, init);
  const addEntry = (task) => {
    dispatch({type: 'addEntry', taskName: task.name, projectName: task.projectName});
  };
  const entries = state.entries.map(e => <li><Entry entry={e}/></li>);
  return (
    <div>
      <h2>Entries</h2>
      <p>state.message</p>
      <div><AddForm onSubmit={addEntry}/></div>
      <ul>{entries}</ul>
    </div>
  );
}

const Entry = (props) => {
  const entry = props.entry;

  const startAt = dayjs(entry.startAt).format('HH:mm:ss');
  const stopAt = dayjs(entry.stopAt).format('HH:mm:ss');
  const elapseTime = dayjs((entry.stopAt - entry.startAt) - (9 * 60 * 60 * 1000)).format('HH:mm:ss')

  return (
    <div>
      <p>{entry.name} [{entry.projectName}]</p>
      <p>{startAt} - {stopAt} ({elapseTime})</p>
    </div>
  );
}

const AddForm = (props) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const [taskName, setTaskName] = useState(tasks[0].name);
  const taskOptions = tasks.map(task => {
    return <option value={task.name} key={task.name}>{task.name} [{task.projectName}]</option>;
  });

  const handleTaskNameChange = e => setTaskName(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(tasks.find(t => t.name === taskName));
    setTaskName(tasks[0].name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={handleTaskNameChange} value={taskName}>
        {taskOptions} 
      </select>
      <input type='submit' value='計測開始' />
    </form>
  );
}

export default Entries;
