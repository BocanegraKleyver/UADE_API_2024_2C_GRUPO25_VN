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