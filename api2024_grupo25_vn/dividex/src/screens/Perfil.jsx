import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getUsers, setUsuario } from '../services/userService';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apodo: '',
    email: '',
    telefono: '',
    foto: '',
  });
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioAlmacenado = await getUsers();
      setUsuario(usuarioAlmacenado);
    };
    cargarUsuario();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const manejarCambioFoto = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setUsuario({ ...usuario, foto: lector.result });
      };
      lector.readAsDataURL(archivo);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    await setUsuario(usuario); 
    if (nuevaContrasena) {


    }
    navegar('/home');
  };

  return (
    <div className="contenedor-principal">
      <Typography variant="h4">Administrar Perfil</Typography>
      <Box component="form" onSubmit={manejarEnvio} sx={{ mt: 3 }}>
        <Avatar src={usuario.foto} sx={{ width: 100, height: 100 }} />
        <input type="file" accept="image/*" onChange={manejarCambioFoto} />
        <TextField
          margin="normal"
          required
          fullWidth
          id="nombre"
          label="Nombre"
          name="nombre"
          value={usuario.nombre}
          onChange={manejarCambio}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="apodo"
          label="Apodo"
          name="apodo"
          value={usuario.apodo}
          onChange={manejarCambio}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          value={usuario.email}
          onChange={manejarCambio}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="telefono"
          label="Número de Teléfono"
          name="telefono"
          value={usuario.telefono}
          onChange={manejarCambio}
        />
        <TextField
          margin="normal"
          fullWidth
          id="nuevaContrasena"
          label="Nueva Contraseña"
          type="password"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Guardar Cambios
        </Button>
      </Box>
    </div>
  );
};

export default PerfilUsuario;
