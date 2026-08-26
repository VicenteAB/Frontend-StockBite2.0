import axios from "axios";

const API_URL = "http://localhost:8080";

export const obtenerRecetas = async () => {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/recetas`, {
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
    return response.data;
}

export const obtenerInsumosPorReceta = async (idReceta) => {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/recetaInsumos/${idReceta}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const crearReceta = async (nombreReceta) => {

    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_URL}/recetas`, {
            nombre: nombreReceta
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const agregarIngredienteAReceta = async (idReceta, idInsumo, cantidad) => {
    
    const token = localStorage.getItem('token')
    
    const response = await axios.post(`${API_URL}/recetaInsumos`, {
        idReceta: idReceta,
        idInsumo: idInsumo,
        cantidad: cantidad
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}