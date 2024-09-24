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
    navigate('/dashboard'); // Navega al dashboard después del registro
  };

  // Función para redirigir al login
  const Iralogin = () => {
    window.location.href = '/'; // Redirige a la página de login
  };

  // Renderizado del componente
  return (
    // Proveedor de tema para aplicar estilos consistentes
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
              {/* Campo de email */}
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
              {/* Campo de contraseña */}
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
            {/* Botón de registro */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            {/* Enlace para ir al login */}
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link 
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

// Exportación del componente Registro
export default Registro;