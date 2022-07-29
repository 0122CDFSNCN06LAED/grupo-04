import React, {useState, useEffect } from "react";

function Prodcuts(props){
    const [lastProduct, setLastPoducts] = useState([]);
    const [cantProduct, setCantPoducts] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {   
		fetch("http://localhost:3001/products/api")
		.then(response => response.json())
		.then(data => {
			setLastPoducts(data.data[data.data.length-1])
            setCantPoducts(data.data.length)
            setProductList(data.data)
		})
	},[])
    
    return(
        <div>
            <div className="contenedorCantidades">
                <h5>Total de Productos</h5>
                <span className="cantidadProductos">{cantProduct}</span>
            </div>
            <div className="contenedorCantidades">
                <div>
                    <h5>Ultimo producto creado</h5>
                </div>
                <div>
                    <p className="dato1">{lastProduct.nombre} </p>
                    <p className="dato2">${lastProduct.precio} </p>
                    <p className="dato3">{lastProduct.descripcion} </p>
                    
                </div>
            </div>
            <div className="contenedorCantidades">
                <div>
                    <h5>Listado de Productos</h5>
                </div>
                <div>
                    {    
                        productList.map((producto) => (
                            <div>    
                                <span className="dato1">{producto.nombre}</span> <span className="dato2">${producto.precio}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
    
    
}

export default Prodcuts;