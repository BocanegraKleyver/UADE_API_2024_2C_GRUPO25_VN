const fetchData = async (file) => {
  const response = await fetch(file);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("Datos obtenidos:", data); // Log para ver los datos obtenidos
  return data;
};

const initializeLocalStorage = async () => {
  if (!localStorage.getItem('projects')) {
      const projects = await fetchData('/db/project.json'); // Asegúrate de que esté en public/db
      localStorage.setItem('projects', JSON.stringify(projects));
      console.log("Proyectos cargados:", projects);
  }
  if (!localStorage.getItem('users')) {
      const users = await fetchData('/db/users.json'); // Asegúrate de que esté en public/db
      localStorage.setItem('users', JSON.stringify(users));
      console.log("Usuarios cargados:", users);
  }
};
export default initializeLocalStorage;
