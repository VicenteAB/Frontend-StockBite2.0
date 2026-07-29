import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { listarRestaurantes } from "../services/restauranteService"
import RestauranteCard from "../components/RestauranteCard"

export default function Home() {

    const [restaurantes, setRestaurantes] = useState([])

    useEffect(() => {
        listarRestaurantes().then(data => setRestaurantes(data))
    }, [])

    return (
        <div>
            <h1 className="pt-10 pb-20 text-2xl font-bold p-6">Restaurantes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
                {restaurantes.map(r => (
                    <RestauranteCard key={r.id} restaurante={r} />
                ))}
            </div>
        </div>
    )
}