const Order = require("../models/orderModer");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create New order

exports.newOrder = catchAsyncError(async(req, res, next) => {


    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;


    // if (!shippingInfo || !orderItems || !paymentInfo || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
    //     return next(new ErrorHander("All fields are required.", 400));
    // }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id, 
    });

    res.status(201).json({
        success: true,
        order,
    });

});

// get Single Order

exports.getSingleOrder = catchAsyncError(async( req, res,next) =>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    
    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };

    res.status(200).json({
        success: true,
        order,
    });
});

// get logged in user Order

exports.myOrders = catchAsyncError(async( req, res,next) =>{
    const orders = await Order.find({ user:req.user._id });
    


    res.status(200).json({
        success: true,
        orders,
    });
});

// get All Order -- admin

exports.getAllOrders = catchAsyncError(async( req, res,next) =>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });
    
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// update Order status -- admin

exports.updateOrder = catchAsyncError(async( req, res,next) =>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };

    if(order.orderStatus === "Delivered"){
        return next( new ErrorHander("Your have already delivered this order", 400));
    };

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    };

    await order.save({ validateBeforeSave : false})

    
    res.status(200).json({
        success: true,
    });
});

async function updateStock (id,quantity){
   const product = await Product.findById(id);

   if (!product) {
    throw new Error(`Product not found with id: ${id}`);
}

   product.Stock -= quantity;

   await product.save({validateBeforeSave : false})
};


// delete order -- admin


exports.deleteOrder = catchAsyncError(async( req, res,next) =>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,

    });
});