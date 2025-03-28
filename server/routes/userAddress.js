const express=require("express");
const router=express.Router();
const{saveAddress,getUserAddress}=require("../controllers/addressController");

router.route("/address/userAddress").put(saveAddress);
router.route("/address/getUserAddress").get(getUserAddress);

module.exports=router;