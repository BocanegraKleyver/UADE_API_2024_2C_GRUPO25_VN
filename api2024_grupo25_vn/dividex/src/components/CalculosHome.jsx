import { getTickets, divideExpensesEqually } from '../services/ticketService'; // Mover la importación al inicio
import TablaGastos from './ExpenseTable';
let usuarios = []; // Simulación de una base de datos en memoria
let proyectos = []; // Simulación de proyectos
let gastos = []; // Simulación de gastos
let deudas = []; // Simulación de deudas
let deudasDeAmigos = []; // Simulación de deudas de amigos
const emailUsuario = JSON.parse(localStorage.getItem('usuario'))?.email; // Usar el operador de encadenamiento opcional


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
            const proyectos = JSON.parse(localStorage.getItem('projects')) || [];            
            const proyectosFiltrados = proyectos.filter(proyecto => 
                proyecto.miembros.some(miembro => miembro.email === emailUsuario));
            resolve(proyectosFiltrados); 
        }, 1000);
    });
};


export const obtenerGastosUsuario = async () => {
    return new Promise(async (resolve) => {
        setTimeout(async () => {
            const tickets = await getTickets(); // Obtener tickets desde el servicio
            const totalGastos = tickets.reduce((total, ticket) => {
                if (ticket.miembrosSeleccionados && ticket.miembrosSeleccionados.includes(emailUsuario)) {
                    return total + ticket.montoTotal;
                }
                return total;
            }, 0); // Sumar todos los gastos
            resolve(totalGastos);
        }, 1000);
    });
};


export const obtenerDeudasUsuario = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tickets = JSON.parse(localStorage.getItem('tickets')) || []; // Leer del localStorage
            const emailUsuario = JSON.parse(localStorage.getItem('usuario'))?.email;

            // Filtrar solo los tickets que están en estado 0 y calcular la deuda total
            const totalDeuda = tickets.reduce((total, ticket) => {
                if (ticket.estado === 0 && ticket.expenseDetails) {
                    // Encontrar los detalles de gastos del usuario actual
                    const detalleUsuario = ticket.expenseDetails.find(detalle => detalle.miembro === emailUsuario);
                    if (detalleUsuario) {
                        return total + detalleUsuario.monto;
                    }
                }
                return total;
            }, 0); // Sumar todas las deudas pendientes

            resolve(totalDeuda);
        }, 1000);
    });
};

// Función para obtener deudas de amigos
export const obtenerDeudasAmigos = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const deudasDeAmigos = JSON.parse(localStorage.getItem('deudasAmigos')) || []; // Leer del localStorage
            const totalDeudaAmigos = deudasDeAmigos.reduce((total, deuda) => total + deuda.monto, 0); // Sumar deudas de amigos
            resolve(totalDeudaAmigos);
        }, 1000);
    });
};

// Obtener el correo electrónico del usuario
