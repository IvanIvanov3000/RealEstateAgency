const jwt = require("jsonwebtoken");

const User = require('../model/User');

exports.login = async (username, password) => {
    let user = await User.findOne({ username });
    if (!user) {
        throw new Error('User or password not matching. Check your username and password.');
    }

    const isValid = await user.validatePassword(password);
    if (isValid) {
        throw new Error('User or password not matching. Check your username and password.');
    }
    return user;
}
exports.register = (userData) => {
    return User.create(userData);
}