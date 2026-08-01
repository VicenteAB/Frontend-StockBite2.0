import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerInsumosPorRestaurante, obtenerRestaurantePorId } from "../services/restauranteDetalleService"


export default function RestauranteDetalle({}) {

    const { id } = useParams()
    const [insumosPorRestaurante, setInsumosPorRestaurante] = useState([])
    const [restaurante, setRestaurante] = useState({})
    
    useEffect(() => {
        obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
        obtenerRestaurantePorId(id).then(data => setRestaurante(data))
    }, [])
    

    return (
        <div>
            <div className="text-lg text-white border-2 bg-gradient-to-r from-orange-500 to-red-600 rounded mt-6 p-6 ml-6 mr-6">
                <h1 className="pt-4 text-2xl font-bold pl-6">{restaurante.nombre}</h1>
                <h2 className="text-lg pt-4 pb-10 text-2xl font-bold pl-6">{restaurante.direccion}</h2>
                <table className="w-full">
                    <thead className="border-b-2 border-white">
                        <tr className="divide-x divide-white/30">
                            <th className="px-6 pb-2">Nombre insumo</th>
                            <th className="px-6 pb-2">Stock actual (gramos)</th>
                            <th className="px-6 pb-2">Stock mínimo aceptable</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/30">
                        {insumosPorRestaurante.map(ir => (
                            <tr key={ir.id} className="divide-x divide-white/30">
                                <td className="px-6 py-2">{ir.nombre}</td>
                                <td className="px-6 py-2">{ir.stockActual}</td>
                                <td className="px-6 py-2">{ir.stockMinimo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}