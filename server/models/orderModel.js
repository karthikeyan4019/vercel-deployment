const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema(
    {
        userName:String,
        orderedItems:Array,
        totalProduct:Number,
        totalAmount:Number,
        createdAt:String
    }
);
const orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel;