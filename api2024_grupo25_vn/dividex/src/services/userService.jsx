const users=JSON.parse(localStorage.getItem('usuario'))

export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : []; // Cargar del local storage o devolver vacío
};


export const updateUser = (usuarioActualizado) => {
  localStorage.setItem(users, JSON.stringify(usuarioActualizado));
};
