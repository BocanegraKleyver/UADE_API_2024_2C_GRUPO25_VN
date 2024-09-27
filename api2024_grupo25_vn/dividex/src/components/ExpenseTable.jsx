import React from 'react';
import PropTypes from 'prop-types';

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
            <th>Miembros Seleccionados</th>
            <th>Porcentajes</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No hay tickets registrados.</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.descripcion || 'Sin descripción'}</td>
                <td>{ticket.fecha || 'Sin fecha'}</td>
                <td>${ticket.montoTotal || 0}</td>
                <td>
                  {ticket.miembrosSeleccionados.length > 0 ? (
                    ticket.miembrosSeleccionados.map((miembro, index) => (
                      <p key={index}>{miembro}</p>
                    ))
                  ) : (
                    <p>No hay miembros seleccionados</p>
                  )}
                </td>
                <td>
                  {ticket.porcentajes.length > 0 ? (
                    ticket.porcentajes.map((porcentaje, index) => (
                      <p key={index}>{porcentaje}%</p>
                    ))
                  ) : (
                    <p>No hay porcentajes</p>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Validaciones de tipo para props
ExpenseTable.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      descripcion: PropTypes.string,
      fecha: PropTypes.string,
      montoTotal: PropTypes.number,
      miembrosSeleccionados: PropTypes.arrayOf(PropTypes.string),
      porcentajes: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
};

export default ExpenseTable;
