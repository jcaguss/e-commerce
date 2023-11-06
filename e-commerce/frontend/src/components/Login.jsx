import { useRef } from "react";
import {useNavigate} from "react-router-dom"
export const Login = () => {
    
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataForm = new FormData(formRef.current) // Tranforma un html a un Objeto Iterador
        const data = Object.fromEntries(dataForm)// Tranforma un Objeto Iterador a Objeto Simple
        console.log(data)
        const response = await fetch('http://localhost:8080/api/sessions/login',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'    
            },
            body: JSON.stringify(data)
        })
        console.log(response)
        if(response.status == 200){
            const datos = response.json()
            document.cookie = `jwtCookie=${datos.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}path=/`
            navigate('/products')
        }else{
            console.log(response)
        }
    }
    return (
        <div className="container">
            <h2>Formulario Login</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" name="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-dark">Iniciar Session</button>
            </form>
        </div>
    )
}