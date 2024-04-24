function removerElementoPorSelectorHTML (selectoEncomillado) {
    const elementoABorrar = document.querySelector(selectoEncomillado);
    if (elementoABorrar) {
        elementoABorrar.remove();
    };
};

function removerVariosElementosPorSelectorHTML (selectoEncomillado) {
    const elementosABorrar = document.querySelectorAll(selectoEncomillado);
    elementosABorrar.forEach(function(elemento) {
        elemento.remove();
      });
};

function removerAlojamientoSeleccionadoDeLista(id){
    const selector = "#alojamiento-id-"+id
    removerElementoPorSelectorHTML (selector);
};

function actualizarListaAlojamientos() {
    fetch('../statics/data/alojamientos-crud.json')
    .then(response => response.json())
    .then(data => {
        const listaAlojamientos = document.querySelector('.alojamiento-lista');
        data.forEach(alojamiento => {
            // MARCADORES EN EL MAPA
                // se creo para cada alojamiento un marcador
            var marker = L.marker(alojamiento.coordenadas);
                // se vincula el evento de clic al marcador para ejecutar una funcion con id de parametro
            marker.on('click', function(e) {
                actualizarAlojamientoSeleccionadoPorId(alojamiento.id);
            });
                // se agraga al mapa cada marcador
            marker.addTo(map);
            // LISTA EN EL HTML
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
            listaAlojamientos.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar lista de alojamientos:', error));
    }

    

    function actualizarAlojamientoSeleccionadoPorId(id) {
        // Encuentra el alojamiento por ID
        removerVariosElementosPorSelectorHTML('li.alojamiento-lista-item');
        actualizarListaAlojamientos()
        fetch('../statics/data/alojamientos-crud.json')
          .then(response => response.json())
          .then(data => {
            const alojamiento = data.find(aloj => aloj.id === id);
            if (!alojamiento) {
              throw new Error('Alojamiento no encontrado');
            } else {
                removerElementoPorSelectorHTML('.alojamiento-selected-item')
                const alojamientoSeleccionado = document.querySelector('.alojamiento-selected');
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
        removerAlojamientoSeleccionadoDeLista(id)
    }
          })
          .catch(error => console.error('Error al buscar el alojamiento:', error));
        }

        
        actualizarListaAlojamientos()
        