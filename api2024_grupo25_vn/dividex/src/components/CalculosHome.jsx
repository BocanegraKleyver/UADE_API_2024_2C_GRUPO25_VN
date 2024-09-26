import { getTickets } from '../services/ticketService'; // Mover la importación al inicio
import TablaGastos from './ExpenseTable';
let usuarios = []; // Simulación de una base de datos en memoria
let proyectos = []; // Simulación de proyectos
let gastos = []; // Simulación de gastos
let deudas = []; // Simulación de deudas
let deudasDeAmigos = []; // Simulación de deudas de amigos

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usuarios);
        }, 1000);
    });
};

// Función para obtener todos los proyectos
export const obtenerProyectos = async () => {
    return new Promise((resolve) => { // Cambiar el retorno para que devuelva un array
        setTimeout(() => {
            resolve(getTickets); // Devolver la lista de proyectos
        }, 1000);
    });
};

// Función para obtener gastos de un usuario
export const obtenerGastosUsuario = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gastos.reduce((total, gasto) => total + gasto.montoTotal, 0)); // Sumar todos los gastos
        }, 1000);
    });
};

// Función para obtener deudas de un usuario
export const obtenerDeudasUsuario = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(deudas.reduce((total, deuda) => total + deuda.monto, 0)); // Sumar todas las deudas
        }, 1000);
    });
};

// Función para obtener deudas de amigos
export const obtenerDeudasAmigos = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(deudasDeAmigos.reduce((total, deuda) => total + deuda.monto, 0)); // Sumar deudas de amigos
        }, 1000);
    });
};