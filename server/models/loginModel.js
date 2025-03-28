const mongoose=require("mongoose");
const loginSchema=new mongoose.Schema(
    {
        // productName:String,
        // price:Number,
        // origin:String,
        // seller:String,
        // stock:Number,
        // email:String,
        name:String,
        password:Number
    }
);
const loginModel=mongoose.model("login",loginSchema);
module.exports=loginModel;