console.log("soy una prueba");

window.addEventListener("load", function() {

    let formulario = document.querySelector("form.crear");
    console.log(formulario);
    let campoProductName = document.querySelectorAll("productName")
    console.log(campoProductName);

    formulario.addEventListener("submit", function(e) {
        e.preventDefault();
        let campoProductName = document.querySelector("input.nombreProducto");
        console.log(campoPrudctName);
        if (campoProductName.value == "") {
            alert("el campo de nombre debe cargarse")
        }





    })



})