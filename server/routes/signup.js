const express=require("express");
const router=express.Router();
const{signup}=require("../controllers/signupController");
const yup=require("yup");
const { schema } = require("../models/productModel");
// schema for middleware
const signupSchema=yup.object(
    {
        body:yup.object(
            {
                name:yup.string().strict().min(8).required(),
                password:yup.string().strict().min(8).required()
                // password:yup.number().min(8).required()
            }
        )
    }
);
// middleware to validate incoming request
const validateInfo=(schema)=>async(req,res,next)=>
{
    try
    {
      await schema.validate(
        {
          body:req.body
        }
      );
      return(next());
    }
    catch(error)
    {
      res.json(
        {
          STATUS:"FAILURE",
          MESSAGE:error.message
        }
      );
    }
}
router.route("/signup").put(validateInfo(signupSchema),signup);

module.exports=router;