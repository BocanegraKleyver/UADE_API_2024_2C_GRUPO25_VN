import React, { useState } from 'react';

const MemberList = ({ miembros, onAddMember, onRemoveMember }) => {
  const [nuevoMiembro, setNuevoMiembro] = useState('');

  const handleAdd = () => {
    if (nuevoMiembro.trim() === '') return;
    onAddMember(nuevoMiembro);
    setNuevoMiembro('');
  };

  return (
    <div>
      <h3>Miembros del Proyecto</h3>
      <ul>
        {miembros.map((miembro, index) => (
          <li key={index}>
            {miembro} 
            <button onClick={() => onRemoveMember(miembro)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={nuevoMiembro}
        onChange={(e) => setNuevoMiembro(e.target.value)}
        placeholder="Agregar nuevo miembro"
      />
      <button onClick={handleAdd}>Añadir Miembro</button>
    </div>
  );
};

export default MemberList;
