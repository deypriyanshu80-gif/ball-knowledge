const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,       // Rule: Must be text
        required: true,     // Rule: Cannot be empty
        unique: true,       // Rule: No duplicate names allowed!
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ballKnowledge: {
        type: Number,       // Rule: Must be a number
        default: 0,         // Rule: Start at 0 if not specified
    },
    isAdmin: {
        type: Boolean,      // Rule: True or False
        default: false,
    }
}, { timestamps: true }); // Automatically records "Created At" time

const User = mongoose.model('User', userSchema);

module.exports = User;