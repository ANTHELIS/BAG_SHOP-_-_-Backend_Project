const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    img: Buffer,
    imgType: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    highlights: {
        type: Array,
        minlength: 1,
        maxlength: 6
    },
    warrantyInYear: {
        type: Number,
        default: 1
    },
    description: String,
    specification: {
        modelName: String,
        color: String,
        material: String,
        categoryType: String,
        capacity: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const product = mongoose.model('product', productSchema);

module.exports = product;