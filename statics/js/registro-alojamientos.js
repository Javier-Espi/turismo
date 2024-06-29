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

let marcador = undefined

function agregarMarcador (lat, long) {
  if (marcador) {
    marcador.remove(map);
  }
  marcador = L.marker([lat, long]);
  marcador.addTo(map);
  activaDesactivaClasePorId("latitud","invalid",false);
  activaDesactivaClasePorId("longitud","invalid",false);
  activaDesactivaClasePorId("latitud","valid",true);
  activaDesactivaClasePorId("longitud","valid",true);
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    
    activaDesactivaClasePorId("formularioSeleccion","quitar",true);
    activaDesactivaClasePorId("contenedorImagen","quitar",true);
    activaDesactivaClasePorId("btnGestionEliminarAlojamiento","ocultar",true);
    activaDesactivaClasePorId("formularioRegistro","ocultar",true);
    activaDesactivaClasePorId("latitud","invalid",true);
    activaDesactivaClasePorId("longitud","invalid",true);

    
    map.on('click', function(e) {
      let latitud = e.latlng.lat;
      let longitud = e.latlng.lng;
      document.getElementById('latitud').value = latitud;
      document.getElementById('longitud').value = longitud;
    agregarMarcador(latitud, longitud)
    });

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

    const cuit = document.getElementById('cuit');
    cuit.addEventListener('focusout', function () {
      if (!verificarCuit(cuit.value)) {
        activaDesactivaClasePorId("cuit","invalid",true);
      } else {
        activaDesactivaClasePorId("cuit","invalid",false);
      }
    }, false,);


    await cargarSelectorPorNombre();

    selectorGestionar.addEventListener("change", async () => {
      activaDesactivaClasePorId("formularioRegistro","ocultar",false);
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
          agregarMarcador(latitud.value, longitud.value)
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

async function otrasValidaciones() {
  // Validación de CUIT
  if (verificarCuit(cuit.value)) {
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
  }
  catch (error) {
  console.error('Error al intentar el alta del registro en el servidor:', error);
  }
}

async function modificoAlojamientoDelRegistro(idModificar, alojamiento) {
  //alojamientosGuardados.push(alojamiento);
  try{
    conectarseAlBackend(BASEURL+'/api/alojamientos/'+idModificar, 'PUT', alojamiento);
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

  window.alert('La operación solicitada fue realizada con éxito');
  const irAtras =  document.getElementById('navIrAlojamientos');
  irAtras.click();
}