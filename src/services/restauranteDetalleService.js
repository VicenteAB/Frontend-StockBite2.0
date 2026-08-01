import axios from "axios";

const API_URL = "http://localhost:8080";

export const obtenerInsumosPorRestaurante = async (id) => {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/insumos/restaurante/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    //console.log(response.data)
    return response.data;
}

export const obtenerRestaurantePorId = async (id) => {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/restaurantes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
