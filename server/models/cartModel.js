const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema(
    {
        userName:String,
        category:String,
        productName:String,
        productDetails:String,
        imagePath:String,
        storeName:String,
        brandWebsiteUrl:String,
        lastMonthSale:Number,
        discount:Number,
        price:Number,
        itemCount:Number
    }
);
const cartModel=mongoose.model("cart",cartSchema);
module.exports=cartModel;