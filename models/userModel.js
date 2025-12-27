const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minLength: [5, "Fullname must be at least 5 characters"],
        required: true
    },
    email: {
        type: String,
        trim: true,
        minLength: [8, "Invalid email address"],
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim:true,
        minLength: [5, "Password must be at least 5 characters"],
        required: true
    },
    cart: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
        }
    ],
    
    orders: {
        type: []
    },
    picture: String,
    address: {
        type: Object,
        flat: String,
        area: String,
        contact: Number
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;