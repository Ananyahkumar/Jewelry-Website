const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Create a new order and its associated payment details
exports.createOrderAndPayment = async (req, res) => {
  try {
    const { userDetails, products, totalAmount, paymentData } = req.body;

    // 1. Create the Payment document
    const newPayment = new Payment({
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_signature: paymentData.razorpay_signature,
      amount: totalAmount,
      user: paymentData.user, // Assuming user ID is passed in paymentData
      paymentMethod: paymentData.paymentMethod,
    });

    const savedPayment = await newPayment.save();

    // 2. Create the Order document, linking to the new Payment
    const newOrder = new Order({
      userDetails,
      products,
      totalAmount,
      paymentDetails: savedPayment._id, // Link to the payment document
    });

    const savedOrder = await newOrder.save();

    // 3. Return the generated orderId to the frontend
    res.status(201).json({ 
      success: true, 
      message: 'Order created successfully', 
      orderId: savedOrder.orderId 
    });

  } catch (error) {
    console.error('Error creating order and payment:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};
