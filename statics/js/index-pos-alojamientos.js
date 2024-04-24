//  ****************************** pasar a carpeta reutilizables ************************

function activaDesactivaClasePorId(id, clase, activado) {
    let elemento = document.getElementById(id);
    if (activado) {  
        elemento.classList.add(clase);
    } else {
        elemento.classList.remove(clase);
    };
    };
    // Si la idea es alternar entre el defoult y la opcion (quitar, ocultar o atenuar) esta funcion hace esa funcion
    // si quiero ocultar un elemento por ID hago lo siguiente: alternarClase("id", "nombre_del_Id", "quitar") y
    // se se ejecuta nuevamente esta vez la restablecera -en verdad deja el default que es inline-
    // Esta opcion agrega la posibildad de alternar entre una class definida en css y no solo Id al fijar el o los objetivos
    

//  *******************************************************************************************

function obtenerDatosAlojamientos() {
    return fetch('../statics/data/alojamientos-crud.json').then(response => response.json());
}

function crearMarcador(coordenadas, id) {
    let marker = L.marker(coordenadas);
    marker.on('click', function() {
        actualizarAlojamientoSeleccionadoPorId(id);
    });
    marker.addTo(map);
}

function actualizarListaAlojamientos() {
    obtenerDatosAlojamientos()
    .then(data => {
        const listaAlojamientos = document.querySelector('.alojamiento-lista');
        data.forEach(alojamiento => {
            crearMarcador(alojamiento.coordenadas, alojamiento.id)
            const item = document.createElement('li');
            item.className = 'alojamiento-lista-item';
            item.id = `alojamiento-id-${alojamiento.id}`
            item.innerHTML = `
                <div class="alojamiento-item">
                <img src="${alojamiento.imagen}" alt="" class="alojamiento-item-img">
                <div class="alojamiento-item-detalle">
                    <p class="alojamiento-item-detalle-nombre">
                    <b>${alojamiento.nombre}</b>
                    </p>
                    <p class="alojamiento-item-detalle-web">
                    <a href="${alojamiento.web}" target ="_blank" rel="noopener noreferrer">Sitio Web</a>
                    </p>
                    <p class="alojamiento-item-detalle-telefono">
                    <a href="tel:${alojamiento.telefono}">${alojamiento.telefono}</a>
                    </p>
                </div>
                </div>
            `;
            // Si fueran muchos se puede evaluar  poner listener en el padre y sacar por event delegation del tarjet
            item.addEventListener('click', function () {
                actualizarAlojamientoSeleccionadoPorId(alojamiento.id);
            }, false,);
            listaAlojamientos.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar lista de alojamientos:', error));
}

    function actualizarAlojamientoSeleccionadoPorId(id) {
        const removerClaseQuitar = document.querySelector('li.quitar');
        if (removerClaseQuitar) {
            console.log("funciono quitar")
            removerClaseQuitar.classList.remove("quitar");
        };

        obtenerDatosAlojamientos()
          .then(data => {
            const alojamiento = data.find(aloj => aloj.id === id);
            if (!alojamiento) {
              throw new Error('Alojamiento no encontrado');
            } else {

                let popup = L.popup()
                    .setLatLng(alojamiento.coordenadas)
                    .setContent("Su selección")
                    .openOn(map);

                activaDesactivaClasePorId(`alojamiento-id-${alojamiento.id}`, "quitar", true)

                const elementoABorrar = document.querySelector('.alojamiento-selected-item');
                if (elementoABorrar) {
                    elementoABorrar.remove();
                };

                const alojamientoSeleccionado = document.querySelector('.alojamiento-selected');
                alojamientoSeleccionado.innerHTML = '';

                const item = document.createElement('div');
                item.className = 'alojamiento-selected-item';
                item.innerHTML = `
                    <div class="alojamiento-selected-item-principal">
                        <img src="${alojamiento.imagen}" alt="" class="alojamiento-selected-item-principal-img">
                        <p class="alojamiento-selected-item-principal-nombre"><b>${alojamiento.nombre}</b></p>
                    </div>
                    <div class="alojamiento-selected-item-detalle">
                        <p class="alojamiento-selected-item-detalle-web">
                            <a href="${alojamiento.web}" target ="_blank" rel="noopener noreferrer">Sitio Web</a>
                        </p>
                    <p class="alojamiento-selected-item-detalle-telefono">
                    <a href="tel:${alojamiento.telefono}">${alojamiento.telefono}</a>
                    </p>
                    <p class="alojamiento-selected-item-detalle-email">
                        <a href="${alojamiento.correo}">enviar mail al propietario</a>
                    </p>
                    <p class="alojamiento-selected-item-detalle-direccion">${alojamiento.direccion}</p>
        `;
        alojamientoSeleccionado.appendChild(item);
    }
          })
          .catch(error => console.error('Error al buscar el alojamiento:', error));
        }

    actualizarListaAlojamientos()
        