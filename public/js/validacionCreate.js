window.addEventListener("load", function() {

    let formulario = document.querySelector("form.crear");
    console.log(formulario, "soy una prueba");

    formulario.addEventListener("submit", function(e) {
        let errores = [];

        let productName = document.querySelector("input#validacionName");
        if (productName.value == "") {
            errores.push("indique el nombe del producto")
        } else if (productName.value.length < 5) {
            errores.push("minimo 5 letras")
        }
        let descripcion = document.querySelector("input#description")
        if (descripcion.value == "") {
            errores.push("debe ser completada la descripcion")
        } else if (descripcion.value.length < 20) {
            errores.push("minimo 20 caracteres")
        }

        let modelo = document.querySelector("input#models")
        if (modelo.value == "") {
            document.getElementById("errorModelo").innerHTML = "debes indicar un modelo"
            errores.push("modelo");
        }
        let precio = document.querySelector("input#price")
        if (precio.value == "") {
            errores.push("indique el precio")
        }
        let minBuy = document.querySelector("input#minBuy")
        if (minBuy.value == "") {
            errores.push("indique minimo de compra")
        }

        if (errores.length > 0) {
            e.preventDefault();

        }

        /*   if (categoria.value == "") {
            alert("seleccione otra cat")
        } 
        fijarse como por defecto q diga otro msj
*/
    })


})