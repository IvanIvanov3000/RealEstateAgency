const mongoose = require('mongoose');
const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Apartment", "Vila", "House"]
    },
    image: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }

})

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;