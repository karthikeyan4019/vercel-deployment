const express = require("express");
const router = express.Router();
const {
  getProduct,
  getSingleProduct,
  insertMultipleDocument,
  singleupdate,
  multipleupdate,
  singleDelete,
  multipleDelete,
  insertMultipleDocumentUsingMiddleware,
  queryoperation,
  filterOperation1,
  filterOperation,
  aggreFilter
} = require("../controllers/productController");
const { schema } = require("../models/productModel");
const yup = require("yup");

// 1.To get all tha products

router.route("/products").get(getProduct);

// 2.To get single product

router.route("/product/:id").get(getSingleProduct);

// 3.To insert single document

// router.route("/products/singleinsert").post(insertSingleDocument);

// 4.To insert multiple document

router.route("/products/multipleinsert").post(insertMultipleDocument);

// 5.To update single document

router.route("/products/singleupdate").put(singleupdate);

// 6.To update multiple document

router.route("/products/multipleupdate").put(multipleupdate);

// 7.To delete single document

router.route("/products/singledelete").delete(singleDelete);

// 8.To delete multiple document

router.route("/products/multipledelete").delete(multipleDelete);

// 1.Find------------------------------------------

// router.route("/products/").get(getProduct);

// 2.Insert-----------------------------------------

// router.route("/products/").put(getProduct);

// 3.Update-----------------------------------------

// router.route("/products/").put(getProduct);

// 4.Delete-----------------------------------------

// router.route("/products/").delete(getProduct);

// 5.Some other methods-----------------------------

// 1.findById();-----

// router.route("/products/").get(getProduct);

// router.route("/products/:id").get(getProduct);

// 2.findByIdAndUpdate();-----

// router.route("/products/").put(getProduct);

// router.route("/products/:id").put(getProduct);

// 3.findByIdAndDelete();-----

// router.route("/products/").delete(getProduct);

// router.route("/products/:id").delete(getProduct);

// router.route("/products/:productName").get(getProduct);
// router.route("/products/:productName").put(getProduct);

// router.route("/product/").get(getSingleProduct);

// Schema------------------------------------------------------------------
const productSchemaSample = yup.object({
  body: yup.object({
    name: yup.string().required(),
    age: yup.number().min(2).max(200).required(),
    email: yup.string().email().required(),
  }),
});
const productSchema = yup.object({
  body: yup.object({
    productName: yup.string().required(),
    price: yup.number().required(),
    origin: yup.string().required(),
    seller: yup.string().required(),
    stock: yup.number().required(),
    // email: yup.string().email().required(),
    
  }),
});
// Middleware to validate incoming request----------------------------------
const validate = (schema) => async (req, res, next) => {
  try {
    console.log(req.body);
    await schema.validate({
      body: req.body,
    });
    // Note:The controller will give the response.So,Don't give the response here.We can't send the multiple response for the request
    //   res.json(
    //     {
    //        message:"succsess"
    //     }
    //   );
    return next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
// Enable response in validate function for this route
router.route("/validation").post(validate(productSchemaSample));
router
  .route("/products/multipleinsertusingmiddleware")
  .post(validate(productSchema), insertMultipleDocumentUsingMiddleware);

// queryparams
router.route("/queryparams").get(queryoperation);

// products
// router.route("/fruits").get(initialProducts);

// product filter
router.route("/filter").get(filterOperation);

// filter using mongodb aggregation operators
router.route("/aggrefilter").get(aggreFilter);

// -----------------------------------------------------

// route to check verify token
const jwt=require("jsonwebtoken");
const verifyJWT=(req,res,next)=>
{
  let authHeader=req.headers.authorization;
  console.log("---------------------------------");
  console.log(authHeader);
  
  if(authHeader)
  {
    token=authHeader;
    console.log(token);
    jwt.verify(token,"NEW",(error,user)=>
    {
      console.log(user);
      console.log(user.id);
      console.log(req.params.id);
      if(user.id===req.params.id)
      {
        // next();
        res.json(
          {
            MESSAGE:"You have the access"
          }
        );
      }
      else
      {
        res.json(
          {
            MESSAGE:"You don't have the access"
          }
        );
      }
    });
    
  }
}
router.route("/token/:id").post(verifyJWT);
// router.route("/token").get(verifyJWT,tokenCheck);

module.exports = router;
