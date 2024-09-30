// src/components/TicketForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/ProjectDashboard.css'; // Importar estilos de ProjectDashboard


const TicketForm = ({ onSave, miembrosIniciales }) => {
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [montoTotal, setMontoTotal] = useState(0);
  const [divisionTipo, setDivisionTipo] = useState('equally'); // Por defecto, división equitativa
  const [porcentajes, setPorcentajes] = useState([]); // Inicializar vacío
  const [archivo, setArchivo] = useState(null); // Estado para manejar el archivo de imagen
  const [miembros, setMiembros] = useState(miembrosIniciales || []); // Miembros disponibles
  const [miembrosSeleccionados, setMiembrosSeleccionados] = useState([]); // Miembros seleccionados
  const navigate = useNavigate();
  useEffect(() => {
    // Reiniciar porcentajes al cambiar miembros
    setPorcentajes(Array(miembrosSeleccionados.length).fill(0));
  }, [miembrosSeleccionados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fecha || !descripcion || montoTotal <= 0 || miembrosSeleccionados.length === 0) {
      alert('Por favor complete todos los campos correctamente y seleccione al menos un miembro.');
      return;
    }

    if (divisionTipo === 'percentage' && porcentajes.reduce((a, b) => a + b, 0) !== 100) {
      alert('La suma de los porcentajes debe ser igual a 100.');
      return;
    }

    // onSave({ fecha, descripcion, montoTotal, divisionTipo, porcentajes, archivo, miembrosSeleccionados });

    const nuevoTicket = { 
      fecha, 
      descripcion, 
      montoTotal, 
      divisionTipo, 
      porcentajes, 
      archivo, 
      miembrosSeleccionados,
      proyectoId: miembrosIniciales.proyectoId // Asegúrate de pasar el ID del proyecto
    };

    // Guardar el nuevo ticket en localStorage
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    storedTickets.push(nuevoTicket);
    localStorage.setItem("tickets", JSON.stringify(storedTickets));

    // Llamar a onSave si necesitas hacer algo adicional
    onSave(nuevoTicket); // Opcional
    
    // Resetear el formulario
    setFecha('');
    setDescripcion('');
    setMontoTotal(0);
    setPorcentajes([]);
    setMiembrosSeleccionados([]);
    setArchivo(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
    }
  };

  const handleMiembroSeleccionado = (miembroEmail) => {
    setMiembrosSeleccionados((prevSeleccionados) => {
      if (prevSeleccionados.includes(miembroEmail)) {
        // Si ya está seleccionado, lo quitamos
        return prevSeleccionados.filter(email => email !== miembroEmail);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSeleccionados, miembroEmail];
      }
    });
  };

  return (
    <>

      <div className="container"> {/* Agregar clase contenedora */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fecha">Fecha del Ticket:</label>
            <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del ticket" />
          </div>

          <div>
            <label htmlFor="montoTotal">Monto Total:</label>
            <input type="number" id="montoTotal" value={montoTotal} onChange={(e) => setMontoTotal(Number(e.target.value))} placeholder="Monto total" />
          </div>

          <div>
            <label htmlFor="divisionTipo">Tipo de División:</label>
            <select id="divisionTipo" value={divisionTipo} onChange={(e) => {
              setDivisionTipo(e.target.value);
              setPorcentajes(Array(miembrosSeleccionados.length).fill(0)); // Reiniciar porcentajes al cambiar tipo
            }}>
              <option value="equally">Equitativa</option>
              <option value="percentage">Por Porcentaje</option>
            </select>
          </div>

          <div>
            <label>Seleccionar Miembros:</label>
            {miembros.map((miembro) => (
              <div key={miembro.email}>
                <label>
                  <input
                    type="checkbox"
                    checked={miembrosSeleccionados.includes(miembro.email)}
                    onChange={() => handleMiembroSeleccionado(miembro.email)}
                  />
                  {miembro.nombre}
                </label>
              </div>
            ))}
          </div>

          {divisionTipo === 'percentage' && (
            <div>
              <label>Porcentajes por Miembro:</label>
              {miembrosSeleccionados.map((miembroEmail, index) => {
                const miembro = miembros.find(m => m.email === miembroEmail);
                return (
                  <div key={miembroEmail}>
                    <label>{miembro.nombre}:</label>
                    <input
                      type="number"
                      value={porcentajes[index]}
                      onChange={(e) => {
                        const newPorcentajes = [...porcentajes];
                        newPorcentajes[index] = Number(e.target.value);
                        setPorcentajes(newPorcentajes);
                      }} 
                  />
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <label htmlFor="archivo">Subir Imagen del Ticket:</label>
            <input type="file" id="archivo" accept="image/*" onChange={handleFileChange} />
          </div>
          <button type="submit">Guardar Ticket</button><>  </>
          <button onClick={() => navigate(-1)}>Volver</button>
        </form>
      </div>
    </>
  );
};

export default TicketForm;
