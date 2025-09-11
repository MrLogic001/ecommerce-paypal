const express = require("express");

const {
  createPaypalOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePaypalPayment,
} = require("../../controllers/shop/orderController");

const router = express.Router();

router.post("/create", createPaypalOrder);
router.post("/capture", capturePaypalPayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
