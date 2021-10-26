const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
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
userSchema.pre("save", function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.passowrd = hash;
            return next();
        });
});
module.exports = User;