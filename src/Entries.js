import React, { useState, useReducer, useEffect } from "react";
import dayjs from 'dayjs'

const initState = {
  entries: [
    {
      taskName: 'Entriesページの開発',
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
          taskName: action.taskName,
          projectName: action.projectName,
          isTracking: true,
          startAt: dayjs().valueOf(),
          stopAt: null,
        }
      ]);
      localStorage.setItem('entries', JSON.stringify(newEntries));
      return {
        entries: newEntries,
        message: `【${action.taskName}】の計測を開始しました`,
      }
    case 'stopTimer':
      const entry = state.entries.find(e => e.taskName === action.taskName);
      entry.stopAt = action.stopAt;
      entry.isTracking = false;
      const newEntries2 = state.entries.filter(e => e.taskName !== action.taskName).concat(entry)

      localStorage.setItem('entries', JSON.stringify(newEntries2));
      return {
        entries: newEntries2,
        message: `【${action.taskName}】の計測を停止しました`,
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
  const stopTimer = (taskName, stopAt) => {
    dispatch({type: 'stopTimer', taskName, stopAt});
  };
  const entries = state.entries.map(e => <li key={e.taskName}><Entry entry={e} onTimerStop={stopTimer}/></li>);
  return (
    <div>
      <h2>Entries</h2>
      <p>{state.message}</p>
      <div><AddForm onSubmit={addEntry}/></div>
      <ul>{entries}</ul>
    </div>
  );
}

const Entry = (props) => {
  const entry = props.entry;

  const startAt = dayjs(entry.startAt).format('HH:mm:ss');
  const stopAt = entry.isTracking ? '' : dayjs(entry.stopAt).format('HH:mm:ss');

  const diffFrom = (from) => {
    return dayjs((from - entry.startAt) - (9 * 60 * 60 * 1000)).format('HH:mm:ss');
  };

  const initialState = entry.isTracking ? diffFrom(dayjs().valueOf()) : diffFrom(entry.stopAt);
  const [elapseTime, setElapseTime] = useState(initialState);

  useEffect(() => {
    if (entry.isTracking) {
      const timer = setInterval(() => {
        setElapseTime(diffFrom(dayjs().valueOf()));
      }, 1000);

      return () => clearInterval(timer);
    }
  });

  const handleTimerStop = () => props.onTimerStop(entry.taskName, dayjs().valueOf());

  return (
    <div>
      <p>{entry.taskName} [{entry.projectName}]</p>
      <p>{startAt} - {stopAt} ({elapseTime})</p>
      { entry.isTracking && <button onClick={handleTimerStop}>停止</button> }
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
