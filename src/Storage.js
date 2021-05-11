export const saveEntries = (entiries) => {
  localStorage.setItem('entiries', JSON.stringify(entiries));
};

export const loadEntries = () => {
  return JSON.parse(localStorage.getItem('entiries'));
};

export const saveTasks = (tasks) => {
  const modTasks = tasks.map(t => {
    return { id: t.id, name: t.name, projectId: t.project.id };
  });
  localStorage.setItem('tasks', JSON.stringify(modTasks));
};

export const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const projects = JSON.parse(localStorage.getItem('projects'));
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
