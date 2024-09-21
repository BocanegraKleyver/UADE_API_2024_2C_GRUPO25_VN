export const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : []; // Cargar del local storage o devolver vacío
  };
  