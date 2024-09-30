// src/screens/ReportScreen.jsx
import BarraNavegacion from '../components/Navbar';
import React from 'react';

const ReportScreen = () => {
  return (
    <>
    <BarraNavegacion/>
    <div>
      <h2>Reportes de Gastos</h2>
      <p>Aquí se generarán los reportes de gastos por proyecto.</p>
      {/* Puedes implementar la lógica para generar reportes aquí */}
    </div>
    </>
  );
};

export default ReportScreen;
