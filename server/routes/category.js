const express=require("express");
const router=express.Router();
const{ getCategory }=require("../controllers/categoryController");;

router.route("/category").get(getCategory);

module.exports=router;


