 
       // ***********************SCRIPTS SPBRE EL MAPA EN SI********************************
        // Inicializo las Variables del Mapa Base para el interprete Leaflet
        var mapZoom = 8
        var map = L.map('map', {
            center: [-32.17, -64.775],
            zoom: 15,
            doubleClickZoom: false,
            closePopupOnClick: false,
            //Son true por default pero las pongo por si conviene desactivar en alguna capa -para recordarlas- SE PODRIA SACAR - 
            dragging: true,
            zoomSnap: true,
            zoomDelta: true,
            trackResize: true,
            touchZoom: true,
            scrollWheelZoom: true
        });
        /* Setea la vista y zoom inicial coordenadas en decimal
        y luego el zoom en la ventana creada en el Div (10 mas amplio que 15 por ejemplo) y seran proporcionales
        a lo grande o chico de la ventana del div
        */
        var tileOsm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a href="http://www.osm.org/copyright" target="_blank">&copy OpenStreetMap</a>',
            //atribucion de los datos propiedad intelectual del MAPA OJO NO OLVIDAR CAMBIAR SI SE CAMBIA -
        }).addTo(map);

        
        // mostrar escala en el mapa (KM y ML podria sacar Ml o no...)
        var escala = L.control.scale();
        L.control.scale(escala).addTo(map);

                // CUADRO AUXILIAR DE INFORMACION sobre el objeto de la capa activa sobre el que pasa el mouse
                var infoZona = L.control({
                    position: 'bottomright'
                });
        
                infoZona.onAdd = function(map) {
                    this._div = L.DomUtil.create('div', 'styleInfoZona');
                    this.update();
                    return this._div;
                };

                

 // Función que muestra al passar el mouse sobre el ramal
    function muestraDatosEnInfo(e) {
        var capa = e.target;
        infoRamal.update(capa.feature.properties);
    }

// Función que resetea el cuadro de info cuando el mouse deja el ramal
    function noMuestraDatosEnInfo(e) {
        infoRamal.update();
    }   
