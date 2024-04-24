
    function actualizarAlojamientoSeleccionadoPorId(id) {
        // Encuentra el alojamiento por ID
        fetch('../statics/data/alojamientos-crud.json')
          .then(response => response.json())
          .then(data => {
            let alojamiento = data.find(aloj => aloj.id === id);
            if (!alojamiento) {
              throw new Error('Alojamiento no encontrado');
            } else {
                let alojamientoSeleccionado = document.querySelector('.alojamiento-selected');
                let item = document.createElement('div');
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
        console.log(alojamiento.coordenadas)
    }
          })
          .catch(error => console.error('Error al buscar el alojamiento:', error));
        }

actualizarAlojamientoSeleccionadoPorId(1)

// Suponiendo que tienes un archivo 'alojamientos-crud.json' con la información de los alojamientos
fetch('../statics/data/alojamientos-crud.json')

  .then(response => response.json())
  .then(data => {
    const listaAlojamientos = document.querySelector('.alojamiento-lista');
    data.forEach(alojamiento => {
      const item = document.createElement('li');
      item.className = 'alojamiento-lista-item';
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
