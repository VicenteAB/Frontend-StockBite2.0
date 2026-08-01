import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
        
    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = await login(username, password)
        localStorage.setItem('token', token)

        console.log('Token:', token) // Imprimir el token en la consola
        navigate('/home') // redirigir a la pagin principal
    }

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 rounded-lg shadow-lg w-96 ">
                <h1 className="text-center text-xl text-white font-bold">
                    Iniciar Sesión
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

                    <label className="text-white">Nombre de usuario</label>
                    <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" placeholder="Roberto Vicuña" className="p-1 border border-white bg-transparent text-white rounded focus:outline-none">
                    </input>
                    
                
                    <label className="text-white">Contraseña</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder="********" className="p-1 border border-white bg-transparent text-white rounded focus:outline-none">
                    </input>
                    
                    <button type="submit" className="cursor-pointer bg-white text-orange-500 font-bold py-2 px-4 rounded hover:bg-gray-200">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
        
    )
}