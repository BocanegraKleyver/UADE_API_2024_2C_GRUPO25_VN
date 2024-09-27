import { getTickets } from '../services/ticketService'; 
import TablaGastos from './ExpenseTable';
let usuarios = []; 
let proyectos = []; 
let gastos = [];
let deudas = [];
let deudasDeAmigos = []; 


export const obtenerUsuarios = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usuarios);
        }, 1000);
    });
};


export const obtenerProyectos = async () => {
    return new Promise((resolve) => { 
        setTimeout(() => {
            resolve(getTickets); 
        }, 1000);
    });
};


export const obtenerGastosUsuario = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gastos.reduce((total, gasto) => total + gasto.montoTotal, 0)); 
        }, 1000);
    });
};


export const obtenerDeudasUsuario = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(deudas.reduce((total, deuda) => total + deuda.monto, 0)); 
        }, 1000);
    });
};


export const obtenerDeudasAmigos = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(deudasDeAmigos.reduce((total, deuda) => total + deuda.monto, 0)); 
        }, 1000);
    });
};