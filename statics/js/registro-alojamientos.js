const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function conectarseAlBackend(url, method, data = null) {
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

async function cargarSelectorPorNombre() {
  try {
    const data = await conectarseAlBackend(BASEURL+'/api/alojamientos', 'GET');
    const listaNombresAlojamientos = data.map(alojamiento => alojamiento.nombre);
    listaNombresAlojamientos.unshift("Ver lista desplegable"); // Para no dejar un alojamiento como default al inicio
    agregarSelectPorId('selectorGestionar', listaNombresAlojamientos);
  } catch (error) {
    console.error('Error al cargar lista del Seleccionador de alojamientos:', error);
  }
}

async function alojamientoSeleccionadoPorNombre(nombre) {
  try {
    const data = await conectarseAlBackend(BASEURL+'/api/alojamientos', 'GET');
    const alojamiento = data.find(aloj => aloj.nombre === nombre);
    if (!alojamiento) {
      throw new Error('Alojamiento no encontrado');
    }
    return alojamiento;
  } catch (error) {
    console.error('Error al buscar el alojamiento:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await cargarSelectorPorNombre();

    activaDesactivaClasePorId("formularioSeleccion","quitar",true);
    activaDesactivaClasePorId("contenedorImagen","quitar",true);
    activaDesactivaClasePorId("btnGestionEliminarAlojamiento","ocultar",true);
    activaDesactivaClasePorId("formularioRegistro","ocultar",true);

    const imagenInput = document.getElementById('imagenInput');
    const btnNavRegistrar = document.getElementById('btnNavRegistrar');
    btnNavRegistrar.addEventListener('click', function () {
      imagenInput.required = true;
      activaDesactivaClasePorId("btnNavGestionar","quitar",true);
      activaDesactivaClasePorId("contenedorImagen","quitar",false);
      activaDesactivaClasePorId("btnEditarImagenGestionar","quitar",true);
      activaDesactivaClasePorId("formularioRegistro","ocultar",false);
    }, false,);

    const btnNavGestionar = document.getElementById('btnNavGestionar');
    btnNavGestionar.addEventListener('click', function () {
      activaDesactivaClasePorId("btnNavRegistrar","quitar",true)
      activaDesactivaClasePorId("btnEditarImagenGestionar","ocultar",true);
      activaDesactivaClasePorId("imagenLabel","quitar",true)
      activaDesactivaClasePorId("imagenInput","quitar",true)
      activaDesactivaClasePorId("contenedorImagen","quitar",false);    
      activaDesactivaClasePorId("formularioSeleccion","quitar",false);
      activaDesactivaClasePorId("formularioRegistro","ocultar",false);
      activaDesactivaClasePorId("btnGestionEliminarAlojamiento","ocultar",false);
      document.getElementById("btnSubmitForm").textContent = "Modificar Alojamiento";
    }, false,);

    const btnEditarImagenGestionar = document.getElementById('btnEditarImagenGestionar');
    btnEditarImagenGestionar.addEventListener('click', function () {
      imagenInput.required = true;
      activaDesactivaClasePorId("imagenLabel","quitar",false);
      activaDesactivaClasePorId("imagenInput","quitar",false);
      const imagenGestionar = document.getElementById('imagenGestionar');
      imagenGestionar.src = '../statics/img/registro-alojamiento/foto-pre-registro.jpeg';
    }, false,);

    
    imagenInput.addEventListener('change', function () {
      const archivo = imagenInput.files[0];
      if (archivo) {
        const urlImagen = URL.createObjectURL(archivo);
        const imagenGestionar = document.getElementById('imagenGestionar');
        imagenGestionar.src = urlImagen;
        imagenRuta.value = 'https://res.cloudinary.com/dyscqlrom/image/upload/foto-a-verificar_ydejdr.jpg'
      } else {
        imagenGestionar.src = '../statics/img/registro-alojamiento/foto-pre-registro.jpeg';
      }
    }, false,);


    selectorGestionar.addEventListener("change", async () => {
      if (selectorGestionar.value !== "Ver lista desplegable") {
        try {
          activaDesactivaClasePorId("btnEditarImagenGestionar","ocultar",false);
          const alojamientoSel = await alojamientoSeleccionadoPorNombre(selectorGestionar.value);
          const imagenGestionar = document.getElementById('imagenGestionar');
          const id = document.getElementById('id');
          const imagenRuta = document.getElementById('imagenRuta');
          const cuit = document.getElementById('cuit');
          const nombre = document.getElementById('nombre');
          const web = document.getElementById('web');
          const telefono = document.getElementById('telefono');
          const correo = document.getElementById('correo');
          const direccion = document.getElementById('direccion');
          const latitud = document.getElementById('latitud');
          const longitud = document.getElementById('longitud');
          imagenGestionar.src = alojamientoSel.imagenRuta;
          imagenRuta.value = alojamientoSel.imagenRuta;
          id.value = alojamientoSel.id;
          cuit.value = alojamientoSel.cuit;
          nombre.value = alojamientoSel.nombre;
          web.value = alojamientoSel.web;
          telefono.value = alojamientoSel.telefono;
          correo.value = alojamientoSel.correo;
          direccion.value = alojamientoSel.direccion;
          latitud.value = alojamientoSel.latitud;
          longitud.value = alojamientoSel.longitud;
        } 
        catch (error) {
          console.error(error);
        }
      }
    });

    const btnGestionEliminarAlojamiento = document.getElementById('btnGestionEliminarAlojamiento');
    btnGestionEliminarAlojamiento.addEventListener('click',borrarDatos);

    const formulario = document.getElementById('btnSubmitForm');
    formulario.addEventListener('click',otrasValidaciones);
      }

  catch (error) {
    console.error('Error al conectar con el servidor:', error);
  }
});

function verificarCuit(cuit) {
  if (cuit.length !== 11) {
    return false;
  }
  let acumulado = 0;
  let digitos = cuit.split('').map(num => parseInt(num, 10));
  let digitoVerificador = digitos.pop();
  for (let i = 0; i < digitos.length; i++) {
    acumulado += digitos[9 - i] * (2 + (i % 6));
  }
  let verif = 11 - (acumulado % 11);
  if (verif === 11) {
    verif = 0;
  } else if (verif === 10) {
    verif = 9;
  }
  return digitoVerificador === verif;
}


function validarFormulario() {
  return document.getElementById('formularioRegistro').checkValidity();
}


async function otrasValidaciones() {
  // Validación de CUIT
  let cuit = document.getElementById('cuit').value;
  if (verificarCuit(cuit)) {
    const datosValidos = validarFormulario();
    if (datosValidos) {
      await enviarDatos();
    };
  } else {
    alert('El CUIT ingresado no es válido.');
  };
};

async function borroAlojamientoPorId(idBorrar) {
  try{
    conectarseAlBackend(BASEURL+'/api/alojamientos/'+idBorrar, 'DELETE');
  }
  catch (error) {
  console.error('Error al intentar borrar el registro en el servidor:', error);
  }
}

async function borrarDatos() {
  let advertencia = window.confirm('Los datos de su alojamiento se borrarán definitivamente, ¿está seguro de continuar?');
  if (advertencia) {
    await borroAlojamientoPorId(parseInt(id.value, 10));
    window.alert('El alojamiento fue dado de baja con éxito');
    const irAtras =  document.getElementById('navIrAlojamientos');
    irAtras.click();
  };
};

class Alojamiento {
  constructor(id=null, imagenRuta, cuit, nombre, web=null, telefono, correo, direccion, latitud, longitud){
    this.id = parseInt(id, 10);
    this.imagenRuta = imagenRuta;
    this.cuit = parseInt(cuit, 10);
    this.nombre = nombre;
    this.web = web;
    this.telefono = parseInt(telefono, 10);
    this.correo = correo;
    this.direccion = direccion;
    this.latitud = latitud;  // Tengo que darle formato numero???? a las coordenadas
    this.longitud = longitud;
  }
}

// LA IDEA ERA EN ENVIAR DATOS LLAMAR A ESTAS FUNCIONES VER SI ASI O DIRECTO TODO EN LA FUNCION

async function agregoAlojamientoAlRegistro(alojamiento) {
  try{
    conectarseAlBackend(BASEURL+'/api/alojamientos', 'POST', alojamiento);
    console.log('Entro al POST')
  }
  catch (error) {
  console.error('Error al intentar el alta del registro en el servidor:', error);
  }
}

async function modificoAlojamientoDelRegistro(idModificar, alojamiento) {
  //alojamientosGuardados.push(alojamiento);
  try{
    conectarseAlBackend(BASEURL+'/api/alojamientos/'+idModificar, 'PUT', alojamiento);
    console.log('Entro al PUT')
  }
  catch (error) {
  console.error('Error al intentar modificar el registro en el servidor:', error);
  }
}


async function enviarDatos() {
  const alojamientoParaProcesar = new Alojamiento(
    id.value, imagenRuta.value, cuit.value, nombre.value,
          web.value, telefono.value, correo.value,
          direccion.value, latitud.value, longitud.value
    );

  if( id.value!==""){
    modificoAlojamientoDelRegistro(alojamientoParaProcesar.id, alojamientoParaProcesar)
  }else{
    // Si no hay id, realiza una petición POST para crear un nuevo 
    agregoAlojamientoAlRegistro(alojamientoParaProcesar)
  }

  window.alert('La operación realizada con el alojamiento fue realizada con éxito');
  const irAtras =  document.getElementById('navIrAlojamientos');
  irAtras.click();
}