// Importación de módulos y componentes necesarios
import React, { useState } from 'react'; // Importa React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import Avatar from '@mui/material/Avatar'; // Componente Avatar de Material-UI
import Button from '@mui/material/Button'; // Componente Button de Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // Componente CssBaseline de Material-UI
import TextField from '@mui/material/TextField'; // Componente TextField de Material-UI
import Box from '@mui/material/Box'; // Componente Box de Material-UI
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Icono de candado de Material-UI
import Typography from '@mui/material/Typography'; // Componente Typography de Material-UI
import Container from '@mui/material/Container'; // Componente Container de Material-UI
import Link from '@mui/material/Link'; // Componente Link de Material-UI
import Grid from '@mui/material/Grid'; // Componente Grid de Material-UI

// Definición del componente Login
function Login({ onLogin }) {
  // Estados para manejar el email y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuario')); // Obtiene el usuario registrado del localStorage
    
    // Verifica si el usuario existe y si el email coincide
    if (usuarioRegistrado && usuarioRegistrado.email === email) {
      onLogin(usuarioRegistrado); // Llama a la función onLogin con el usuario
      console.log('Login successful, navigating to dashboard');
      navigate('/dashboard'); // Navega al dashboard
    } else {
      alert('Correo electrónico o contraseña incorrectos'); // Muestra una alerta si las credenciales son incorrectas
    }
  };

  // Renderizado del componente
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline /> {/* Resetea los estilos CSS */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Avatar con icono de candado */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        {/* Título del formulario */}
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        {/* Formulario de inicio de sesión */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Campo de entrada para el email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Campo de entrada para la contraseña */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Botón de envío del formulario */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          {/* Enlace para registrarse */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/registro" variant="body2">
                ¿Aun no tienes una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login; // Exporta el componente Login