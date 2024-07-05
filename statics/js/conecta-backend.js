//const BASEURL = 'https://javierespi.pythonanywhere.com';
const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function conectarseJsonBackend(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Ocurrió un error inesperado al comunicarse con el servidor.');
    const irAtras =  document.getElementById('navIrAlojamientos');
    irAtras.click();
  }
}

async function conectarseFormBackend(url, method, formulario) {
  const formData = new FormData(formulario); // Crea un objeto FormData del formulario con ID formularioRegistro
  const options = {
      method: method,
      body: formData ? formData : null, // Usa el formulario como cuerpo de la solicitud
  };

  try {
      const response = await fetch(url, options); // Realiza la petición fetch
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json(); // Devuelve la respuesta en formato JSON
  } catch (error) {
      console.error('Fetch error:', error);
      alert('Ocurrió un error inesperado al comunicarse con el servidor (error archivo binario).');
      const irAtras =  document.getElementById('navIrAlojamientos');
      irAtras.click();
    }
}