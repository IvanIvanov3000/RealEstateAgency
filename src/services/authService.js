const User = require('../model/User');

exports.login = (name, username, password) => {
    
}
exports.register = (userData) => {
    User.create(userData);
}