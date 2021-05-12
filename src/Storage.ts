import assert from 'assert';

export interface entry {
  id: number,
  isTracking: boolean,
  startAt: number,
  stopAt: number,
  task: task,
}

interface entryInStorage {
  id: number,
  isTracking: boolean,
  startAt: number,
  stopAt: number,
  taskId: number,
}

export const saveEntries = (entries: entry[]) => {
  const modEntries: entryInStorage[] = entries.map(e => {
    return { id: e.id, taskId: e.task.id, isTracking: e.isTracking, startAt: e.startAt, stopAt: e.stopAt };
  });
  localStorage.setItem('entries', JSON.stringify(modEntries));
};

export const loadEntries = (): entry[] => {
  const tasks: task[] = loadTasks();
  const entresJson = localStorage.getItem('entries');
  const entriesInStorage: entryInStorage[] = entresJson ? JSON.parse(entresJson) : [];

  return entriesInStorage.map(e => {
    const id = e.id;
    const task = tasks.find(t => t.id === e.taskId);
    assert(task);
    const isTracking = e.isTracking;
    const startAt = e.startAt;
    const stopAt = e.stopAt;
    return { id, task, isTracking, startAt, stopAt };
  });
};

export interface task {
  id: number,
  name: string,
  project: project,
}

interface taskInStorage {
  id: number,
  name: string,
  projectId: number,
}

export const saveTasks = (tasks: task[]) => {
  const modTasks: taskInStorage[] = tasks.map(t => {
    return { id: t.id, name: t.name, projectId: t.project.id };
  });
  localStorage.setItem('tasks', JSON.stringify(modTasks));
};

export const loadTasks = (): task[] => {
  const tasksJson = localStorage.getItem('tasks');
  const tasksInStorage: taskInStorage[] = tasksJson ? JSON.parse(tasksJson) : [];
  const projects = loadProjects();

  return tasksInStorage.map(t => {
    const project = projects.find(p => p.id === t.projectId);
    assert(project);
    return {
      id: t.id,
      name: t.name,
      project: project,
    };
  });
};

export interface project {
  id: number,
  name: string,
}

export const saveProjects = (projects: project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const loadProjects = (): project[] => {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : [];
};
