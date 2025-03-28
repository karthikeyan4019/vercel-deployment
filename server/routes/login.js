const express = require("express");
const router = express.Router();
const{loginAuth}=require("../controllers/loginController");

router.route("/login").post(loginAuth);

module.exports=router;

