export const getProjects = () => {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : []; 
};



export const saveProject = (project) => {
  const existingProjects = getProjects();
  if (project.id) {

    const index = existingProjects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      existingProjects[index] = { ...existingProjects[index], ...project };
    }
  } else {

    project.id = existingProjects.length ? existingProjects[existingProjects.length - 1].id + 1 : 1;
    project.miembros = []; 
    project.tickets = []; 
    existingProjects.push(project);
  }


  localStorage.setItem('projects', JSON.stringify(existingProjects));
};

export const deleteProject = (projectId) => {
  const existingProjects = getProjects();
  const updatedProjects = existingProjects.filter(project => project.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(updatedProjects)); 
};