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
    img: {
    type: Buffer,
    default: null
    },
    imgType: String,
    address: {
        flat: String,
        area: String,
        city: String,
        state: String,
        pincode: Number,
        country: {
            type: String,
            default: "India"
        },
        contact: String
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;