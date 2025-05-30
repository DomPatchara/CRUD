import { getAllClient, createClient, updateClient, deleteClient, searchClients } from '../services/clientServices.js'

// Controller : ประสานงาน --> ใช้ logic จาก services , รับ request /ส่ง response, เช็คเงื่อนไข ดักจับError...


// Get All Data
export const getClients = async (req, res) => {
    try {
        const clients = await getAllClient();
        res.status(200).json(clients);
    } catch (err) {
        console.error("Error fetching clients : ", err);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

// Create New
export const handleCreateClients = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await createClient(clientData)
        res.status(200).json(newClient);
    } catch (err) {
        console.error("Error create new clients : ", err);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

// Update
export const handleUpdateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const updateData = req.body

        const updatedClient = await updateClient(updateData, clientId)

        if(!updatedClient) {
            return res.status(404).json({error: "Client not found ! "})
        }

        res.status(200).json(updatedClient);
    } catch (err) {
        console.error("Error update clients : ", err);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

// Delete
export const handleDeleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        
        const deleted = await deleteClient(clientId)

        if (!deleted){
            return res.status(404).json({error: "Client not found ! "})
        }

        res.status(200).json(deleted);
    } catch (err) {
        console.error("Error deleted clients:", err);
        res.status(500).json({message: 'Internal Server Error'})   
    }
}

// SearchTerm
export const handleSearchClient = async(req, res) => {
    try {
        const { q } = req.query // URL: /clients/search?q=dome
        if(!q) {
            return res.status(400).json({error: 'Missing search query'})
        }

        const results = await searchClients(q);
        res.status(200).json(results);
    } catch (err) {
        console.error("Search failed", err);
        res.status(500).json({error: 'Search error'});
        
    }
}