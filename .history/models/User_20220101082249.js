const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'email is required'],
        unique: true,
        validators: [isEmail, 'enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'password must be at least 6 characters']
    }
});

UserSchema.pre('save', async function(next) {});

const User = mongoose.model('User', UserSchema);
module.exports = User;