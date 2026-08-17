import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerInsumosPorRestaurante, obtenerRestaurantePorId } from "../services/restauranteDetalleService"
import { obtenerRecetas, obtenerInsumosPorReceta } from "../services/recetaService"
import { ArrowLeft } from 'lucide-react';

export default function Receteas() {

    const { id } = useParams()

    const [restaurante, setRestaurante] = useState({})
    const [recetas, setRecetas] = useState([])

    const [insumosRestaurante, setInsumosRestaurante] = useState([])    

    useEffect(() => {
        // Como usamos await, necesitamos una función async adentro
        const cargarDatos = async () => {
            
            // Paso 1: traer el restaurante
            const dataRestaurante = await obtenerRestaurantePorId(id)
            setRestaurante(dataRestaurante)

            // Paso 2: traer las recetas
            const dataRecetas = await obtenerRecetas()

            //Para obtener el nombre de los inusmos
            const dataInsumos = await obtenerInsumosPorRestaurante(id)

            // Paso 3: por cada receta, traer sus insumos
            const recetasConInsumos = await Promise.all(
                dataRecetas.map(async (receta) => {
                    const insumos = await obtenerInsumosPorReceta(receta.id)
                    return { ...receta, insumos } // agrega insumos a la receta
                })
            )

            // Paso 4: guardar todo en el estado
            setRecetas(recetasConInsumos)

            
            setInsumosRestaurante(dataInsumos)
            
        }
        cargarDatos() // llamamos la función
    }, [])

    console.log(recetas)

    return (
        <div>
            <div className="text-lg text-white border-2 bg-gradient-to-r from-orange-500 to-red-600 rounded mt-6 p-6 ml-6 mr-6">
                
                <div className="flex items-center">
                    <ArrowLeft onClick={() => window.history.back()} className="cursor-pointer" size={30} />
                    <h1 className="mb-5 pt-4 text-2xl font-bold pl-6">Recetas disponibles</h1>
                </div>

                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-2xl">{restaurante.nombre}, {restaurante.direccion}</h1>
                </div>

                {/* Tabla de insumos */}
                <table className="w-full mt-12">
                    <thead className="border-b-2 border-white">
                        
                            <tr className="divide-x divide-white/30">
                            <th className="px-6 pb-2">Nombre receta</th>
                            <th className="px-6 pb-2">Ingredientes (gramos)</th>
                        </tr>                              
                        
                    </thead>
                    <tbody className="divide-y divide-white/30">
                        {recetas.map(r =>(
                            <tr className="divide-x divide-white/30">
                                <td className="px-6 py-2">{r.nombre}</td>
                                <td className="px-6 py-2">
                                    {r.insumos.map((ins) => {
                                        const insumo = insumosRestaurante.find(i => i.id === ins.idInsumo)
                                        return <p key={ins.id}>• {insumo?.nombre}: {ins.cantidad}g</p>
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}