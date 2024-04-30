/** Funcion para  modificar visualizacion de un elemento y alternar entre el defoult y quitar/ocultar/atenuar
@param {string} id
@param {string} clase podrá ser "quitar", "ocultar"-reserva espacio- o "atenuar"
@param {boolean} activado - true o false para activar o desactivar la visualizacion especial
*/
function activaDesactivaClasePorId(id, clase, activado) {
    let elemento = document.getElementById(id);
    if (activado) {  
        elemento.classList.add(clase);
    } else {
        elemento.classList.remove(clase);
    };
    };


    

    function haceArraySelectHTML(lista) {
        let dataListHTML = ""
        for (let elemento of lista) { dataListHTML += '<option value="' + elemento + '">'+ elemento + "</option>"}
        return dataListHTML
    }

    function agregarSelectPorId(id, lista) {
        let entrarLista = document.getElementById(id);
        entrarLista.innerHTML = haceArraySelectHTML(lista);
    }

