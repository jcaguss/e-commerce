import { useRef } from "react";

export const Login = () => {
    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" name="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Session</button>
            </form>
        </div>
    )
}