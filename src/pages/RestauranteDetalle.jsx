import { useParams, useNavigate, Await } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerInsumosPorRestaurante, obtenerRestaurantePorId } from "../services/restauranteDetalleService"
import { guardarInsumoEnRestaurante, eliminarInsumo, actualizarInsumo } from "../services/insumoService"

import ModalAgregarInsumo from "../modals/ModalAgregarInsumo"
import ModalActualizarInsumo from "../modals/ModalActualizarInsumo"
import ModalConfirmarEliminar from "../modals/ModalConfirmarEliminar"


export default function RestauranteDetalle() {

    const navigate = useNavigate()

    const { id } = useParams()
    const [insumosPorRestaurante, setInsumosPorRestaurante] = useState([])
    const [restaurante, setRestaurante] = useState({})
    //Para mostrar/ocultar el modal
    const [mostrarModal, setMostrarModal] = useState(false);

    //Par a mostrar modal al actualizar insumo
    const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
    const [insumoAEditar, setInsumoAEditar] = useState(null);

    //Para mostrar modal al eliminar insumo
    const [mostrarModalEliminar, setMostrarEliminarModal] = useState(false);
    const [idInsumoAEliminar, setIdInsumoAEliminar] = useState(null);


    useEffect(() => {
        obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
        obtenerRestaurantePorId(id).then(data => setRestaurante(data))
    }, [])

    const obtenerColorAlerta = (stockActual, stockMaximo) => {

        const porcentaje = (stockActual / stockMaximo) * 100;

        if (porcentaje >= 50) {
            return "bg-green-500"
        } else if (porcentaje >= 30) {
            return "bg-yellow-500"
        } else {
            return "bg-red-500"
        }
    }

    const handleMostrarModal = () => {
        setMostrarModal(true);
        console.log(mostrarModal);
    }

    const handleActualizarInsumo = async (insumoActualizado) => {
        console.log('Insumo a actualizar:', insumoActualizado)
        try {
            await actualizarInsumo(  // ← faltaba esto
                insumoActualizado.id,
                insumoActualizado.nombre,
                insumoActualizado.stockActual,
                insumoActualizado.stockMinimo,
                insumoActualizado.stockMaximo,
                insumoActualizado.idRestaurante
            )
            setMostrarModalActualizar(false)
            setInsumoAEditar(null)
            obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
        } catch (error) {
            console.error('Error al actualizar el insumo:', error)
        }
    }

    const handleEliminarInsumo = async(insumoId) => {
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

    const handleSubmit = async (nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo) => {

        try {
            await guardarInsumoEnRestaurante(id, nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo)

            obtenerInsumosPorRestaurante(id).then(data => setInsumosPorRestaurante(data))
            setMostrarModal(false);
            console.log('Insumo guardado correctamente');

        } catch (error) {
            console.error('Error al guardar el insumo:', error);
        }
    }

    const handleClick = () => {
        navigate(`/restaurante/${restaurante.id}/recetas`)
    }

    return (
        <div>
            <div className="text-lg text-white border-2 bg-gradient-to-r from-orange-500 to-red-600 rounded mt-6 p-6 ml-6 mr-6">
                <h1 className="mb-5 pt-4 text-2xl font-bold pl-6">Insumos de Restaurante</h1>

                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-2xl">{restaurante.nombre}, {restaurante.direccion}</h1>
                    
                    <div className="flex gap-6">
                        <button onClick={handleMostrarModal} className="cursor-pointer p-2 border-2 rounded">Agregar insumo a este restaurante</button>
                        <button onClick={handleClick} className="cursor-pointer p-2 border-2 rounded">Ver recetas de este restaurante</button>
                    </div>
                </div>

                {/* Modal para agregar insumo (formulario) */}
                <ModalAgregarInsumo
                    mostrar={mostrarModal}
                    onCerrar={() => setMostrarModal(false)}
                    onGuardar={handleSubmit}
                />

                {/* Tabla de insumos */}
                <table className="w-full mt-12">
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
                <ModalActualizarInsumo
                    mostrar={mostrarModalActualizar}
                    insumoAEditar={insumoAEditar}
                    onCerrar={() => {
                        setMostrarModalActualizar(false);
                        setInsumoAEditar(null);
                    }}
                    onActualizar={handleActualizarInsumo}
                />

                {/** Modal de confirmacion de eliminación */}
                <ModalConfirmarEliminar
                    mostrar={mostrarModalEliminar}
                    onCerrar={() => {
                        setMostrarEliminarModal(false);
                        setIdInsumoAEliminar(null);
                    }}
                    onConfirmar={() => handleEliminarInsumo(idInsumoAEliminar)}
                />
            </div>
        </div>
    )
}