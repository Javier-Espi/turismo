function validarFormulario() {
    const irAtras = document.getElementById("irInicio");
    const envioPorWa = document.getElementById("envioPorWa");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");

    if (envioPorWa.checked && telefono.value.trim() === "") {
        window.alert("Por favor, ingresa un número de WhatsApp.");
        return false;
    }

    if (envioPorEm.checked && correo.value.trim() === "") {
        window.alert("Por favor, ingresa un correo electrónico.");
        return false;
    }
    window.alert("Nos contactaremos a la brevedad");
    irAtras.click();
    return true;
}

const formularioContacto = document.getElementById('formularioContacto');
formularioContacto.addEventListener('submit', function (event) {
    event.preventDefault();
    validarFormulario();
}, false);