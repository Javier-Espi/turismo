class Alojamiento {
  constructor(id, imagen, cuit, nombre, web, telefono, correo, direccion, lat, long){
    this.id = parseInt(id, 10);
    this.imagen = imagen;
    this.cuit = parseInt(cuit, 10);
    this.nombre = nombre;
    this.web = web;
    this.telefono = parseInt(telefono, 10);
    this.correo = correo;
    this.direccion = direccion;
    this.coordenadas = [lat, long];
  }
}

var alojamientosEnMemoria = {}
alojamientosEnMemoria = localStorage.getItem('guardadoEnLocalStorage');
var alojamientosGuardados = {};
if (alojamientosEnMemoria === null) {
  alojamientosGuardados = [
    {
      "id": 10,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20024393969,
      "nombre": "LA CASA DEL BOSQUE 1",
      "web": "https://www.google.com.ar",
      "telefono": 1111111111,
      "correo": "bosque1@turismo.com.ar",
      "direccion": "CALLE 1 Nº 123",
      "coordenadas": [
        -32.17222,
        -64.77706
      ]
    },
    {
      "id": 12,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20028938471,
      "nombre": "LA CASA DEL BOSQUE 2",
      "web": "https://www.google.com.ar",
      "telefono": 1111111112,
      "correo": "bosque2@turismo.com.ar",
      "direccion": "CALLE 2 Nº 123",
      "coordenadas": [
        -32.16583,
        -64.77396
      ]
    },
    {
      "id": 13,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20042507157,
      "nombre": "LA CASA DEL BOSQUE 3",
      "web": "https://www.google.com.ar",
      "telefono": 1111111113,
      "correo": "bosque3@turismo.com.ar",
      "direccion": "CALLE 3 Nº 123",
      "coordenadas": [
        -32.17100,
        -64.77914
      ]
    },
    {
      "id": 14,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20043573579,
      "nombre": "LA CASA DEL BOSQUE 4",
      "web": "https://www.google.com.ar",
      "telefono": 1111111114,
      "correo": "bosque4@turismo.com.ar",
      "direccion": "CALLE 4 Nº 123",
      "coordenadas": [
        -32.17224,
        -64.77704
      ]
    },
    {
      "id": 15,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20043817818,
      "nombre": "LA CASA DEL BOSQUE 5",
      "web": "https://www.google.com.ar",
      "telefono": 1111111115,
      "correo": "bosque5@turismo.com.ar",
      "direccion": "CALLE 5 Nº 123",
      "coordenadas": [
        -32.16995,
        -64.77566
      ]
    },
    {
      "id": 16,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20044390680,
      "nombre": "LA CASA DEL BOSQUE 6",
      "web": "https://www.google.com.ar",
      "telefono": 1111111116,
      "correo": "bosque6@turismo.com.ar",
      "direccion": "CALLE 6 Nº 123",
      "coordenadas": [
        -32.17020,
        -64.77564
      ]
    },
    {
      "id": 17,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20044705606,
      "nombre": "LA CASA DEL BOSQUE 7",
      "web": "https://www.google.com.ar",
      "telefono": 1111111117,
      "correo": "bosque7@turismo.com.ar",
      "direccion": "CALLE 7 Nº 123",
      "coordenadas": [
        -32.17167,
        -64.76835
      ]
    },
    {
      "id": 18,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20044775191,
      "nombre": "LA CASA DEL BOSQUE 8",
      "web": "https://www.google.com.ar",
      "telefono": 1111111118,
      "correo": "bosque8@turismo.com.ar",
      "direccion": "CALLE 8 Nº 123",
      "coordenadas": [
        -32.17246,
        -64.77444
      ]
    },
    {
      "id": 19,
      "imagen": "../statics/data/Alojamiento.webp",
      "cuit": 20045445934,
      "nombre": "LA CASA DEL BOSQUE 9",
      "web": "https://www.google.com.ar",
      "telefono": 1111111119,
      "correo": "bosque9@turismo.com.ar",
      "direccion": "CALLE 9 Nº 123",
      "coordenadas": [
        -32.17177,
        -64.77120
      ]
    }
  ];
  
  alojamientosEnMemoria = localStorage.setItem('guardadoEnLocalStorage', JSON.stringify(alojamientosGuardados))
} else {
  alojamientosGuardados = JSON.parse(alojamientosEnMemoria);
}