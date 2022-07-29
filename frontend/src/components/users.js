import React, { useState, useEffect } from "react";


function Users() {
    const [lastUser, setLastUser] = useState([]);
    const [cantUser, setCantUser] = useState([]);

    useEffect(() => {   
		fetch("http://localhost:3001/users/api")
		.then(response => response.json())
		.then(data => {
			setLastUser(data.data[data.data.length-1])
            setCantUser(data.data.length)
		})
	},[])
    



    return (
       
        <div>
            <div className="contenedorCantidades">
                <h5>Total de Usuarios </h5>
                <span className="cantidadUsuarios">{cantUser}</span>
            </div>
            <div className="contenedorCantidades">
                <div>
                    <h5>Ultimo Usuario conectado</h5>
                </div>
                <div>
                    <div><span className="dato3">Nombre:</span><span className="dato1">{lastUser.nombre}</span></div>
                    <div><span className="dato3">Email:</span><span className="dato1">{lastUser.email}</span> </div>
                    <div><span className="dato3">compañia:</span><span className="dato1">{lastUser.companyName}</span></div>
                    
                </div>
            </div>
        </div>

    )
}
export default Users;