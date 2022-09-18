const mongoose = require('mongoose');

const userSchecma = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchecma);

module.exports = User;