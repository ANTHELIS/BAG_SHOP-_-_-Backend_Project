const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                require: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    totalAmmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
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
    },
    paymentMethod: {
        type: String,
        enum: ['upi', 'card', 'cod'],
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'failed', 'paid'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'out for delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    }
}, {timestamps: true});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;