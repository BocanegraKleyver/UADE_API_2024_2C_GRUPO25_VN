// src/screens/ExpenseSummary.jsx

import React from 'react';
import ExpenseTable from '../components/ExpenseTable';
import { getTickets } from '../services/ticketService';

const ExpenseSummary = () => {
  const tickets = getTickets();

  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ExpenseTable tickets={tickets} />
    </div>
  );
};

export default ExpenseSummary;
