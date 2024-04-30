function obtenerDatosAlojamientos() {
  return fetch('../statics/data/alojamientos-crud.json').then(response => response.json());
}


async function cargarSelectorPorNombre() {
  try {
    const data = await obtenerDatosAlojamientos();
    const listaNombresAlojamientos = data.map(alojamiento => alojamiento.nombre);
    listaNombresAlojamientos.unshift("Ver lista desplegable"); // Para no dejar un alojamiento como default al inicio
    agregarSelectPorId('selectorGestionar', listaNombresAlojamientos);
  } catch (error) {
    console.error('Error al cargar lista del Seleccionador de alojamientos:', error);
  }
}


  async function alojamientoSeleccionadoPorNombre(nombre) {
    try {
      const data = await obtenerDatosAlojamientos();
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
    activaDesactivaClasePorId("btnGestionEliminarAlojamiento","ocultar",true);
    activaDesactivaClasePorId("formularioRegistro","ocultar",true);

    const btnNavRegistrar = document.getElementById('btnNavRegistrar');
    btnNavRegistrar.addEventListener('click', function () {
      activaDesactivaClasePorId("btnNavGestionar","ocultar",true);
      activaDesactivaClasePorId("formularioRegistro","ocultar",false);
    }, false,);

    const btnNavGestionar = document.getElementById('btnNavGestionar');
    btnNavGestionar.addEventListener('click', function () {
      activaDesactivaClasePorId("btnNavRegistrar","ocultar",true)
      activaDesactivaClasePorId("formularioSeleccion","quitar",false);
      activaDesactivaClasePorId("formularioRegistro","ocultar",false);
      activaDesactivaClasePorId("btnGestionEliminarAlojamiento","ocultar",false);
      document.getElementById("btnSubmitForm").textContent = "Modificar Alojamiento";
    }, false,);

    selectorGestionar.addEventListener("change", async () => {
      if (selectorGestionar.value !== "Ver lista desplegable") {
        try {
          const alojamientoSel = await alojamientoSeleccionadoPorNombre(selectorGestionar.value);
          console.log(alojamientoSel)
          const id = document.getElementById('id');
          //const imagen = document.getElementById('imagen'); //No sin servidor
          const cuit = document.getElementById('cuit');
          const nombre = document.getElementById('nombre');
          const web = document.getElementById('web');
          const telefono = document.getElementById('telefono');
          const correo = document.getElementById('correo');
          const direccion = document.getElementById('direccion');
          const latitud = document.getElementById('latitud');
          const longitud = document.getElementById('longitud');
          id.value = alojamientoSel.id;
          //imagen.value = alojamientoSel.imagen //No sin servidor
          cuit.value = alojamientoSel.cuit;
          nombre.value = alojamientoSel.nombre;
          web.value = alojamientoSel.web;
          telefono.value = alojamientoSel.telefono;
          correo.value = alojamientoSel.correo;
          direccion.value = alojamientoSel.direccion;
          latitud.value = alojamientoSel.coordenadas[0];
          longitud.value = alojamientoSel.coordenadas[1];
      } catch (error) {
        console.error(error);
      }
    }
  });

  const btnGestionEliminarAlojamiento = document.getElementById('btnGestionEliminarAlojamiento');
  btnGestionEliminarAlojamiento.addEventListener('click', function () {
    borrarDatos();
  }, false,);

const formulario = document.getElementById('formularioRegistro');
  formulario.addEventListener('submit', async function(event) {
    event.preventDefault();
    await otrasValidaciones(formulario);
  });

// Limitar la cantidad de archivos permitidos NO HASTA TENER SERVIDOR
      // document.getElementById('imagen').addEventListener('change', function() {
      //   const cantidadMaxArchivos = 1; 
      //   if (this.files.length > cantidadMaxArchivos) {
      //     alert('Solo puedes subir un máximo de ' + cantidadMaxArchivos + ' archivo/s.');
      //     this.value = '';
      //     }
      //   });
  } catch (error) {
    console.error('Error al importar informacion del servidor:', error);
  }
});


async function otrasValidaciones(formulario) {
  try {
    const response = await fetch('../statics/data/alojamientos-crud.json');
    const datos = await response.json();
    // Los alojamientos pueden tener ID de 10 a 90 en la segunda etapa seguramente
    // se asignará en el sercidor, pero por ahora se busca el 1ro libre en JSON
    // Este dato esta oculto y read-only para el usuario mientras se use desde acá
    const idsPosibles = Array.from({ length: 90 }, (_, i) => i + 10);
    datos.forEach(alojamiento => {
      const index = idsPosibles.indexOf(alojamiento.id);
      if (index !== -1) {
        idsPosibles.splice(index, 1);
      }
    });
    let id = document.getElementById('id').value;
    if (id == "") {
      document.getElementById('id').value = idsPosibles[0];
    }
    // Validación de CUIT
    const cuit = document.getElementById('cuit').value;
    if (verificarCuit(cuit)) {
      const datosValidos = validarFormulario();
      if (datosValidos) {
        enviarDatos(formulario);
      }
    } else {
      alert('El CUIT ingresado no es válido.');
    }
  } catch (error) {
    console.error('Error al verificar id con el servidor:', error);
  }
}

  
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


// ******* ESTAS FUNCIONES ESTAN SOLO AL EFECTO DE SIMULAR LAS ACCIONES A REALIZAR EN UNA 2DA ETAPA *****

function enviarDatos(formulario) {
  const data = new FormData(formulario);
  console.log(data);
  window.alert("Los datos están siendo enviados al Servidor y serán verificados antes de subirse efectivamente a la página.");
  const irAtras =  document.getElementById('navIrAlojamientos');
  irAtras.click();
 

      // *** PARA 2 TP ****
//   fetch('../statics/data/alojamientos-crud3.json', {
//      method: 'POST',
//      body: datos
//    })
//    .catch(error => console.error('Error:', error));
}


function borrarDatos() {
  let advertencia = window.confirm ('Los datos de su alojamiento se borraran definitivamente, esta seguro de continuar?');
  if(advertencia) {
    window.alert('El alojamiento fue dado de baja con exito');
    const irAtras =  document.getElementById('navIrAlojamientos');
    irAtras.click();
  }
}