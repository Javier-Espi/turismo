document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.getElementById('formularioRegistro');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario
        var datosValidos = validarFormulario();
        if (datosValidos) {
            enviarDatos(formulario);
        }
    });
});

function validarFormulario() {
    // agregar acá las validaciones adicionales si se necesitan
    return document.getElementById('formularioRegistro').checkValidity();
}

function enviarDatos(formulario) {
    var datos = new FormData(formulario);
    // Busco convertir los datos a JSON y enviarlos al servidor
    fetch('../statics/data/alojamientos-crud.json', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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