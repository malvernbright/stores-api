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

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;