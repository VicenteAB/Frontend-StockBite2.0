import { SquareArrowRight } from 'lucide-react'

export default function RestauranteCard({ restaurante }) {
    return (
        <div className="flex justify-between items-center text-white bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-lg shadow-lg w-full">
            <div>
                <h1 className="text-xl pb-2">{restaurante.nombre}</h1>
                <p>ID: {restaurante.id}</p>
                <p>Dirección: {restaurante.direccion}</p>
            </div>
            <SquareArrowRight size={45} />
        </div>
    )
}