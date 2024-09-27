const TICKETS_KEY = 'tickets';

export const getTickets = () => {
  return JSON.parse(localStorage.getItem('tickets')) || [];
};

export const saveTicket = (ticket) => {
  const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];
  existingTickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(existingTickets));
};


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
