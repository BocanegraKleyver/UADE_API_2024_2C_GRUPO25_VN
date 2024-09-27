<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import Alert from '@mui/material/Alert';


const defaultTheme = createTheme();


function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
  
  
    if (!nombre || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
  
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosRegistrados.find((usuario) => usuario.email === email);
  
    if (usuarioExistente) {
      setError('Este correo ya está registrado.');
      return;
    }
  
    const nuevoUsuario = { nombre, email, password };
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
  
    console.log('Usuarios Registrados:', usuariosRegistrados);
    login(nuevoUsuario);
    console.log('Registro exitoso, navegando al dashboard');
    navigate('/home');
  };



  const Iralogin = () => {
    navigate('/'); 
  };


  return (
=======
// Importación de React y hooks necesarios
import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática

// Importación de componentes de Material-UI
import Avatar from '@mui/material/Avatar'; // Componente para mostrar un avatar
import Button from '@mui/material/Button'; // Componente de botón
import CssBaseline from '@mui/material/CssBaseline'; // Normaliza los estilos CSS
import TextField from '@mui/material/TextField'; // Campo de entrada de texto
import Link from '@mui/material/Link'; // Componente de enlace
import Grid from '@mui/material/Grid'; // Sistema de rejilla para diseño
import Box from '@mui/material/Box'; // Contenedor flexible
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Icono de candado
import Typography from '@mui/material/Typography'; // Componente para texto estilizado
import Container from '@mui/material/Container'; // Contenedor con ancho máximo
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Creación y proveedor de temas

// Creación de un tema por defecto
const defaultTheme = createTheme();

// Definición del componente Registro
function Registro({ onRegister }) {
  // Estados para manejar los campos del formulario
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const nuevoUsuario = { nombre, email }; // Crea un objeto con los datos del usuario
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario)); // Guarda el usuario en localStorage
    onRegister(nuevoUsuario); // Llama a la función onRegister pasada como prop
    console.log('Registration successful, navigating to dashboard');
    navigate('/home'); // Navega al dashboard después del registro
  };

  // Función para redirigir al login
  const Iralogin = () => {
    window.location.href = '/'; // Redirige a la página de login
  };

  // Renderizado del componente
  return (
    // Proveedor de tema para aplicar estilos consistentes
>>>>>>> Home
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
<<<<<<< HEAD

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Registro
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

=======
          {/* Icono de avatar */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* Título del formulario */}
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          {/* Formulario de registro */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Campo de nombre */}
>>>>>>> Home
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre completo"
                  autoFocus
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Grid>
<<<<<<< HEAD

=======
              {/* Campo de email */}
>>>>>>> Home
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
<<<<<<< HEAD

=======
              {/* Campo de contraseña */}
>>>>>>> Home
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
<<<<<<< HEAD

=======
            {/* Botón de registro */}
>>>>>>> Home
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
<<<<<<< HEAD

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
=======
            {/* Enlace para ir al login */}
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link 
>>>>>>> Home
                  href="#" 
                  variant="body2" 
                  onClick={(e) => {
                    e.preventDefault();
                    Iralogin(e);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

<<<<<<< HEAD

export default Registro;
=======
// Exportación del componente Registro
export default Registro;
>>>>>>> Home
