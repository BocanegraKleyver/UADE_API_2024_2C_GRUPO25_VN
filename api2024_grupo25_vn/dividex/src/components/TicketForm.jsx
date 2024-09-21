import React, { useState } from 'react';

const TicketForm = ({ onSave }) => {
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [montoTotal, setMontoTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fecha || !descripcion || !montoTotal) {
      alert('Por favor complete todos los campos');
      return;
    }

    onSave({ fecha, descripcion, montoTotal });

    setFecha('');
    setDescripcion('');
    setMontoTotal(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fecha">Fecha del Ticket:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del ticket"
        />
      </div>

      <div>
        <label htmlFor="montoTotal">Monto Total:</label>
        <input
          type="number"
          id="montoTotal"
          value={montoTotal}
          onChange={(e) => setMontoTotal(Number(e.target.value))}
          placeholder="Monto total"
        />
      </div>

      <button type="submit">Guardar Ticket</button>
    </form>
  );
};

export default TicketForm;
