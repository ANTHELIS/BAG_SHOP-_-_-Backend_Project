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
})

const product = mongoose.model('product', productSchema);

module.exports = product;