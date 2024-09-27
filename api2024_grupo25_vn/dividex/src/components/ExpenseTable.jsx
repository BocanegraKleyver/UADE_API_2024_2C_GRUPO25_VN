import React from 'react';

const ExpenseTable = ({ tickets }) => {
  return (
    <div>
      <h3>Tabla de Gastos</h3>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Asignaciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.descripcion}</td>
              <td>{ticket.fecha}</td>
              <td>{ticket.montoTotal}</td>
              <td>
                {Object.entries(ticket.asignaciones).map(([miembro, monto]) => (
                  <p key={miembro}>{miembro}: {monto}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
