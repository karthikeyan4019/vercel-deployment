const express = require("express");
const router = express.Router();
const { createOrder,getOrderedItems} = require("../controllers/orderController");

// 4.To insert multiple documents
router.route("/order/createOrder").put(createOrder);
router.route("/order/getOrderedItems").get(getOrderedItems);

module.exports =router;
