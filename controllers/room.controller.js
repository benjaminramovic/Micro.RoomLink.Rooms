const {Room} = require('../models/room.model.js');
const {session, driver} = require('../config/neo4j.js');
const {v4: uuidv4} = require('uuid');

const getAll = async (req, res) => {
    try {
        //const rooms = await Room.getAll();
        //res.json({ success: true, rooms });
        const result = await session.run('MATCH (r:Room) RETURN r');
        const rooms = result.records.map(record => record.get('r').properties);
        res.json({ success: true, rooms });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch rooms', error: error.message });
    }

}

const getById = async (req, res) => {
    try {
        const id = req.params.id; // ID iz URL-a
        const result = await session.run(
            `MATCH (r:Room {id: $id}) RETURN r`,
            { id } // Prosleđivanje parametra ID
        );

        // Provera da li je pronađen rezultat
        if (result.records.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        // Ekstrakcija svojstava pronađenog čvora
        const room = result.records[0].get('r').properties;
        res.json({ success: true, room });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch room', error: error.message });
    }
};


const create = async (req, res) => {
    try {
        //const rooms = await Room.getAll();
        //res.json({ success: true, rooms });
        const { roomNumber } = req.body;
        const id = uuidv4()
        const result = await session.run(`CREATE (r:Room { id:$id, roomNumber:$roomNumber }) RETURN r`, {id, roomNumber})
        //const rooms = result.records.map(record => record.get('r').properties);
        const createdRoom = result.records[0].get('r').properties;

        res.json({ success: true, createdRoom });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to create room', error: error.message });
    }

}

const deleteRoom = async (req, res) => {
    try {
        const id = req.params.id; // ID iz URL-a
        const result = await session.run(
            `MATCH (r:Room {id: $id}) DELETE r`,
            { id } // Prosleđivanje parametra ID
        );
       
        return res.status(200).json({ success: true, message: 'Node is successfully deleted!' });
        
        //else return res.status(404).json({ success: false, message:"Room not found!" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch room', error: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const id = req.params.id; // ID from the URL
        const { roomNumber } = req.body;

        // Run the Neo4j query
        const result = await session.run(
            `MATCH (r:Room {id: $id}) SET r.roomNumber=$roomNumber RETURN r`,
            { id, roomNumber } // Pass the ID and roomNumber
        );

        // Check if the room was found and updated
        if (result.records.length === 0) {
            return res.status(404).json({ success: false, message: "Room not found!" });
        }

        return res.status(200).json({ success: true, updatedRoom: result.records[0].get('r').properties });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Failed to update room', error: error.message });
    }
};

module.exports = {
    getAll,
    create,
    getById,
    deleteRoom,
    updateRoom
}