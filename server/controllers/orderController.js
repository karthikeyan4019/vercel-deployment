const orderModel=require("../models/orderModel");
const cartModel=require("../models/cartModel");

exports.createOrder=async(req,res,next)=>
{
  let {userName}=req.body;
  let {orderedItems}=req.body;
  let {totalProduct}=req.body;
  let {totalAmount}=req.body;
  try
  {
    const insertOrderedItems=await orderModel.insertMany(
      {
         userName:userName,
         orderedItems:orderedItems,
         totalProduct:totalProduct,
         totalAmount:totalAmount,
         createdAt:new Date().toLocaleDateString()
      }
     );
     const deleteCartItems=await cartModel.deleteMany({});
      res.json(
      {
         Message:"Successfully inserted the ordered items",
         userName:userName
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

exports.getOrderedItems=async(req,res,next)=>
{
   let userName=req.query.userName;
   try
   {
      const orderedItems=await orderModel.find(
         {
            userName:userName
         }
      );
      res.json({
         orderedItemsInfo:orderedItems
      });
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