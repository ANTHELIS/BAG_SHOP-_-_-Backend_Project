const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minLength: 3,
    },
    email: {
        type: String,
        trim: true,
        minLength: 8,
        unique: true
    },
    password: {
        type: String,
        minLength: 5,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    img: {
        type: Buffer,
        default: null,
    },
    imgType: String,
    gstin: Number
})

const owner = mongoose.model('owner', ownerSchema);

module.exports = owner;