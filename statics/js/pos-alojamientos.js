    function crearMarcador(coordenadas, id) {
        let marker = L.marker(coordenadas);
        marker.on('click', function() {
            actualizarAlojamientoSeleccionadoPorId(id);
        });
        marker.addTo(map);
    }

    function actualizarListaAlojamientos() {
        conectarseAlBackend(BASEURL+'/api/alojamientos', 'GET')
        .then(data => {
            const listaAlojamientos = document.querySelector('.alojamiento-lista');
            let coordenadas = [];
            data.forEach(alojamiento => {
                coordenadas = [alojamiento.latitud, alojamiento.longitud];
                crearMarcador(coordenadas, alojamiento.id);
                const item = document.createElement('li');
                item.className = 'alojamiento-lista-item';
                item.id = `alojamiento-id-${alojamiento.id}`
                item.innerHTML = `
                    <div class="alojamiento-item">
                    <img src="${alojamiento.imagenRuta}" alt="" class="alojamiento-item-img">
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

function actualizarAlojamientoSeleccionadoPorId(idAlojamiento) {
    const removerClaseQuitar = document.querySelector('li.quitar');
    if (removerClaseQuitar) {
        removerClaseQuitar.classList.remove("quitar");
    };

    conectarseAlBackend(BASEURL+'/api/alojamientos/'+idAlojamiento, 'GET')
      .then(data => {
        
        const alojamiento = data;
        let coordenadas = [alojamiento.latitud, alojamiento.longitud];
        if (!alojamiento) {
          throw new Error('Alojamiento no encontrado');
        } else {

            let popup = L.popup()
                .setLatLng(coordenadas)
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
                    <img src="${alojamiento.imagenRuta}" alt="" class="alojamiento-selected-item-principal-img">
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
        