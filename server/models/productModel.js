const mongoose=require("mongoose");
const productSchema=new mongoose.Schema(
    {
        category:String,
        productName:String,
        productDetails:String,
        imagePath:String,
        storeName:String,
        brandWebsiteUrl:String,
        lastMonthSale:Number,
        discount:Number,
        price:Number

        // brand:String,
        // price:Number,
        // origin:String,
        // seller:String,
        // stock:Number
        // email:String
    }
);
const productModel=mongoose.model("products",productSchema);
module.exports=productModel;

// "category":"fruits",