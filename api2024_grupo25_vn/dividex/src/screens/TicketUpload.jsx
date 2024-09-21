import React, { useState } from 'react';
import TicketForm from '../components/TicketForm';

const TicketUpload = () => {
  const [tickets, setTickets] = useState([]);

  const handleSaveTicket = (ticket) => {
    setTickets([...tickets, { ...ticket, id: tickets.length + 1 }]);
  };

  return (
    <div>
      <h2>Subir Tickets</h2>
      <TicketForm onSave={handleSaveTicket} />
      <h3>Tickets Subidos</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>{ticket.descripcion} - {ticket.fecha} - ${ticket.montoTotal}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketUpload;
