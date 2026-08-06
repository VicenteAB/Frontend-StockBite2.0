import axios from "axios"

const API_URL = "http://localhost:8080";

export const guardarInsumoEnRestaurante = async (id, nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo) =>{

    const token = localStorage.getItem('token');

    const response = await axios.post (`${API_URL}/insumos`, {
        nombre: nombreInsumo,
        stockActual: cantidadInsumo,
        stockMinimo: stockMinimo,
        stockMaximo: stockMaximo,
        idRestaurante: id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}   

export const eliminarInsumo = async(id)=>{

    const token = localStorage.getItem('token');

    const response = await axios.delete(`${API_URL}/insumos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const actualizarInsumo = async(id, nombreInsumo, cantidadInsumo, stockMinimo, stockMaximo, idRestaurante) =>{

    const token = localStorage.getItem('token');

    const response = await axios.put(`${API_URL}/insumos/${id}`, {
        nombre: nombreInsumo,
        stockActual: cantidadInsumo,
        stockMinimo: stockMinimo,
        stockMaximo: stockMaximo,
        idRestaurante: idRestaurante
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}