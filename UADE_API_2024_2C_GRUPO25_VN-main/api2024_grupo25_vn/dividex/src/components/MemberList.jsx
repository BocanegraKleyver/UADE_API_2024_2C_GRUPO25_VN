import React, { useState } from 'react';

const MemberList = ({ miembros, onAddMember, onRemoveMember, usuarios }) => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');

  const handleAdd = () => {
    if (!usuarioSeleccionado) return;
    onAddMember(JSON.parse(usuarioSeleccionado)); // Agregar el usuario seleccionado
    setUsuarioSeleccionado(''); // Limpiar la selección
  };

  return (
    <div>
      <h3>Miembros del Proyecto</h3>
      <ul>
        {miembros.map((miembro, index) => (
          <li key={index}>
            {miembro.name} {miembro.apellido} 
            <button className="button" onClick={() => onRemoveMember(miembro)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <select value={usuarioSeleccionado} onChange={(e) => setUsuarioSeleccionado(e.target.value)}>
        <option value="">Seleccionar Miembro</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={JSON.stringify(usuario)}>
            {usuario.name} {usuario.apellido}
          </option>
        ))}
      </select>
      
      <button className="button" onClick={handleAdd}>Añadir Miembro</button>
    </div>
  );
};

export default MemberList;
