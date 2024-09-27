import React, { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import { saveTicket, getTickets } from '../services/ticketService';
import { useNavigate, useLocation } from 'react-router-dom';
import { divideExpensesEqually } from '../utils/expenseUtils';

const TicketUpload = () => {
  const location = useLocation();
  const { miembros = [] } = location.state || {};
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleSaveTicket = (ticket) => {
    const newTicket = { ...ticket, id: Date.now() };
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
    <div>
      <h2>Subir Tickets</h2>
      <TicketForm onSave={handleSaveTicket} miembrosIniciales={miembros} />
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default TicketUpload;
