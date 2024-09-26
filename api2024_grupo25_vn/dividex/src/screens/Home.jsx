import React, { useEffect, useState } from 'react';
import { obtenerProyectos, obtenerDeudasUsuario, obtenerGastosUsuario, obtenerDeudasAmigos } from '../components/CalculosHome'; // Asegúrate de tener estas funciones
import '../css/Home.css';
import BarraNavegacion from '../components/Navbar';
import TablaGastos from '../components/ExpenseTable'; // Importar TablaGastos si es necesario
import ListaMiembros from '../components/MemberList'; // Importar ListaMiembros si es necesario
import { Link } from 'react-router-dom'; // Asegúrate de que la importación sea correcta

const Inicio = () => {
  const [proyectos, setProyectos] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalDeuda, setTotalDeuda] = useState(0);
  const [deudaAmigos, setDeudaAmigos] = useState(0);

  useEffect(() => {
    const usuarioAlmacenado = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(usuarioAlmacenado || {});

    const cargarProyectos = async () => {
      const proyectosCargados = await obtenerProyectos() || [];
      setProyectos(proyectosCargados);
    };

    const cargarDatosFinancieros = async () => {
      const gastos = await obtenerGastosUsuario(); // Obtener gastos del usuario
      const deuda = await obtenerDeudasUsuario(); // Obtener deudas del usuario
      const deudaAmigos = await obtenerDeudasAmigos(); // Obtener deudas de amigos

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
        <h2>Bienvenido, {usuario.nombre || 'Usuario'}</h2>
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
