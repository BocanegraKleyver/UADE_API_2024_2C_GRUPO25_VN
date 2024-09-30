import React, { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import { saveTicket, getTickets, getExpenseDetails } from '../services/ticketService'; // Agregar importación de getExpenseDetails
import { useNavigate, useLocation } from 'react-router-dom';
import { divideExpensesEqually } from '../utils/expenseUtils';
import BarraNavegacion from '../components/Navbar';

const TicketUpload = () => {
  const location = useLocation();
  const { miembros = [], proyectoId } = location.state || {}; // Obtener proyectoId
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleSaveTicket = (ticket) => {
    // Validar si el ticket ya existe
    const ticketExists = tickets.some(existingTicket => existingTicket.descripcion === ticket.descripcion && existingTicket.fecha === ticket.fecha);
    if (ticketExists) {
      console.error('El ticket ya existe.');
      alert('Este ticket ya ha sido guardado.');
      return; // Salir de la función si el ticket ya existe
    }

    const newTicket = { 
      ...ticket, 
      id: Date.now(), 
      estado: 0, 
      proyectoId // Añadir el ID del proyecto al nuevo ticket
    };
    const expenseDetails = getExpenseDetails(newTicket); // Obtener detalles de gastos
    newTicket.expenseDetails = expenseDetails; // Agregar detalles de gastos al ticket
    saveTicket(newTicket);
    setTickets((prevTickets) => [...prevTickets, newTicket]);

    if (Array.isArray(miembros) && miembros.length > 0) {
      const expenseDetails = divideExpensesEqually(newTicket, miembros);
      console.log(expenseDetails);
    } else {
      console.error('La lista de miembros está vacía o no está definida');
      alert('No hay miembros definidos para dividir los gastos.');
    }
  };

  return (
    <>      <BarraNavegacion />
        <div>
        <h2>Subir Tickets</h2>
        <TicketForm onSave={handleSaveTicket} miembrosIniciales={miembros} />      
      </div>
    </>
  );
};

export default TicketUpload;