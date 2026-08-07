import {useState, useEffect} from "react";

export default function ModalActualizarInsumo({mostrar, insumoAEditar, onCerrar, onActualizar}) {

    //Para mostrar modal al actualizar insumo
    //const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
    //const [insumoAEditar, setInsumoAEditar] = useState(null);

    const [insumoLocal, setInsumoLocal] = useState(null);

    useEffect(() => {
        if(insumoAEditar) {
            setInsumoLocal(insumoAEditar)
        }
    }, [insumoAEditar])

    if (!mostrar || !insumoLocal) return null

    return(
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 w-96 text-white">
                <h2 className="text-center mb-6 text-xl font-bold">Actualizar insumo</h2>
                            
                <form className="flex flex-col gap-3 mb-6">
                    <label>Nombre del insumo</label>
                    <input
                        value={insumoLocal.nombre || ''}
                        onChange={(e) => setInsumoLocal({...insumoLocal, nombre: e.target.value})}
                        placeholder="Ejemplo: Carne molida" 
                        type="text" 
                        className="border-2 rounded p-1 w-full text-white"
                    />

                    <label>Cantidad del insumo</label>
                    <input 
                        value={insumoLocal.stockActual || 0}
                        onChange={(e) => setInsumoLocal({...insumoLocal, stockActual: Number(e.target.value)})}
                        placeholder="Ejemplo: 4000" 
                        type="number" 
                        className="border-2 rounded p-1 w-full text-white"
                    />

                    <label>Stock mínimo en gramos</label>
                    <input 
                        value={insumoLocal.stockMinimo || 0}
                        onChange={(e) => setInsumoLocal({...insumoLocal, stockMinimo: Number(e.target.value)})}
                        placeholder="Ejemplo: 42000" 
                        type="number" 
                        className="border-2 rounded p-1 w-full text-white"
                    />

                    <label>Stock máximo en gramos</label>
                    <input
                        value={insumoLocal.stockMaximo || 0}
                        onChange={(e) => setInsumoLocal({...insumoLocal, stockMaximo: Number(e.target.value)})} 
                        placeholder="Ejemplo: 20500" 
                        type="number" 
                        className="border-2 rounded p-1 w-full text-white"
                    />

                    <div className="flex justify-center gap-3 mt-4">
                        <button type="button" onClick={() => onActualizar(insumoLocal)} className="cursor-pointer border-2 rounded px-5 py-1 hover:bg-white/20">
                            Actualizar
                        </button>
                        <button 
                            type="button" 
                            onClick={onCerrar} 
                            className="cursor-pointer border-2 rounded px-5 py-1 hover:bg-white/20"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}