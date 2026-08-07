import { useState } from "react";

export default function ModalAgregarInsumo({ mostrar, onCerrar, onGuardar }) {

    //Para campos del formulario
    const [nombreInsumo, setNombreInsumo] = useState('');
    const [cantidadInsumo, setCantidadInsumo] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);
    const [stockMaximo, setStockMaximo] = useState(0);

    if (!mostrar) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
            <div className=" bg-white rounded-lg p-8 w-96 bg-gradient-to-r from-orange-500 to-red-600 rounded">
                <h2 className="text-center mb-6 text-xl">Agregar insumo</h2>
                <form onSubmit={onGuardar} className="flex flex-col gap-3 mb-10">

                    <label className="text-white text">Nombre del insumo</label>
                        <input
                            value={nombreInsumo}
                            onChange={(e => setNombreInsumo(e.target.value))} 
                            placeholder="Ejemplo: Carne molida" 
                            type="text" 
                            className="border-2 rounded p-1 w-full"
                        >
                        </input>

                        <label className="text-white text">Cantidad del insumo</label>
                        <input 
                            value={cantidadInsumo}
                            onChange={(e => setCantidadInsumo(e.target.value))}
                            placeholder="Ejemplo: 4000" 
                            type="number" 
                            className="border-2 rounded p-1 w-full"
                        >
                        </input>

                        <label className="text-white text">Stock mínimo en gramos</label>
                        <input 
                            value={stockMinimo}
                            onChange={(e => setStockMinimo(e.target.value))}
                            placeholder="Ejemplo: 42000" 
                            type="number" 
                            className="border-2 rounded p-1 w-full">
                        </input>

                        <label className="text-white text">Stock máximo en gramos</label>
                        <input
                            value={stockMaximo}
                            onChange={(e => setStockMaximo(e.target.value))} 
                            placeholder="Ejemplo: 20500" 
                            type="number" 
                            className="border-2 rounded p-1 w-full">
                        </input>

                </form>
                <div className="flex justify-center gap-3 mt-4">
                    <button type="submit" onClick={()=> onGuardar(nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo)} className="cursor-pointer border-2 rounded pr-5 pl-5">
                        Agregar insumo
                    </button>
                    <button onClick={onCerrar} className="cursor-pointer border-2 rounded pr-5 pl-5">
                        Cerrar
                    </button>
                </div>        
            </div>
        </div>
    )
}