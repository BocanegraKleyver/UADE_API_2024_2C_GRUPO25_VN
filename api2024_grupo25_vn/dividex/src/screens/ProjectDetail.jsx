import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import { getProjects, saveProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import '../css/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (!proyecto) return <div>No se encontró el proyecto.</div>;

  return (
    <div>
      <h2>Proyecto: {proyecto.nombre}</h2>
      <p>Descripción: {proyecto.descripcion}</p>
      
      <MemberList 
        miembros={miembros} 
        onAddMember={handleAddMember} 
        onRemoveMember={handleRemoveMember} 
      />
      <button onClick={() => navigate(`/ticket/${id}`)}>Agregar Ticket</button>
      <ExpenseTable tickets={tickets} />
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProjectDetail;
