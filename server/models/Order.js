const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');

// Define a custom alphabet for the order ID (numeric and uppercase letters, 12 chars long)
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: () => `ORD-${nanoid()}`,
    unique: true,
    required: true,
  },
  userDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  },
  orderStatus: {
    type: String,
    default: 'Completed',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
