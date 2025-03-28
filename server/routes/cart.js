const express=require("express");
const router=express.Router();
const{putItems,getCartItems,updateCartItems,deleteCartItems}=require("../controllers/cartController");

router.route("/cart/insertitems").put(putItems);
router.route("/cart/getcartitems").get(getCartItems);
router.route("/cart/updateCartItems").put(updateCartItems);
router.route("/cart/deleteCartItems").delete(deleteCartItems);

module.exports=router;