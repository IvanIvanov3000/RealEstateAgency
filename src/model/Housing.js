const mongoose = require('mongoose');
const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Apartment", "Villa", "House"]
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
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    tenants: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true });

housingSchema.method("getTenants", function(){
    return this.tenants.map(x => x.name).join(", ");
});

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;