import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSave, existingProject }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingProject) {
      setNombre(existingProject.nombre);
      setDescripcion(existingProject.descripcion);
    }
  }, [existingProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      setError('Por favor complete todos los campos');
      return;
    }
    

  onSave({ id: existingProject ? existingProject.id : undefined, nombre, descripcion });


  setNombre('');
  setDescripcion('');
  setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre del Proyecto:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe el nombre del proyecto"
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Breve descripción del proyecto"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={!nombre || !descripcion}>Guardar Proyecto</button>
    </form>
  );
};

export default ProjectForm;
