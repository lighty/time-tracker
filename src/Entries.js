import React, { useState, useReducer, useEffect } from "react";
import numbering from './Numbering';
import { loadTasks, saveEntries, loadEntries } from './Storage';
import dayjs from 'dayjs';

const init = () => {
  const entries = loadEntries();
  return { entries, message: '' };
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'addEntry': {
      const newEntries = state.entries.concat([
        {
          id: numbering(state.entries),
          task: action.task,
          isTracking: true,
          startAt: dayjs().valueOf(),
          stopAt: null,
        }
      ]);
      saveEntries(newEntries);
      return {
        entries: newEntries,
        message: `【${action.task.name}】の計測を開始しました`,
      }
    }
    case 'deleteEntry': {
      const newEntries = state.entries.filter(e => e.id !== action.entry.id);
      saveEntries(newEntries);
      const startAt = dayjs(action.entry.startAt).format('HH:mm:ss');
      return {
        entries: newEntries,
        message: `${action.entry.task.name} ${startAt} - を削除しました`,
      }
    }
    case 'stopTimer': {
      const entry = state.entries.find(e => e.id === action.entry.id);
      entry.stopAt = action.stopAt;
      entry.isTracking = false;
      const newEntries = state.entries.filter(e => e.id !== action.entry.id).concat(entry)

      saveEntries(newEntries);
      return {
        entries: newEntries,
        message: `【${action.entry.task.name}】の計測を停止しました`,
      }
    }
    default:
      throw new Error();
  }
}

const Entries = () => {
  const [state, dispatch] = useReducer(reducer, null, init);

  const addEntry = task => dispatch({ type: 'addEntry', task });
  const stopTimer = (entry, stopAt) => dispatch({type: 'stopTimer', entry, stopAt});
  const deleteEntry = entry => dispatch({type: 'deleteEntry', entry});

  const entryList = state.entries.sort((a, b) => b.id - a.id).map(e => (
    <li key={e.id}>
      <Entry entry={e} onTimerStop={stopTimer} onDelete={deleteEntry} key={e.id}/>
    </li>
  ));
  const notTracking = state.entries.every(e => !e.isTracking);
  return (
    <div>
      <h2>Entries</h2>
      <p>{state.message}</p>
      <div>{ notTracking && <AddForm onSubmit={addEntry}/> }</div>
      <ul>{entryList}</ul>
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

  const handleTimerStop = () => props.onTimerStop(entry, dayjs().valueOf());
  const handleDelete = () => props.onDelete(entry);

  return (
    <div>
      <p>{entry.task.name} [{entry.task.project.name}]</p>
      <p>{startAt} - {stopAt} ({elapseTime})</p>
      { entry.isTracking && <button onClick={handleTimerStop}>停止</button> }
      <DeleteForm onClick={handleDelete}/>
    </div>
  );
}

const DeleteForm = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.entry);
  }
  return <button onClick={handleClick}>削除</button>;
}

const AddForm = (props) => {
  const tasks = loadTasks();
  const [task, setTask] = useState(tasks[0]);
  const taskOptions = tasks.map(task => {
    return <option value={task.id} key={task.id}>{task.name} [{task.project.name}]</option>;
  });

  const handleTaskChange = e => setTask(tasks.find(t => t.id === parseInt(e.target.value)));
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(task);
    setTask(tasks[0]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={handleTaskChange} value={task.id}>
        {taskOptions} 
      </select>
      <input type='submit' value='計測開始' />
    </form>
  );
}

export default Entries;
