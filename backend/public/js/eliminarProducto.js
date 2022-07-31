window.addEventListener("load",function(){

    let botonEliminar =document.getElementById("cuidadoAlEliminar");
    console.log(botonEliminar, "te elimino");

    botonEliminar.addEventListener('click',function(e){
       
         
         if(confirm("¿seguro que deseas eliminar este prducto?")== true){
         }
         else{
            e.preventDefault()
         }
    })

})
;






