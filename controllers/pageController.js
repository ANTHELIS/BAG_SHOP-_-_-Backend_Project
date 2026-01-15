const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const ownerModel = require('../models/ownerModel');

module.exports.userRegisterPage = (req, res)=>{
    res.render('index');
};

module.exports.userLoginPage = (req, res)=>{
    const error = req.flash("error");
    res.render('login', {error});
};

module.exports.shopPage = async (req, res)=>{
    let products;
    const sortby = req.query.sortby;
    const filter = req.query.filter;
    if(filter==='availability'){
        res.redirect('/shop');
    }

    else if(filter==='discount'){
        products = await productModel.find({discount: {$gt: 0}}).sort({discount: -1});
    }
    else if(sortby==='newest'){
        products = await productModel.find().sort({ createdAt: -1 });
    }
    else{
        products = await productModel.find();
    }
    const success = req.flash("success");
    res.render("shop", {products, success});
};

module.exports.addToCart = async (req, res)=>{
    req.user.cart.push({product: req.params.product_id, quantity: 1});
    await req.user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
};

module.exports.deleteFromCart = async (req, res)=>{
    req.user.cart = req.user.cart.filter((item)=>{
        return item.product.toString() !== req.params.product_id;
    })
    await req.user.save();
    req.flash("success", "item removed");
    res.redirect("/cart");
};

module.exports.addQuantity = async (req, res)=>{
    const targetItem = req.user.cart.find((item)=>{
        return item.product.toString() === req.params.product_id;
    });
    if(targetItem){
        targetItem.quantity+=1;
        req.user.save();
    }
    res.redirect("/cart");
};
module.exports.decQuantity = async (req, res)=>{
    const targetItem = req.user.cart.find((item)=>{
        return item.product.toString() === req.params.product_id;
    });
    if(targetItem){
        targetItem.quantity-=1;
        await req.user.save();

        if(targetItem.quantity === 0){
            req.user.cart = req.user.cart.filter((item)=>{
                return item.product.toString() !== req.params.product_id;
            })
            await req.user.save();
            req.flash("success", "item removed");
        }
    }
    res.redirect("/cart");
};


module.exports.cart = async (req, res)=>{
    const success = req.flash('success');
    const user = await userModel.findOne({email: req.user.email}).populate("cart.product");
    res.render('cart', {user, success});
};

module.exports.orderCheckout = async (req, res)=>{
    const user = await userModel.findOne({email: req.user.email}).populate("cart.product");
    res.render('orderCheckout', {user});
};

module.exports.placeOrder = async (req, res)=>{
    const {fullname, flat, area, city, state, pincode, contact} = req.body;
    const user = await userModel.findOne({email: req.user.email}).populate('cart.product');

    let totalAmmount = 20;
    const products = user.cart.map(item=>{
        const itemPrice = (item.product.price-item.product.discount)*item.quantity;
        totalAmmount+=itemPrice;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price-item.product.discount
        }
    })

    const order = await orderModel.create({
        user: req.user._id,
        fullname,
        products,
        totalAmmount,
        shippingAddress: {
            flat,
            area,
            city,
            state,
            pincode,
            contact
        },
    })
    user.orders.push(order._id);
    user.cart = [];
    await user.save();
    const owner = await ownerModel.findOne().select('orders');
    owner.orders.push(order._id);
    await owner.save();

    // More details should be added after payment gateway feature intregated
    res.redirect('/myorder');
}

module.exports.myOrder = async(req, res)=>{
    const user = await userModel.findOne({email: req.user.email}).populate({
        path: 'orders',
        populate: {
            path: 'products.product'
        }
    });
    const orders = user.orders;
    res.render('userMyOrders', { orders });
}
