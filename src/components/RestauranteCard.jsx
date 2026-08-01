import { SquareArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RestauranteCard({ restaurante }) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/restaurante/${restaurante.id}`)
    }

    return (
        <div className="flex justify-between items-center text-white bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-lg shadow-lg w-full">
            <div>
                <h1 className="text-xl pb-2">{restaurante.nombre}</h1>
                <p>ID: {restaurante.id}</p>
                <p>Dirección: {restaurante.direccion}</p>
            </div>
            <SquareArrowRight onClick={handleClick} className="cursor-pointer" size={45} />
        </div>
    )
}