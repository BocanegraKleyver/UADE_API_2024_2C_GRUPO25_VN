<<<<<<< HEAD
import React, { useEffect, useState, useContext } from 'react';
import { obtenerProyectos, obtenerDeudasUsuario, obtenerGastosUsuario, obtenerDeudasAmigos } from '../components/CalculosHome';
import '../css/Home.css';
import BarraNavegacion from '../components/Navbar';
import { AuthContext } from '../context/AuthContext'; 
import TablaGastos from '../components/ExpenseTable';
import ListaMiembros from '../components/MemberList';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const { user } = useContext(AuthContext);
  const [proyectos, setProyectos] = useState([]);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalDeuda, setTotalDeuda] = useState(0);
  const [deudaAmigos, setDeudaAmigos] = useState(0);

  useEffect(() => {
    const cargarProyectos = async () => {
      const proyectosCargados = await obtenerProyectos() || [];
      setProyectos(proyectosCargados);
    };

    const cargarDatosFinancieros = async () => {
      const gastos = await obtenerGastosUsuario(); 
      const deuda = await obtenerDeudasUsuario();  
      const deudaAmigos = await obtenerDeudasAmigos(); 

      setTotalGastos(gastos);
      setTotalDeuda(deuda);
      setDeudaAmigos(deudaAmigos);
    };

    cargarProyectos();
    cargarDatosFinancieros();
  }, []);

  return (
    <>
      <BarraNavegacion />
      <div className="contenedor-principal">
        <h2>Bienvenido, {user?.nombre || 'Usuario'}</h2> {/* Ahora utiliza user */}
        <div className="contenedor-totales">
          <div className="caja-total">
            <i className="icono-gastos" /> {/* Icono para gastos */}
            <h3>Total Gastos: ${totalGastos}</h3>
          </div>
          <div className="caja-total">
            <i className="icono-deuda" /> {/* Icono para deuda */}
            <h3>Total Deuda: ${totalDeuda}</h3>
          </div>
          <div className="caja-total">
            <i className="icono-cobrar" /> {/* Icono para cobrar */}
            <h3>Total a Cobrar: ${deudaAmigos}</h3>
          </div>
        </div>
        <h3>Proyectos Abiertos</h3>
        <table className="tabla-proyectos">
          <thead>
            <tr>
              <th>Nombre del Proyecto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map(proyecto => (
              <tr key={proyecto.id}>
                <td>{proyecto.nombre}</td>
                <td>
                  <Link to={`/project/${proyecto.id}`} className="enlace-proyecto">Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Agregar más secciones según sea necesario */}
        {/* Ejemplo de uso de componentes existentes */}
        {/* <TablaGastos tickets={tickets} /> */}
        {/* <ListaMiembros miembros={miembros} onAddMember={handleAddMember} onRemoveMember={handleRemoveMember} usuarios={usuarios} /> */}
      </div>
    </>
  );
};

export default Inicio;
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getUser } from '../services/userService'; // Asegúrate de tener esta función para obtener el usuario

const Home = () => {
  const [user, setUser] = useState(null);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalDeuda, setTotalDeuda] = useState(0);
  const [totalPendienteCobro, setTotalPendienteCobro] = useState(0);
  const [proyectosPendientes, setProyectosPendientes] = useState([]);
  const [amigosDeudores, setAmigosDeudores] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const usuario = getUser(); // Obtener el usuario actual
    setUser(usuario);

    // Cargar datos desde localStorage
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    const deudas = JSON.parse(localStorage.getItem('deudas')) || [];
    const pendientesCobro = JSON.parse(localStorage.getItem('pendientesCobro')) || [];
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const amigos = JSON.parse(localStorage.getItem('amigos')) || [];
    const notifs = JSON.parse(localStorage.getItem('notificaciones')) || [];

    // Calcular totales
    setTotalGastos(gastos.reduce((acc, gasto) => acc + gasto.monto, 0));
    setTotalDeuda(deudas.reduce((acc, deuda) => acc + deuda.monto, 0));
    setTotalPendienteCobro(pendientesCobro.reduce((acc, pendiente) => acc + pendiente.monto, 0));
    
    // Filtrar proyectos y amigos deudores
    setProyectosPendientes(proyectos.filter(proyecto => proyecto.estado === 'pendiente'));
    setAmigosDeudores(amigos.filter(amigo => amigo.deuda > 0));
    setNotificaciones(notifs);
  }, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Aplicación
          </Typography>
          <Button color="inherit" component={Link} to="/expense-summary">Resumen de Gastos</Button>
          <Button color="inherit" component={Link} to="/ticket-upload">Subir Tickets</Button>
          <Button color="inherit" component={Link} to="/project-dashboard">Dashboard de Proyectos</Button>
          <Button color="inherit" component={Link} to="/report">Reportes</Button>
          <Button color="inherit" component={Link} to="/login">Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" align="center" sx={{ margin: '20px 0' }}>
        Bienvenido, {user ? user.nombre : 'Invitado'}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Totales</Typography>
              <Typography>Total de Gastos: ${totalGastos}</Typography>
              <Typography>Total de Deuda: ${totalDeuda}</Typography>
              <Typography>Total Pendiente de Cobro: ${totalPendienteCobro}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Proyectos Pendientes de Pago</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre del Proyecto</TableCell>
                  <TableCell>Monto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proyectosPendientes.map((proyecto) => (
                  <TableRow key={proyecto.id}>
                    <TableCell>{proyecto.nombre}</TableCell>
                    <TableCell>${proyecto.monto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Amigos que te Deben</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Monto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amigosDeudores.map((amigo) => (
                  <TableRow key={amigo.id}>
                    <TableCell>{amigo.nombre}</TableCell>
                    <TableCell>${amigo.deuda}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Notificaciones</Typography>
          <ul>
            {notificaciones.map((notificacion, index) => (
              <li key={index}>{notificacion}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
>>>>>>> Home
