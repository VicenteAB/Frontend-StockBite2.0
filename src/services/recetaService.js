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