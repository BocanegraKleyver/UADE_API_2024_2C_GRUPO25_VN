import React from 'react';

const MemberList = ({ miembros, onAddMember, onRemoveMember, usuarios, usuarioSeleccionado, setUsuarioSeleccionado }) => {
  const handleAdd = () => {
    console.log('Usuario seleccionado:', usuarioSeleccionado); 
    if (!usuarioSeleccionado) {
      alert("Selecciona un usuario para agregar");
      return;
    }

    const nuevoMiembro = JSON.parse(usuarioSeleccionado); 
    onAddMember(nuevoMiembro); 
    setUsuarioSeleccionado(''); 
  };

  return (
    <div>
      <h3>Miembros del Proyecto</h3>
      <ul>
        {miembros.map((miembro, index) => (
          <li key={index}>

            {miembro.nombre} ({miembro.email}) 
            <button className="button" onClick={() => onRemoveMember(miembro)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <select value={usuarioSeleccionado} onChange={(e) => setUsuarioSeleccionado(e.target.value)}>
        <option value="">Seleccionar Miembro</option>
        {usuarios && usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <option key={usuario.id} value={JSON.stringify(usuario)}>
              {usuario.nombre} ({usuario.email})
            </option>
          ))
        ) : (
          <option disabled>No hay miembros disponibles</option>
        )}
      </select>
      
      <button className="button" onClick={handleAdd}>Añadir Miembro</button>
    </div>
  );
};

export default MemberList;
