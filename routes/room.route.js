const express = require('express');
const roomRouter = express.Router();
const { getAll, create, getById, deleteRoom, updateRoom } = require('../controllers/room.controller.js');

roomRouter.get('/',getAll)
roomRouter.post('/',create)

roomRouter.get('/:id',getById)
roomRouter.delete('/:id',deleteRoom)
roomRouter.put('/:id',updateRoom)



module.exports = roomRouter;