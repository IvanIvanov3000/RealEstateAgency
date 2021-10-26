const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    }
});


userSchema.pre("save", function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        });
});
userSchema.method("validatePassword", function(password) {
    return bcrypt.compare(password, this.password)

});

const User = mongoose.model('User', userSchema);

module.exports = User;