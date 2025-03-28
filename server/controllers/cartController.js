const cartModel=require("../models/cartModel");
exports.putItems=async(req,res,next)=>
{
  let{userName,
    category,
    productName,
    productDetails,
    imagePath,
    storeName,
    brandWebsiteUrl,
    lastMonthSale,
    discount,
    price,
    }=req.body;
  let itemCount=0;

  let existingProduct=await cartModel.findOne(
  {
    userName:userName,
    productName:productName
  }
  );
  if(existingProduct===null)
  {
    itemCount=1;
  }
  else
  {
    itemCount=existingProduct.itemCount;
  }
  try
    {
      if(existingProduct===null)
      {
        const putItems=await cartModel.insertMany(
        {
          userName:userName,
          category:category,
          productName:productName,
          productDetails:productDetails,
          imagePath:imagePath,
          storeName:storeName,
          brandWebsiteUrl:brandWebsiteUrl,
          lastMonthSale:lastMonthSale,
          discount:discount,
          price:price,
          itemCount:itemCount
        }
      );
    res.json({
      result:putItems
    });
    }
    else
    {
      const updatedProduct=await cartModel.updateOne(
        // existing value
        {
          userName:userName,
          productName:productName
        },
        // new value
        {
          itemCount:itemCount+1
        }
      );
      res.json({
        result:updatedProduct
      });
    }
    }
    catch(error)
    {
      res.json({
        MESSAGE:error.message
      });
    }
}
exports.getCartItems=async(req,res,next)=>
{
    try
    {
      let userName=req.query.userName;
      const cartItems=await cartModel.find(
        {
          userName:userName
        }
       );
       res.json({
        items:cartItems
       });
    }
    catch(error)
    {
      res.json({
        MESSAGE:error.message
       });
    }
}
exports.updateCartItems=async(req,res,next)=>
{
  let{userName,productName,itemCount}=req.body;
  try
  {
    let updatedCartItem=await cartModel.updateOne(
    // existing value
    {
      userName:userName,
      productName:productName
    },
    // new value
    {
      itemCount:itemCount
    }
    );
    res.json({
      updatedCartItem:updatedCartItem
    });
  }
  catch(error)
  {
    res.json({
      MESSAGE:error.message
    });
  }
}
exports.deleteCartItems=async(req,res,next)=>
{
  try
  {
    let{userName,productName}=req.body;
    let deletedCartItem=await cartModel.deleteOne(
      {
        userName:userName,
        productName:productName
      }
    );
    res.json({
      deletedCartItem:deletedCartItem
    });
  }
  catch(error)
  {
    res.json({
      MESSAGE:error.message
    });
  }
}