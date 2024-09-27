import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import { getProjects, saveProject } from '../services/projectService';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de tener la ruta correcta
import '../css/ProjectDetail.css';
import { getUsers } from '../services/userService';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto
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
      setMiembros(proyectoEncontrado.miembros || []); // Asegúrate de que `miembros` se esté guardando en el proyecto
      setTickets(proyectoEncontrado.tickets || []);
    } else {
      alert('Proyecto no encontrado');
      navigate('/home');
    }

    setUsuarios(getUsers());
  }, [id, navigate]);

  // Efecto para obtener miembros desde el localStorage, si el usuario está autenticado
  useEffect(() => {
    if (user) {
      const storedMembers = JSON.parse(localStorage.getItem('miembros')) || [];
      setMiembros(storedMembers);
    }
  }, [user]);

  const handleAddMember = () => {
    if (usuarioSeleccionado) {
      const updatedMiembros = [...miembros, usuarioSeleccionado];
      setMiembros(updatedMiembros);
      saveProject({ ...proyecto, miembros: updatedMiembros });
      localStorage.setItem('miembros', JSON.stringify(updatedMiembros)); // Actualiza el Local Storage
      setUsuarioSeleccionado(null);
    }
  };

  const handleRemoveMember = (miembro) => {
    const updatedMiembros = miembros.filter((m) => m.email !== miembro.email);
    setMiembros(updatedMiembros);
    saveProject({ ...proyecto, miembros: updatedMiembros });
    localStorage.setItem('miembros', JSON.stringify(updatedMiembros)); // Actualiza el Local Storage
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
