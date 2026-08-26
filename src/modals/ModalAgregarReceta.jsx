import { useState } from "react";

export default function ModalAgregarReceta({ mostrar, onCerrar, onGuardar, insumosDisponibles }) {

    const [nombreReceta, setNombreReceta] = useState('')
    const [ingredientes, setIngredientes] = useState([])
    const [insumoSeleccionado, setInsumoSeleccionado] = useState('')
    const [cantidadIngrediente, setCantidadIngrediente] = useState(0)

    if (!mostrar) return null

    const handleAgregarIngrediente = () => {
        if (!insumoSeleccionado || cantidadIngrediente <= 0) return
        setIngredientes([...ingredientes, {
            idInsumo: insumoSeleccionado,
            cantidad: cantidadIngrediente
        }])
        setInsumoSeleccionado('')
        setCantidadIngrediente(0)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 w-96">
                <h2 className="text-center mb-6 text-xl text-white font-bold">Agregar receta</h2>
                <div className="flex flex-col gap-3">

                    <label className="text-white">Nombre de la receta</label>
                    <input
                        value={nombreReceta}
                        onChange={(e) => setNombreReceta(e.target.value)}
                        placeholder="Ejemplo: Hamburguesa"
                        type="text"
                        className="border-2 rounded p-1 w-full"
                    />

                    <label className="text-white">Seleccionar insumo</label>
                    <select
                        value={insumoSeleccionado}
                        onChange={(e) => setInsumoSeleccionado(e.target.value)}
                        className="border-2 rounded p-1 w-full"
                    >
                        <option value="">Seleccione un insumo</option>
                        {insumosDisponibles.map(i => (
                            <option key={i.id} value={i.id}>{i.nombre}</option>
                        ))}
                    </select>

                    <label className="text-white">Cantidad (gramos)</label>
                    <input
                        value={cantidadIngrediente}
                        onChange={(e) => setCantidadIngrediente(Number(e.target.value))}
                        placeholder="Ejemplo: 100"
                        type="number"
                        className="border-2 rounded p-1 w-full"
                    />

                    <button
                        type="button"
                        onClick={handleAgregarIngrediente}
                        className="cursor-pointer border-2 rounded p-1 text-white"
                    >
                        + Agregar ingrediente
                    </button>

                    {/* Lista de ingredientes agregados */}
                    {ingredientes.map((ing, index) => {
                        const insumo = insumosDisponibles.find(i => i.id === Number(ing.idInsumo))
                        return (
                            <p key={index} className="text-white">
                                • {insumo?.nombre}: {ing.cantidad}g
                            </p>
                        )
                    })}

                </div>

                <div className="flex justify-center gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => onGuardar(nombreReceta, ingredientes)}
                        className="cursor-pointer border-2 rounded px-5 py-1 text-white"
                    >
                        Crear receta
                    </button>
                    <button
                        type="button"
                        onClick={onCerrar}
                        className="cursor-pointer border-2 rounded px-5 py-1 text-white"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}