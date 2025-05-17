const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: "https://static.thenounproject.com/png/1081856-200.png"
    },

    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },

    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book" // Changed from "books" to "Book"
    }],

    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book" // Changed from "books" to "Book"
    }],

    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order" // Changed from "order" to "Order"
    }]

}, {
    timestamps: true // Removed extra parentheses
});

// Corrected model registration
const User = mongoose.model("User", userSchema);

module.exports = User;