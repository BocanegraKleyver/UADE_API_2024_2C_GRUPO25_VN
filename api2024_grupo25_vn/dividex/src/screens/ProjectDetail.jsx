import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import ExpenseTable from '../components/ExpenseTable';
import { getProjects, saveProject } from '../services/projectService';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de tener la ruta correcta
import '../css/ProjectDetail.css';
import {getTickets, getExpenseDetails } from '../services/ticketService'; // Agregar importación de getExpenseDetails
import BarraNavegacion from '../components/Navbar';

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
      setMiembros(proyectoEncontrado.miembros || []);
      const storedTickets = getTickets();
      const projectTickets = storedTickets.filter(ticket => ticket.proyectoId === proyectoEncontrado.id); // Filtrar solo por ID del proyecto
      setTickets(projectTickets);
    } else {
      alert('Proyecto no encontrado');
      navigate('/home');
    }
  
    // Cargar usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(storedUsers);
  }, [id, navigate, user]);

  const handleAddMember = () => {
    if (usuarioSeleccionado) {
      const nuevoMiembro = JSON.parse(usuarioSeleccionado); // Parsear el usuario seleccionado
      const updatedMiembros = [...miembros, nuevoMiembro]; // Agregar el nuevo miembro como objeto
      
      // Guardar los cambios en el proyecto
      const updatedProject = { ...proyecto, miembros: updatedMiembros };
      setMiembros(updatedMiembros);
      saveProject(updatedProject);
      localStorage.setItem('miembros', JSON.stringify(updatedMiembros)); // Actualiza el Local Storage
      
      setUsuarioSeleccionado(''); // Reiniciar selección a cadena vacía
      alert("Miembro añadido exitosamente.");
    } else {
      alert("Selecciona un miembro antes de añadir.");
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
    <>
    <BarraNavegacion />
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
          <button className="button" onClick={() => navigate(`/ticket/${id}`, { state: { miembros, proyectoId: proyecto.id } })}>
            Agregar Ticket
          </button>
        </div>    
        <ExpenseTable tickets={tickets} />        
        <h3>Gastos por Miembro</h3>
        <table className="tabla-gastos">
          <thead>
            <tr>
              <th>Miembro</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {tickets.flatMap(ticket => getExpenseDetails(ticket)).map((detalle, index) => (
              <tr key={index}>
                <td>{detalle.miembro}</td>
                <td>${detalle.monto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="button" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </>)
};

export default ProjectDetail;
