import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerInsumosPorRestaurante, obtenerRestaurantePorId } from "../services/restauranteDetalleService"
import { guardarInsumoEnRestaurante, eliminarInsumo, actualizarInsumo } from "../services/insumoService"


export default function RestauranteDetalle({}) {

    const { id } = useParams()
    const [insumosPorRestaurante, setInsumosPorRestaurante] = useState([])
    const [restaurante, setRestaurante] = useState({})
    //Para mostrar/ocultar el modal
    const [mostrarModal, setMostrarModal] = useState(false);
    //Para campos del formulario
    const [nombreInsumo, setNombreInsumo] = useState('');
    const [cantidadInsumo, setCantidadInsumo] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);
    const [stockMaximo, setStockMaximo] = useState(0);
    //Para mostrar modal al eliminar insumo
    const [mostrarModalEliminar, setMostrarEliminarModal] = useState(false);
    const [idInsumoAEliminar, setIdInsumoAEliminar] = useState(null);
    //Para mostrar modal al actualizar insumo
    const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
    const [insumoAEditar, setInsumoAEditar] = useState(null);
    
    useEffect(() => {
        obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
        obtenerRestaurantePorId(id).then(data => setRestaurante(data))
    }, [])

    const obtenerColorAlerta = (stockActual, stockMaximo) => {

        const porcentaje = (stockActual / stockMaximo) * 100;

        if (porcentaje >= 50) {
            return "bg-green-500"
        }else if (porcentaje >= 30) {
            return "bg-yellow-500"
        }else{
            return "bg-red-500"
        }
    }

    const handleMostrarModal = () => {
        setMostrarModal(true);
        console.log(mostrarModal);
    } 

    const handleActualizarInsumo = async (e) => {
        e.preventDefault(); 
        if (!insumoAEditar || !insumoAEditar.id) return;

        console.log("Estado de insumoAEditar:", insumoAEditar);

        try {
            await actualizarInsumo(
                insumoAEditar.id, 
                insumoAEditar.nombre, 
                insumoAEditar.stockActual, 
                insumoAEditar.stockMinimo, 
                insumoAEditar.stockMaximo,
                insumoAEditar.idRestaurante
            );
            
            setMostrarModalActualizar(false);
            setInsumoAEditar(null);
            
            const data = await obtenerInsumosPorRestaurante(id);
            setInsumosPorRestaurante(data);
            
            console.log('Insumo actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el insumo:', error);
        }
    }

    const handleEliminarInsumo = async (insumoId) => {
        if (!insumoId) return;

        try {
            await eliminarInsumo(insumoId);
            setMostrarEliminarModal(false);
            setIdInsumoAEliminar(null);
            
            // id aquí corresponde al id del restaurante desde useParams()
            obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data));
            console.log('Insumo eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el insumo:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await guardarInsumoEnRestaurante(id, nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo)
            
            obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
            setMostrarModal(false);
            console.log('Insumo guardado correctamente');

        }catch(error){
            console.error('Error al guardar el insumo:', error);
        }
    }

    return (
        <div>
            <div className="text-lg text-white border-2 bg-gradient-to-r from-orange-500 to-red-600 rounded mt-6 p-6 ml-6 mr-6">
                <h1 className="pt-4 text-2xl font-bold pl-6">{restaurante.nombre}</h1>
                <h2 className="text-lg pt-4 pb-10 text-2xl font-bold pl-6">{restaurante.direccion}</h2>
                <div className="">
                    <button onClick={handleMostrarModal} className="cursor-pointer p-2 flex pl-6 mb-10 border-2 rounded w-1/6 justify-center">Agregar insumo</button>
                </div>

                {/* Modal para agregar insumo (formulario) */}
                {mostrarModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
                        <div className=" bg-white rounded-lg p-8 w-96 bg-gradient-to-r from-orange-500 to-red-600 rounded">
                            <h2 className="text-center mb-6 text-xl">Agregar insumo</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-10">

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
                                <button type="submit" onClick={handleSubmit} className="cursor-pointer border-2 rounded pr-5 pl-5">
                                    Agregar insumo
                                </button>
                                <button onClick={() => setMostrarModal(false)} className="cursor-pointer border-2 rounded pr-5 pl-5">
                                    Cerrar
                                </button>
                            </div>
                            
                        </div>
                    </div>
                )}

                {/* Tabla de insumos */}
                <table className="w-full">
                    <thead className="border-b-2 border-white">
                        <tr className="divide-x divide-white/30">
                            <th className="px-6 pb-2">Nombre insumo</th>
                            <th className="px-6 pb-2">Stock actual (gramos)</th>
                            <th className="px-6 pb-2">Stock mínimo aceptable (gramos)</th>
                            <th className="px-6 pb-2">Stock máximo (gramos)</th>
                            <th className="px-6 pb-2">Estado</th>
                            <th className="px-6 pb-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/30">
                        {insumosPorRestaurante.map(ir => (
                            <tr key={ir.id} className="divide-x divide-white/30">
                                <td className="px-6 py-2">{ir.nombre}</td>
                                <td className="px-6 py-2">{ir.stockActual}</td>
                                <td className="px-6 py-2">{ir.stockMinimo}</td>
                                <td className="px-6 py-2">{ir.stockMaximo}</td>
                                <td className="text-center">
                                    <span className={`${obtenerColorAlerta(ir.stockActual, ir.stockMaximo)} px-3 rounded-full border-2 border-white/50`}>
                                        
                                    </span>
                                </td>
                                <td className="flex justify-center px-6 py-2 gap-3">
                                    <button 
                                        onClick={() => {
                                            setInsumoAEditar(ir);
                                            setMostrarModalActualizar(true);
                                        }} 
                                        className="border-2 rounded pl-2 pr-2 cursor-pointer text-white-500"
                                    >
                                        Actualizar
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIdInsumoAEliminar(ir.id);
                                            setMostrarEliminarModal(true);
                                        }} className="border-2 rounded pl-2 pr-2 cursor-pointer text-white-500"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal para actualizar insumo */}
                {mostrarModalActualizar && insumoAEditar && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 w-96 text-white">
                            <h2 className="text-center mb-6 text-xl font-bold">Actualizar insumo</h2>
                            
                            <form onSubmit={handleActualizarInsumo} className="flex flex-col gap-3 mb-6">
                                <label>Nombre del insumo</label>
                                <input
                                    value={insumoAEditar.nombre || ''}
                                    onChange={(e) => setInsumoAEditar({...insumoAEditar, nombre: e.target.value})}
                                    placeholder="Ejemplo: Carne molida" 
                                    type="text" 
                                    className="border-2 rounded p-1 w-full text-white"
                                />

                                <label>Cantidad del insumo</label>
                                <input 
                                    value={insumoAEditar.stockActual || 0}
                                    onChange={(e) => setInsumoAEditar({...insumoAEditar, stockActual: Number(e.target.value)})}
                                    placeholder="Ejemplo: 4000" 
                                    type="number" 
                                    className="border-2 rounded p-1 w-full text-white"
                                />

                                <label>Stock mínimo en gramos</label>
                                <input 
                                    value={insumoAEditar.stockMinimo || 0}
                                    onChange={(e) => setInsumoAEditar({...insumoAEditar, stockMinimo: Number(e.target.value)})}
                                    placeholder="Ejemplo: 42000" 
                                    type="number" 
                                    className="border-2 rounded p-1 w-full text-white"
                                />

                                <label>Stock máximo en gramos</label>
                                <input
                                    value={insumoAEditar.stockMaximo || 0}
                                    onChange={(e) => setInsumoAEditar({...insumoAEditar, stockMaximo: Number(e.target.value)})} 
                                    placeholder="Ejemplo: 20500" 
                                    type="number" 
                                    className="border-2 rounded p-1 w-full text-white"
                                />

                                <div className="flex justify-center gap-3 mt-4">
                                    <button type="submit" className="cursor-pointer border-2 rounded px-5 py-1 hover:bg-white/20">
                                        Actualizar
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setMostrarModalActualizar(false);
                                            setInsumoAEditar(null);
                                        }} 
                                        className="cursor-pointer border-2 rounded px-5 py-1 hover:bg-white/20"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/** Modal de confirmacion de eliminación */}
                {mostrarModalEliminar && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
                        <div className=" bg-white rounded-lg p-8 w-96 bg-gradient-to-r from-orange-500 to-red-600 rounded">
                            <h2 className="text-center mb-6 text-xl">¿Esta seguro de eliminar este insumo?</h2>
                            <div className="flex justify-center gap-3 mt-4">
                                <button 
                                    type="submit" 
                                    onClick={() => handleEliminarInsumo(idInsumoAEliminar)} 
                                    className="cursor-pointer border-2 rounded pr-5 pl-5"
                                >
                                    Si
                                </button>
                                <button type="button" onClick={() => setMostrarEliminarModal(false)} className="cursor-pointer border-2 rounded pr-5 pl-5">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}