

function obtenerDatosAlojamientos() {
  return alojamientosGuardados;
};



function cargarSelectorPorNombre() {
    const data = obtenerDatosAlojamientos();
    const listaNombresAlojamientos = data.map(alojamiento => alojamiento.nombre);
    listaNombresAlojamientos.unshift("Ver lista desplegable"); // Para no dejar un alojamiento como default al inicio
    agregarSelectPorId('selectorGestionar', listaNombresAlojamientos);
};


  function alojamientoSeleccionadoPorNombre(nombre) {
      let data = obtenerDatosAlojamientos();
      let alojamiento = data.find(aloj => aloj.nombre === nombre);
      if (!alojamiento) {
        throw new Error('Alojamiento no encontrado');
      }
      return alojamiento
  }



  document.addEventListener('DOMContentLoaded', () => {
    cargarSelectorPorNombre();

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

    selectorGestionar.addEventListener("change", () => {
      if (selectorGestionar.value !== "Ver lista desplegable") {
          const alojamientoSel = alojamientoSeleccionadoPorNombre(selectorGestionar.value);
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
      };
    });
  });

  const btnGestionEliminarAlojamiento = document.getElementById('btnGestionEliminarAlojamiento');
  btnGestionEliminarAlojamiento.addEventListener('click', function () {
    borrarDatos();
  }, false,);

  const btnSubmitForm = document.getElementById('btnSubmitForm');
  btnSubmitForm.addEventListener('click',  function () {
    otrasValidaciones();
  }, false,);

function otrasValidaciones() {
    let datos = obtenerDatosAlojamientos();
    // Los alojamientos pueden tener ID de 10 a 90 en la segunda etapa seguramente
    // se asignará en el sercidor, pero por ahora se busca el 1ro libre en Local Storage
    // Este dato esta oculto y read-only para el usuario mientras se use desde acá
    let idsPosibles = Array.from({ length: 90 }, (_, i) => i + 10);
    datos.forEach(alojamiento => {
      let index = idsPosibles.indexOf(alojamiento.id);
      if (index !== -1) {
        idsPosibles.splice(index, 1);
      }
    });
    let id = document.getElementById('id').value;
    if (id == "") {
      document.getElementById('id').value = idsPosibles[0];
    }
    // Validación de CUIT
    let cuit = document.getElementById('cuit').value;
    if (verificarCuit(cuit)) {
      const datosValidos = validarFormulario();
      if (datosValidos) {
        enviarDatos();
      };
    } else {
      alert('El CUIT ingresado no es válido.');
    };
  };


  
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


// ******* ESTAS FUNCIONES ESTAN SOLO AL EFECTO DE SIMULAR LAS ACCIONES A REALIZAR EN UNA 2DA ETAPA AL TENER SERVIDOR *****
function existeId(idBuscado) {
  return alojamientosGuardados.some(alojamiento => alojamiento.id === idBuscado);
}

function indexPorId(idBuscado) {
  for (let i = 0; i < alojamientosGuardados.length; i++) {
    if (alojamientosGuardados[i].id === idBuscado) {
      return i;
    }
  }
}


function borroAlojamientoPorId(idBorrar) {
  const indice = indexPorId(idBorrar);
  if (indice !== -1) {
    alojamientosGuardados.splice(indice, 1);
    console.log("Alojamiento con ID " + idBorrar + " eliminado.");
  } else {
    console.log("No se encontró ningún alojamiento con el ID " + idBorrar);
  }
}

function agregoAlojamientoAlRegistro(alojamiento) {
  alojamientosGuardados.push(alojamiento);
}



function enviarDatos() {
  const alojamientoParaIngresar = new Alojamiento(
    id.value, "../statics/data/foto-a-verificar.jpeg", cuit.value, nombre.value,
          web.value, telefono.value, correo.value,
          direccion.value, latitud.value, longitud.value
    );

  if (existeId(parseInt(id.value, 10))) {
   borroAlojamientoPorId(parseInt(id.value, 10));}
  
  agregoAlojamientoAlRegistro(alojamientoParaIngresar)
  window.alert("Los datos están siendo enviados al Servidor y serán verificados antes de subirse efectivamente a la página.");

  localStorage.setItem('guardadoEnLocalStorage', JSON.stringify(alojamientosGuardados));
  const irAtras =  document.getElementById('navIrAlojamientos');
  irAtras.click();
}


function borrarDatos() {
  let advertencia = window.confirm('Los datos de su alojamiento se borrarán definitivamente, ¿está seguro de continuar?');
  if (advertencia) {
    borroAlojamientoPorId(parseInt(id.value, 10));
    window.alert('El alojamiento fue dado de baja con éxito');
    localStorage.setItem('guardadoEnLocalStorage', JSON.stringify(alojamientosGuardados));
    const irAtras =  document.getElementById('navIrAlojamientos');
    irAtras.click();
  };
};
