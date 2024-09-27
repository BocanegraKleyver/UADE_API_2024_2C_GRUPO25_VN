import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import { getProjects, saveProject } from '../services/projectService';
import { AuthContext } from '../context/AuthContext';
import '../css/ProjectDetail.css';
import { getUsers } from '../services/userService';
import {getTickets } from '../services/ticketService';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [miembros, setMiembros] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [proyecto, setProyecto] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);



  useEffect(() => {
    const projects = getProjects();
    const proyectoEncontrado = projects.find(p => p.id === parseInt(id));
  
    if (proyectoEncontrado) {
      setProyecto(proyectoEncontrado);
      setMiembros(proyectoEncontrado.miembros || []);
      const storedTickets = getTickets();
    const projectTickets = storedTickets.filter(ticket => ticket.proyectoId === proyectoEncontrado.id);
    setTickets(projectTickets);
    } else {
      alert('Proyecto no encontrado');
      navigate('/home');
    }
  

    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(storedUsers);
  }, [id, navigate]);

  const handleAddMember = () => {
    if (usuarioSeleccionado) {
      const nuevoMiembro = JSON.parse(usuarioSeleccionado);
      const updatedMiembros = [...miembros, nuevoMiembro];
      

      const updatedProject = { ...proyecto, miembros: updatedMiembros };
      setMiembros(updatedMiembros);
      saveProject(updatedProject);
      localStorage.setItem('miembros', JSON.stringify(updatedMiembros));
      
      setUsuarioSeleccionado('');
      alert("Miembro añadido exitosamente.");
    } else {
      alert("Selecciona un miembro antes de añadir.");
    }
  };

  const handleRemoveMember = (miembro) => {
    const updatedMiembros = miembros.filter((m) => m.email !== miembro.email);
    setMiembros(updatedMiembros);
    saveProject({ ...proyecto, miembros: updatedMiembros });
    localStorage.setItem('miembros', JSON.stringify(updatedMiembros));
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
  usuarioSeleccionado={usuarioSeleccionado} 
  setUsuarioSeleccionado={setUsuarioSeleccionado}
/>
      
      <div className="action-buttons">
      <button className="button" onClick={() => navigate(`/ticket/${id}`, { state: { miembros } })}>
    Agregar Ticket
</button>
      </div>
  
      <ExpenseTable tickets={tickets} />
      <button className="button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProjectDetail;
