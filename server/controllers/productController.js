const { json } = require("express");
const productModel = require("../models/productModel");

//1. API for fetch all products-/api/v1/products
exports.getProduct = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.json({
      message: "Can't fetch the products",
    });
  }
};

//2. API for fetch single product-/api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  console.log(req.params.id, "ID", req.body);
  try {
    const singleProduct = await productModel.findById(req.params.id);
    res.json({
      success: true,
      product: singleProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      // product:error.message
      Message: "Can't find the product with that ID",
    });
  }
};

//3. API for insert single document-/api/v1/products/singleinsert
const insertSingleDocument = async (req, res, next) => {};
// //4. API for insert multiple document-/api/v1/products/multipleinsert
exports.insertMultipleDocument = async (req, res, next) => {
  try {
    const insertManyOperation = await productModel.insertMany(
      [
        {
          productName: "Jack fruit",
          price: 110,
          origin: "Jammu kashmir",
          seller: "Amazon",
          stock: 120,
        },
        {
          productName: "Pomegranate",
          price: 110,
          origin: "Jammu kashmir",
          seller: "Amazon",
          stock: 120,
        },
      ]
      // req.body
    );
    res.json({
      status: insertManyOperation,
    });
  } catch (error) {
    res.json({
      Message: "Can't insert the documents",
    });
  }
};
//5. API for update single document-/api/v1/products/singleupdate
exports.singleupdate = async (req, res, next) => {
  try {
    const singleUpdateOperation = await productModel.updateOne(
      // existing value
      {
        productName: "Apple",
      },
      // new value
      {
        productName: "Apple new",

        origin: "Jammu Kashmir New",

        price: 220,
      }
    );
    res.json({
      status: singleUpdateOperation,
    });
  } catch (error) {
    res.json({
      Message: "Can't update the document",
    });
  }
};
//6. API for update multiple document-/api/v1/products/multipleupdate
exports.multipleupdate = async (req, res, next) => {
  try {
    const multipleUpdateOperation = await productModel.updateMany(
      // existing value
      {
        productName: "Apple",
      },
      // new value
      {
        productName: "Apple new",

        origin: "Jammu Kashmir New",

        price: 220,
      }
    );
    res.json({
      status: multipleUpdateOperation,
    });
  } catch (error) {
    res.json({
      Message: "Can't update the documents",
    });
  }
};
//7. API for delete single document-/api/v1/products/singledelete
exports.singleDelete = async (req, res, next) => {
  try {
    const singleDeleteOperation = await productModel.deleteOne({
      productName: "Orange",
    });
    res.json({
      status: singleDeleteOperation,
    });
  } catch (error) {
    res.json({
      Message: "Can't delete the document",
    });
  }
};
//8. API for delete multiple document-/api/v1/products/multipledelete
exports.multipleDelete = async (req, res, next) => {
  try {
    const multipleDeleteOperation = await productModel.deleteMany({
      productName: "Orange",
    });
    res.json({
      status: multipleDeleteOperation,
    });
  } catch (error) {
    res.json({
      Message: "Can't delete the documents",
    });
  }
};
// 9.API for insert multiple document using middleware-/api/v1/insertMultipleDocumentUsingMiddleware
exports.insertMultipleDocumentUsingMiddleware = async (req, res, next) => {
  try {
    const insertOperation = await productModel.insertMany(req.body);
    res.json({
      message: insertOperation,
    });
  } catch (error) {
    res.json({
      message: "Can't insert the documents",
    });
  }
};
//Queryparams
exports.queryoperation = async (req, res, next) => {
  console.log(req.query.name);
  console.log(req.query.age);
  try {
    const queryop = await productModel.find({
      productName: "Apple",
    });
    res.json({
      product_info: queryop,
      message: "success",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// API for filter products-/api/v1/filter
exports.filterOperationInitial = async (req, res, next) => {
  const search = req.query.search;
  const category = req.query.category;
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  try {
    let filObj;
    const initialFilteredProducts = await productModel.find({
      category: req.query.category,
    });
    let finalFilteredProducts = initialFilteredProducts.filter((val) => {
      if (category && min_price && max_price) {
        return val.price > min_price && val.price < max_price;
      } else if (category && min_price) {
        return val.price > min_price;
      } else if (category && max_price) {
        return val.price < max_price;
      } else if (category) {
        return val;
      }
    });
    console.log(initialFilteredProducts);
    console.log(finalFilteredProducts);

    const initialFilteredProductsCount = initialFilteredProducts.length;
    const finalFilteredProductsCount = finalFilteredProducts.length;

    console.log(initialFilteredProductsCount);
    console.log(finalFilteredProductsCount);
    if (initialFilteredProductsCount == 0) {
      res.json({
        // MESSAGE:"There is no products related to your search"
        PRODUCTS: products,
      });
    } else {
      if (finalFilteredProducts == 0) {
        res.json({
          success: true,
          PRODUCTS: initialFilteredProducts,
          // message: "There is no products related to your search",
        });
      } else {
        res.json({
          SUCCESS: true,
          PRODUCTS: finalFilteredProducts,
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.filterOperation1 = async (req, res, next) => {
  const search = req.query.search;
  const category = req.query.category;
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  try {
    if (search && category && min_price && max_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
        $and: [{ price: { $gte: min_price } }, { price: { $lte: max_price } }],
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && category && min_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
        price: { $gte: min_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && category && max_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
        price: { $lte: max_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && min_price && max_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        $and: [{ price: { $gte: min_price } }, { price: { $lte: max_price } }],
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (category && min_price && max_price) {
      const queryObject = {
        category: category,
        $and: [{ price: { $gt: min_price } }, { price: { $lt: max_price } }],
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && category) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && min_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        price: { $gte: min_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search && max_price) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
        price: { $lte: max_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (category && min_price) {
      const queryObject = {
        category: category,
        price: { $gte: min_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (category && max_price) {
      const queryObject = {
        category: category,
        price: { $lte: max_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (min_price && max_price) {
      const queryObject = {
        $and: [{ price: { $gt: min_price } }, { price: { $lt: max_price } }],
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (search) {
      const queryObject = {
        productName: { $regex: search, $options: "i" },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (category) {
      const queryObject = {
        category: category,
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (min_price) {
      const queryObject = {
        price: { $gte: min_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else if (max_price) {
      const queryObject = {
        price: { $lte: max_price },
      };
      const products = await productModel.find(queryObject);
      res.json({
        MESSAGE: "SUCCESS",
        PRODUCTS: products,
      });
    } else {
      res.json({
        MESSAGE: "There is no product related to your search",
      });
    }
  } catch (error) {
    res.json({
      MESSAGE: error.message
    });
  }
};
exports.filterOperation = async (req, res, next) => {
  let category = req.query.category;
  if(category==="ALL")
  {
    category="";
  }
  const search = req.query.search ;
  const min_price = parseInt(req.query.min_price);
  const max_price = parseInt(req.query.max_price);

  let queryObject = {};
  // console.log(category)
  try {
    if (search && category && min_price && max_price) {
      queryObject = {
        productName: { $regex: `search`, $options: "i" },
        category: category,
        $and: [{ price: { $gte: min_price } }, { price: { $lte: max_price } }],
      };
    } else if (search && category && min_price) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
        price: { $gte: min_price },
      };
    } else if (search && category && max_price) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
        price: { $lte: max_price },
      };
    } else if (search && min_price && max_price) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        $and: [{ price: { $gte: min_price } }, { price: { $lte: max_price } }],
      };
    } else if (category && min_price && max_price) {
      queryObject = {
        category: category,
        $and: [{ price: { $gt: min_price } }, { price: { $lt: max_price } }],
      };
    } else if (search && category) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        category: category,
      };
    } else if (search && min_price) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        price: { $gte: min_price },
      };
    } else if (search && max_price) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
        price: { $lte: max_price },
      };
    } else if (category && min_price) {
      queryObject = {
        category: category,
        price: { $gte: min_price },
      };
    } else if (category && max_price) {
      queryObject = {
        category: category,
        price: { $lte: max_price },
      };
    } else if (min_price && max_price) {
      queryObject = {
        $and: [{ price: { $gt: min_price } }, { price: { $lt: max_price } }],
      };
    } else if (search) {
      queryObject = {
        productName: { $regex: search, $options: "i" },
      };
    } else if (category) {
      queryObject = {
        category: category,
      };
    } else if (min_price) {
      queryObject = {
        price: { $gte: min_price },
      };
    } else if (max_price) {
      queryObject = {
        price: { $lte: max_price },
      };
    } else {
      queryObject = {};
    }

    const products = await productModel.find(queryObject);
    // console.log(products);
    if (products.length == 0) {
      res.json({
        MESSAGE:"There is no product related to your search",
        PRODUCTS:products
      });
    } else {
      res.json({
        MESSAGE:"SUCCESS",
        PRODUCTS:products
      });
    }
  } catch (error) {
    res.json({
      MESSAGE: error.message,
      // PRODUCTS:products
      PRODUCTS:[]
    });
  }
};

// filter using mongodb aggregation operators
exports.aggreFilter = async (req, res, next) => {
  const category = req.query.category;
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  // console.log(category);
  // console.log(min_price);
  // console.log(max_price);
  try {
    if (category && min_price && max_price) {
      const a = await productModel.aggregate([
        {
          $match: {
            $and: [
              { category: category },
              { price: { $gt: +min_price } },
              { price: { $lt: Number(max_price) } },
            ],
          },
        },
      ]);
      if (a.length > 0) {
        res.json({
          message: "success",
          products: a,
        });
      } else {
        res.json({
          product: "There is no product related to your search",
        });
      }
    } else if (category && min_price) {
      const a = await productModel.aggregate([
        {
          $match: {
            $and: [
              { category: category },
              { price: { $gt: Number(min_price) } },
            ],
          },
        },
      ]);
      if (a.length > 0) {
        res.json({
          message: "success",
          products: a,
        });
      } else {
        res.json({
          product: "There is no product related to your search",
        });
      }
    } else if (category && max_price) {
      const a = await productModel.aggregate([
        {
          $match: {
            $and: [
              { category: category },
              { price: { $lt: Number(max_price) } },
            ],
          },
        },
      ]);
      if (a.length > 0) {
        res.json({
          message: "success",
          products: a,
        });
      } else {
        res.json({
          product: "There is no product related to your search",
        });
      }
    } else if (category) {
      const a = await productModel.aggregate([
        { $match: { category: category } },
      ]);
      if (a.length > 0) {
        res.json({
          message: "success",
          products: a,
        });
      } else {
        res.json({
          product: "There is no product related to your search",
        });
      }
    } else {
      res.json({
        product: "Please choose atleast one filter option",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
