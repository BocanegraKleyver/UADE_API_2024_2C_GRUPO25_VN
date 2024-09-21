import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import TicketForm from '../components/TicketForm';
import { getProjects, saveProject } from '../services/projectService';

const ProjectDetail = () => {
  const { id } = useParams();
  const [miembros, setMiembros] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    const projects = getProjects(); 
    const proyectoEncontrado = projects.find(p => p.id === parseInt(id));
    setProyecto(proyectoEncontrado);
    if (proyectoEncontrado) {
      setMiembros(proyectoEncontrado.miembros); 
      setTickets(proyectoEncontrado.tickets); 
    }
  }, [id]);

  const handleAddMember = (nuevoMiembro) => {
    const updatedMiembros = [...miembros, nuevoMiembro];
    setMiembros(updatedMiembros);
    saveProject({ ...proyecto, miembros: updatedMiembros });
  };

  const handleRemoveMember = (miembro) => {
    const updatedMiembros = miembros.filter((m) => m !== miembro);
    setMiembros(updatedMiembros);
    saveProject({ ...proyecto, miembros: updatedMiembros });
  };

  const handleSaveTicket = (ticket) => {
    setTickets([...tickets, { ...ticket, id: tickets.length + 1 }]);
  };

  const handleSaveProjectChanges = (updatedProject) => {
    saveProject(updatedProject); 
    setProyecto(updatedProject); 
  };

  if (!proyecto) return <div>No se encontró el proyecto.</div>; 

  return (
    <div>
      <h2>Detalles del Proyecto: {proyecto.nombre}</h2>
      <p>Descripción: {proyecto.descripcion}</p>
      <ProjectForm onSave={handleSaveProjectChanges} existingProject={proyecto} />
      <MemberList 
        miembros={miembros} 
        onAddMember={handleAddMember} 
        onRemoveMember={handleRemoveMember} 
      />
      <TicketForm onSave={handleSaveTicket} />
      <ExpenseTable tickets={tickets} />
    </div>
  );
};

export default ProjectDetail;