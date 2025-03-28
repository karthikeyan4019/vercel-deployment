const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema(
    {
        userName:String,
        phoneNo:String,
        email:String,
        houseNo:String,
        apartmentName:String,
        blockName:String,
        areaName:String,
        cityName:String,
        pincode:String,
        state:String,
        country:String
    }
);
const addressModel=mongoose.model("userAddress",addressSchema);
module.exports=addressModel;