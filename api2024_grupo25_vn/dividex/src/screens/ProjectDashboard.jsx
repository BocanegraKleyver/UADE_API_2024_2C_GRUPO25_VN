import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { getProjects, saveProject, deleteProject } from '../services/projectService';
import '../css/ProjectDashboard.css';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const loadedProjects = await getProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  const handleSaveProject = async (project) => {
    try {
      await saveProject(project);
      const loadedProjects = await getProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      const loadedProjects = await getProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFinalizeProject = async (project) => {
    const updatedProject = { ...project, estado: "finalizado" };
    try {
      await saveProject(updatedProject);
      const loadedProjects = await getProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error finalizing project:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h2>Dashboard de Proyectos</h2>
        <button onClick={() => navigate('/home')} className="back-button">
          Volver a Home
        </button>
      </header>
      <ProjectForm onSave={handleSaveProject} />
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <Link to={`/project/${project.id}`} className="project-link">
              {project.nombre}
            </Link>
            <button onClick={() => handleFinalizeProject(project)} className="finalize-button">
              ✓
            </button>
            <button onClick={() => handleDeleteProject(project.id)} className="delete-button">
              ✖ 
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDashboard;
