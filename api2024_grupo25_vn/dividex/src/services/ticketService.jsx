const TICKETS_KEY = 'tickets';

export const getTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

export const saveTicket = (ticket) => {
  const tickets = getTickets();
  tickets.push(ticket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};
