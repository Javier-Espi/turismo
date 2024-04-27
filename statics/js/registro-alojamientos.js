// **************  Funcionalidades Botones ***************
const btnNavRegistrar = document.getElementById('btnNavRegistrar');
btnNavRegistrar.addEventListener('click', function () {
  console.log("Registrar");
}, false,);


const btnNavGestionar = document.getElementById('btnNavGestionar');
btnNavGestionar.addEventListener('click', function () {
  console.log("Gestionar");
}, false,);

const btnSeleccionUsuario = document.getElementById('btnSeleccionUsuario');
btnSeleccionUsuario.addEventListener('click', function () {
  console.log("Selecionar");
}, false,);

const btnSubmitForm = document.getElementById('btnSubmitForm');
btnSubmitForm.addEventListener('click', function () {
  console.log("enviar");
}, false,);

const btnGestionEliminarAlojamiento = document.getElementById('btnGestionEliminarAlojamiento');
btnGestionEliminarAlojamiento.addEventListener('click', function () {
  console.log("Borrar");
}, false,);



// ******  Validaciones y operaciones formulario y CRUD *****

// Seleccionar el formulario
const formulario = document.getElementById('formularioRegistro');

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  formulario.addEventListener('submit', async function(event) {
    event.preventDefault();
    await otrasValidaciones();
  });
});

// Limitar la cantidad de archivos permitidos
document.getElementById('imagen').addEventListener('change', function() {
  const cantidadMaxArchivos = 1; 
  if (this.files.length > cantidadMaxArchivos) {
    alert('Solo puedes subir un máximo de ' + cantidadMaxArchivos + ' archivo/s.');
    this.value = '';
  }
});

async function otrasValidaciones() {
  try {
    const response = await fetch('../statics/data/alojamientos-crud.json');
    const datos = await response.json();
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


function enviarDatos(formulario) {
  alert("Los datos están siendo enviados al Servidor y serán verificados antes de subirse efectivamente a la página.");
  const data = new FormData(formulario);
  console.log(data)

      // *** PARA 2 TP ****
//   fetch('../statics/data/alojamientos-crud3.json', {
//      method: 'POST',
//      body: datos
//    })
//    .catch(error => console.error('Error:', error));
}
