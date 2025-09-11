const Order = require("../../models/order");
const Cart = require("../../models/cart");
const Product = require("../../models/product");
const paypalClient = require("../../helpers/paypalClient");
const paypal = require("@paypal/checkout-server-sdk");

const createPaypalOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      cartId,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId, // paymentId and payerId are typically captured after approval
      payerId,
    } = req.body;

    // --- Create Order using the new SDK ---
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";

    // Format cart items for the PayPal API
    const paypalItems = cartItems.map((item) => ({
      name: item.title,
      sku: item.productId,
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "YOUR_ORDER_ID_OR_UNIQUE_REF", // You can use your internal order ID here
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
              // You can add shipping, tax, etc. here if applicable
            },
          },
          items: paypalItems,
        },
      ],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
        brand_name: "EComm-Shadcn",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    });

    // Execute the request to create the PayPal order
    const order = await paypalClient.client().execute(request);

    // --- Save Order to your Database ---
    // Note: paymentId and payerId are obtained AFTER the user approves the payment on PayPal.
    // You should save the PayPal order ID and then update your local order status upon return.
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: order.result.id, // Store the PayPal Order ID
      payerId,
    });

    await newlyCreatedOrder.save();

    // The 'order' object contains the approval URL in its links array
    const approvalURL = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;

    res.status(201).json({
      success: true,
      approvalURL: approvalURL,
      orderId: newlyCreatedOrder._id, // Return your internal order ID
    });
  } catch (e) {
    console.error("PayPal Order Creation Error:", e);
    // Log more detailed error information from 'e' if available
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the PayPal order.",
      error: e.message || "Unknown error",
    });
  }
};

// Capture payment
const capturePaypalPayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createPaypalOrder,
  capturePaypalPayment,
  getAllOrdersByUser,
  getOrderDetails,
};
