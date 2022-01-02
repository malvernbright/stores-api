const bcrypt = require('bcrypt');
const userService = require('../services/user.services');

exports.register = (req, res, next) => {
    const { password } = req.body;
}