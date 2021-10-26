const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 4
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        minLength: 5
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;