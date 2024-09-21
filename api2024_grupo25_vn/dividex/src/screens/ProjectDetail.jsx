import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import { getProjects, saveProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import '../css/ProjectDetail.css';
import { getUsers } from '../services/userService'; // Asegúrate de tener esta función

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [proyecto, setProyecto] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Nuevo estado para el usuario seleccionado

  useEffect(() => {
    const projects = getProjects();
    const proyectoEncontrado = projects.find(p => p.id === parseInt(id));
    setProyecto(proyectoEncontrado);
    if (proyectoEncontrado) {
      setMiembros(proyectoEncontrado.miembros);
      setTickets(proyectoEncontrado.tickets);
    }
    
    // Cargar usuarios al iniciar el componente
    setUsuarios(getUsers());
  }, [id]);

  const handleAddMember = () => {
    if (usuarioSeleccionado) {
      const updatedMiembros = [...miembros, usuarioSeleccionado];
      setMiembros(updatedMiembros);
      saveProject({ ...proyecto, miembros: updatedMiembros });
      setUsuarioSeleccionado(null); // Reiniciar el estado del usuario seleccionado
    }
  };
  const handleRemoveMember = (miembro) => {
    const updatedMiembros = miembros.filter((m) => m.email !== miembro.email); // Cambiado para usar un atributo único
    setMiembros(updatedMiembros);
    saveProject({ ...proyecto, miembros: updatedMiembros });
  };


  if (!proyecto) return <div>No se encontró el proyecto.</div>;

  return (
    <div className="project-detail">
      <h2 className="project-title">Proyecto: {proyecto.nombre}</h2>
      <p className="project-description">Descripción: {proyecto.descripcion}</p>
      
      <MemberList 
  miembros={miembros} 
  onAddMember={handleAddMember} 
  onRemoveMember={handleRemoveMember} 
  usuarios={usuarios} 
/>
      
     
  
      <div className="action-buttons">
        <button className="button" onClick={() => navigate(`/ticket/${id}`)}>Agregar Ticket</button>
      </div>
  
      <ExpenseTable tickets={tickets} />
      <button className="button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProjectDetail;
