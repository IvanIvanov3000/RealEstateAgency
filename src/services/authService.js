const jwt = require("../utils/jwt");

const User = require('../model/User');
const { ACCESS_TOKEN_SECRET } = require("../../constants");


exports.login = async ({ username, password }) => {
    try {
        let user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            throw new Error('User or password not matching. Check your username and password.');
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
            throw new Error('User or password not matching. Check your username and password.');
        }
        let payload = {
            _id: user._id,
            username: user._username,
            name: user._name
        }
        let token = await jwt.sign(payload, ACCESS_TOKEN_SECRET);
        return token;
    } catch (err) {
        throw new Error(err);
    }


}
exports.register = (userData) => {
    return User.create(userData);
}