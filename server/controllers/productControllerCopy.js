const productModel=require("../models/productModel");

//1. API for fetch all products-/api/v1/products
exports.getProduct=async(req,res,next)=>
{
  try
  {
    const products=await productModel.find({});

  // 1.Find------------------------------------

    //  1.findOne();-----

    // const products=await productModel.findOne(
    //   {
        
    //   }
    // );
    // const products=await productModel.findOne(
    //   {
    //     productName:"Apple"
    //   }
    // );
    // const products=await productModel.findOne(
    //   {
    //     productName:"Apple"
    //   },
    //   {_id:0,origin:1}
    // );

    // 2.find();-----

    // const products=await productModel.find(
    //   {

    //   }
    // );
    // const products=await productModel.find(
    //   {
    //     productName:"Apple"
    //   }
    // );
    // const products=await productModel.find(
    //   {
    //     productName:"Apple"
    //   },
    //   {_id:0,origin:1}
    // );

  // 2.Insert-----------------------------------------

  // 1.insertOne();-----

  // const products=productModel.insertOne({});

  // 2.insertMany();-----

  // const products=productModel.insertMany(
  //  [
  //   {
  //   productName:"Jack fruit",
  //   price:110,
  //   origin:"Jammu kashmir",
  //   seller:"Amazon",
  //   stock:120
  //   },
  //   {
  //   productName:"Pomegranate",
  //   price:110,
  //   origin:"Jammu kashmir",
  //   seller:"Amazon",
  //   stock:120
  //   }
  //  ]
  // );

  // 3.create();-----

  // const products=productModel.create(
  //  [
  //   {
  //   productName:"Jack fruit",
  //   price:110,
  //   origin:"Jammu kashmir",
  //   seller:"Amazon",
  //   stock:120
  //   },
  //   {
  //   productName:"Pomegranate",
  //   price:110,
  //   origin:"Jammu kashmir",
  //   seller:"Amazon",
  //   stock:120
  //   }
  //  ]
  // );

  // 3.Update---------------------------------

  // 1.updateOne();

  // origin=req.body.origin;
  // console.log(origin);
  
  // const products=await productModel.updateOne(
  //   // existing value
  //   {
  //     productName:"Apple",
  //   },
    // new value
    // {
    //   productName:"Apple new",
     
    //   origin:"Jammu Kashmir New",

    //   price:220,
    // }
    // );

  // 2.updateMany();

  // const products=await productModel.updateMany(
  //   // existing value
  //   {
  //     productName:"Apple",
  //   },
  //   // new value
  //   {
  //     productName:"Apple new",
     
  //     origin:"Jammu Kashmir New",

  //     price:220
  //   }
  // );

  // 4.Delete-----------------------------------

  // 1.deleteOne();-----

  // const products=await productModel.deleteOne(
  //   {
  //     productName:"Orange"
  //   }
  // );

  // 2.deleteMany();-----

  // const products=await productModel.deleteMany(
  //   {
  //     productName:"Orange"
  //   }
  // );

  // 5.Some other methods----------------------

  // 1.findById();

  // const products=await productModel.findById(
  //   {
  //     _id:"6733b3656e3418ca911e1d69"
  //     // productName:"Apple"
  //   }
  // );
  // const products=await productModel.findById(
  //   {
  //     _id:req.params.id
  //   }
  // );

  // 2.findByIdAndUpdate();

  // const products=await productModel.findByIdAndUpdate(
  //   {
  //     _id:"6733b3656e3418ca911e1d69"
  //   },
  //   {
  //     origin:"Jammu Kashmir New",
  //     price:10,
  //     stock:120
  //   }
  // );
  // const products=await productModel.findByIdAndUpdate(
  //   {
  //     _id:req.params.id
  //   },
  //   req.body
  // );

  // 3.findByIdAndDelete();-----

  // const products=await productModel.findByIdAndDelete(
  //   {
  //     _id:"6733cf02358c182ee54f8aeb"
  //   }
  // );
  // const products=await productModel.findByIdAndDelete(
  //   {
  //     _id:req.params.id
  //   }
  // );

  // const products=await productModel.find({});
  // const products=await productModel.find({productName:"Apple"});
  // const sample=req.params.productName;
  // const products=await productModel.find({productName:sample},{origin:1,_id:0});
  // const products=await productModel.updateMany({"productName":req.params.productName},req.body);
  res.json(
    {
        success:true,
        products:products
    }
  );
  }
  catch(error)
  {
    res.json(
      {
        message:"Can't fetch the products"
      }
    );
  }
}
//2. API for fetch single product-/api/v1/product/:id
exports.getSingleProduct=async(req,res,next)=>
{
  console.log(req.params.id,"ID",req.body);
  try
  {
   const singleProduct=await productModel.findById(req.params.id);
  // const singleProduct=await productModel.findById("6731193eb999a28a15f7568e");
  // const singleProduct=await productModel.findByIdAndUpdate(req.params.id,req.body);
  res.json(
      {
        success:true,
        product:singleProduct
      }
     );
  }
  catch(error)
  {
    res.status(404).json(
      {
        success:true,
        // product:error.message
        Message:"Can't find the product with that ID"
      }
    );
  }
  // const singleProduct=await productModel.findById(req.params.id)
  // .then(()=>
  // {
  //   res.json(
  //     {
  //         success:true,
  //         singleProduct:singleProduct
  //     }
  //   );
  // })
  // .catch(()=>
  // {
  //   res.status(404).json(
  //     {
  //         success:true,
  //         singleProduct:"Can't find the product with that ID"
  //     }
  //   );
  // });
  // ;
  // ;
  // const singleProduct=await productModel.findById("6731193eb999a28a15f7568e");
  

}

