// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     book: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Book"
//     },
//     status: {
//         type: String,
//         default: "Order Placed",
//         enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Canceled"]
//     }
// }, {
//     timestamps: true
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Canceled"]
  },
  paymentMode: {
    type: String,
    default: "COD",
    enum: ["COD", "Online"]
  }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
