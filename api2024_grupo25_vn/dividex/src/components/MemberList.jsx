import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

const MemberList = ({ miembros, onAddMember, onRemoveMember }) => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const { usuarios } = useContext(AuthContext); // Acceder a usuarios desde AuthContext

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
        {usuarios.length > 0 ? ( // Verifica que haya usuarios para mapear
          usuarios.map((usuario) => (
            <option key={usuario.id} value={JSON.stringify(usuario)}>
              {usuario.name} {usuario.apellido} ({usuario.email}) {/* Muestra el email también */}
            </option>
          ))
        ) : (
          <option disabled>No hay miembros disponibles</option> // Mensaje si no hay usuarios
        )}
      </select>
      
      <button className="button" onClick={handleAdd}>Añadir Miembro</button>
    </div>
  );
};

export default MemberList;
