// services/projectService.js

export const getProjects = () => {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : []; // Cargar del local storage
};



export const saveProject = (project) => {
  const existingProjects = getProjects();
  if (project.id) {
    // Actualizar proyecto existente
    const index = existingProjects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      existingProjects[index] = { ...existingProjects[index], ...project };
    }
  } else {
    // Asignar un nuevo ID y agregar el proyecto
    project.id = existingProjects.length ? existingProjects[existingProjects.length - 1].id + 1 : 1; // Incrementar ID
    project.miembros = []; // Inicializa miembros como un arreglo vacío
    project.tickets = []; // Inicializa tickets como un arreglo vacío
    existingProjects.push(project);
  }

  // Guarda los proyectos actualizados en el local storage
  localStorage.setItem('projects', JSON.stringify(existingProjects));
};

export const deleteProject = (projectId) => {
  const existingProjects = getProjects();
  const updatedProjects = existingProjects.filter(project => project.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(updatedProjects)); // Guarda los proyectos actualizados
};