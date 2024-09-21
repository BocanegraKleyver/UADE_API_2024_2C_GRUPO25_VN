import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { getProjects, saveProject } from '../services/projectService';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadedProjects = getProjects(); // Cargar proyectos al iniciar
    setProjects(loadedProjects);
  }, []);

  const handleSaveProject = (project) => {
    saveProject(project);
    setProjects(getProjects()); // Actualiza la lista de proyectos después de guardar
  };

  return (
    <div>
      <h2>Dashboard de Proyectos</h2>
      <ProjectForm onSave={handleSaveProject} />
      <ul>
  {projects.map((project) => (
    <li key={project.id}>
      <Link to={`/project/${project.id}`}>{project.nombre}</Link>
    </li>
  ))}
</ul>

    </div>
  );
};

export default ProjectDashboard;