//3. API for insert single document-api/v1/products/singleinsert
const insertSingleDocument=async (req,res,next)=>
{
  
}
// //4. API for insert multiple document- (order API)
// exports.insertMultipleDocument=async (req,res,next)=>
// {
//   try
//   {
//     const insertManyOperation= await productModel.insertMany(
//     [
//      {
//      productName:"Jack fruit",
//      price:110,
//      origin:"Jammu kashmir",
//      seller:"Amazon",
//      stock:120
//      },
//      {
//      productName:"Pomegranate",
//      price:110,
//      origin:"Jammu kashmir",
//      seller:"Amazon",
//      stock:120
//      }
//     ]
//    );
//    res.json(
//      {
//        status:insertManyOperation
//      }
//    );
//   }
//   catch(error)
//   {
//     res.json(
//       {
//         Message:"Can't insert the documents"
//       }
//     );   
//   }
// }
//5. API for update single document-/api/v1/products/singleupdate
exports.singleupdate=async (req,res,next)=>
{
  try
  {
    const singleUpdateOperation= await productModel.updateOne(
      // existing value
    {
      productName:"Apple",
    },
    // new value
    {
      productName:"Apple new",
     
      origin:"Jammu Kashmir New",

      price:220,
    }
    );
    res.json(
     {
       status:singleUpdateOperation
     }
   );
  }
  catch(error)
  {
    res.json(
      {
        Message:"Can't update the document"
      }
    );   
  }
}
//6. API for update multiple document-/api/v1/products/multipleupdate
exports.multipleupdate=async (req,res,next)=>
{
  try
  {
    const multipleUpdateOperation=await productModel.updateMany(
        // existing value
        {
          productName:"Apple",
        },
        // new value
        {
          productName:"Apple new",
         
          origin:"Jammu Kashmir New",
    
          price:220
        }
    );
    res.json(
     {
       status:multipleUpdateOperation
     }
   );
  }
  catch(error)
  {
    res.json(
      {
        Message:"Can't update the documents"
      }
    );   
  }
}
//7. API for delete single document-/api/v1/products/singledelete
exports.singleDelete=async (req,res,next)=>
{
  try
  {
    const singleDeleteOperation=await productModel.deleteOne(
    {
      productName:"Orange"
    }
    );
    res.json(
     {
       status:singleDeleteOperation
     }
   );
  }
  catch(error)
  {
    res.json(
      {
        Message:"Can't delete the document"
      }
    );   
  }
}
//8. API for delete multiple document-/api/v1/products/multipledelete
exports.multipleDelete=async (req,res,next)=>
{
  try
  {
    const multipleDeleteOperation=await productModel.deleteMany(
    {
      productName:"Orange"
    }
    );
    res.json(
     {
       status:multipleDeleteOperation
     }
   );
  }
  catch(error)
  {
    res.json(
      {
        Message:"Can't delete the documents"
      }
    );   
  }
}