// src/utils/expenseUtils.js

export const divideExpensesEqually = (ticket, miembros) => {
    if (!miembros || miembros.length === 0) {
        return []; // Devuelve un arreglo vacío si no hay miembros
    }

    const totalMiembros = miembros.length;
    const amountPerMember = ticket.montoTotal / totalMiembros;

    return miembros.map((miembro) => ({
        nombre: miembro.nombre,
        email: miembro.email,
        amount: amountPerMember,
    }));
};
