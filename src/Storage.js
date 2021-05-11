export const saveEntries = (entries) => {
  const modEntries = entries.map(e => {
    return { id: e.id, taskId: e.task.id, isTracking: e.isTracking, startAt: e.startAt, stopAt: e.stopAt };
  });
  localStorage.setItem('entries', JSON.stringify(modEntries));
};

export const loadEntries = () => {
  const tasks = loadTasks();
  const projects = loadProjects();
  const entries = JSON.parse(localStorage.getItem('entries'));

  if(entries) {
    return entries.map(e => {
      const id = e.id;
      const task = tasks.find(t => t.id === e.taskId);
      const project = projects.find(p => p.id === task.projectId);
      const isTracking = e.isTracking;
      const startAt = e.startAt;
      const stopAt = e.stopAt;
      return { id, task, project, isTracking, startAt, stopAt };
    });
  }
};

export const saveTasks = (tasks) => {
  const modTasks = tasks.map(t => {
    return { id: t.id, name: t.name, projectId: t.project.id };
  });
  localStorage.setItem('tasks', JSON.stringify(modTasks));
};

export const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const projects = loadProjects();
  if (tasks) {
    return tasks.map(t => {
      return {
        id: t.id,
        name: t.name,
        project: projects.find(p => p.id === t.projectId),
      };
    });
  }
};

export const saveProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const loadProjects = () => {
  return JSON.parse(localStorage.getItem('projects'));
};
