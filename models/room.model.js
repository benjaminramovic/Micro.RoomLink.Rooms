const { v4: uuidv4 } = require('uuid')

class Room {
    constructor(roomNumber, type, pricePerNight, capacity, description) {
        this.id = uuidv4();
        this.roomNumber = roomNumber;
        this.type = type; // "Standard", "Deluxe"
        this.pricePerNight = pricePerNight;
        this.isAvailable = true;
        this.capacity = capacity; // Broj osoba
        this.description = description;
    }
}

module.exports = Room;
