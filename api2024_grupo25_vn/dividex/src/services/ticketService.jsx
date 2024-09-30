// src/services/ticketService.js

const TICKETS_KEY = 'tickets';

export const getTickets = () => {
  return JSON.parse(localStorage.getItem('tickets')) || [];
};

export const saveTicket = (ticket) => {
  const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];
  
  // Verificar si el ticket ya existe
  const isDuplicate = existingTickets.some(existingTicket => existingTicket.id === ticket.id);
  
  if (!isDuplicate) {
    existingTickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(existingTickets));
  }
};

// Nuevas funciones para manejar la división de gastos
export const divideExpensesEqually = (ticket, miembros) => {
  const amountPerMember = ticket.montoTotal / miembros.length;
  return miembros.map(miembro => ({
    miembro,
    monto: amountPerMember
  }));
};

export const divideExpensesByPercentage = (ticket, miembros, percentages) => {
  return miembros.map((miembro, index) => ({
    miembro,
    monto: (ticket.montoTotal * percentages[index]) / 100
  }));
};

export const getExpenseDetails = (ticket) => {
  const miembros = ticket.miembrosSeleccionados || [];
  const percentages = ticket.porcentajes || [];
  
  return ticket.divisionTipo === 'percentage'
    ? divideExpensesByPercentage(ticket, miembros, percentages)
    : divideExpensesEqually(ticket, miembros);
};
