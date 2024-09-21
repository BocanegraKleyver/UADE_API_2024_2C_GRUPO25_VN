import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { getProjects, saveProject, deleteProject } from '../services/projectService';
import '../css/ProjectDashboard.css';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const loadedProjects = await getProjects(); // Cargar proyectos al iniciar
      setProjects(loadedProjects);
    };

    loadProjects();
  }, []);

  const handleSaveProject = async (project) => {
    await saveProject(project);
    const loadedProjects = await getProjects(); // Actualiza la lista de proyectos después de guardar
    setProjects(loadedProjects);
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProject(projectId);
    const loadedProjects = await getProjects(); // Actualiza la lista de proyectos
    setProjects(loadedProjects);
  };

  const handleFinalizeProject = async (project) => {
    const updatedProject = { ...project, estado: "finalizado" };
    await saveProject(updatedProject);
    const loadedProjects = await getProjects(); // Actualiza la lista de proyectos
    setProjects(loadedProjects);
  };

  return (
    <div className="container">
      <h2>Dashboard de Proyectos</h2>
      <ProjectForm onSave={handleSaveProject} />
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <Link to={`/project/${project.id}`} className="project-link">
              {project.nombre}
            </Link>
            <button onClick={() => handleFinalizeProject(project)} className="finalize-button">
              ✓ {/* Tilde OK */}
            </button>
            <button onClick={() => handleDeleteProject(project.id)} className="delete-button">
              ✖ {/* X para eliminar */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDashboard;
