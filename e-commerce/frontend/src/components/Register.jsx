import { useRef } from "react";
import {useNavigate} from "react-router-dom"

export const Register = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataForm = new FormData(formRef.current) // Tranforma un html a un Objeto Iterador
        const data = Object.fromEntries(dataForm)// Tranforma un Objeto Iterador a Objeto Simple
        console.log(data)
        const response = await fetch('http://localhost:8080/api/sessions/register',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'    
            },
            body: JSON.stringify(data)
        })
        if(response.status == 200){
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
        }else{
            console.log(response)
        }
    }

    return (
        <div className="container">
            <h2>Formulario Register</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Nombre: </label>
                    <input type="text" name="first_name" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Apellido: </label>
                    <input type="text" name="last_name" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad: </label>
                    <input type="number" name="age" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" name="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    )
}