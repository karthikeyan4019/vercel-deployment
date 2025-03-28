const categoryModel=require("../models/categoryModel");

// API for get category-api/v1/category
exports.getCategory=async(req,res,next)=>
{
    // console.log("--------------------");
    try
    {
      let category=await categoryModel.find({});
      console.log(category);
      res.json(
        {
            CATEGORY:category
        }
      );
    }
    catch(error)
    {
      res.json(
        {
            MESSAGE:error.message
        }
      );
    }
}