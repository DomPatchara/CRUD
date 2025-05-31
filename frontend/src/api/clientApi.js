import axios from 'axios'

const API_BASE = 'http://localhost:3000/api/clients';

// GET all clients
export const getClients = async()=> {
    try {
        const  { data } = await axios.get(API_BASE);
        return data
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error
    }
};

// POST 
export const postClient = async(clientData)=> {
    try {
        const { data } = await axios.post(API_BASE, clientData);
        return data
    } catch (error) {
        console.error("Error create cleint", error);
        throw error;
    }
}

// Update client
export const updateClient = async(id, updateData) => {
    try {
        const { data } = await axios.put(`${API_BASE}/${id}`, updateData)
        return data
    } catch (error) {
        console.error(`Error updateing client with ID ${id}`, error);
        throw error
    }
}

// DELETE client
export const deleteClient = async(id) => {
    try {
        const { data } = await axios.delete(`${API_BASE}/${id}`)
        return data
    } catch (error) {
        console.error(`Error deleting client with ID ${id}:`, error);
        throw error;
    }
}