// const router = require("express").Router();
// const User = require("../models/user");
// const Order = require("../models/order");
// const { authenticateToken } = require("./authenticateToken");

// // Place Order Route
// router.post("/order-book", authenticateToken, async(req, res) => {
//     try {
//         const { id } = req.headers;
//         const { bookIds } = req.body;

//         if (!Array.isArray(bookIds) || bookIds.length === 0) {
//             return res.status(400).json({ message: "Invalid or empty book order request." });
//         }

//         let orderIds = [];
//         for (const bookId of bookIds) {
//             const newOrder = new Order({ user: id, book: bookId });
//             await newOrder.save();
//             orderIds.push(newOrder._id);
//         }

//         // Update user orders and remove books from cart
//         const updatedUser = await User.findByIdAndUpdate(
//             id, {
//                 $push: { orders: { $each: orderIds } },
//                 $pull: { cart: { $in: bookIds } },
//             }, { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         res.status(200).json({ message: "Books have been ordered successfully." });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// });

// // Get order history of a particular user
// router.get("/get-order-history", authenticateToken, async(req, res) => {
//     try {
//         const { id } = req.headers;
//         const userData = await User.findById(id).populate({
//             path: "orders",
//             populate: { path: "book" }
//         });

//         if (!userData) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.json({
//             status: "Success",
//             data: userData.orders.reverse() // Reverse orders to show recent first
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An Error Occurred", error: error.message });
//     }
// });

// // Get all orders (Admin)
// router.get("/get-all-orders-admin", authenticateToken, async(req, res) => {
//     try {
//         const { id } = req.headers;
//         const adminUser = await User.findById(id);

//         if (!adminUser || adminUser.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Admins only." });
//         }

//         const orders = await Order.find()
//             .populate({
//                 path: "book",
//                 select: "title desc price", // Specify fields to select from the Book model
//             })
//             .populate({
//                 path: "user",
//                 select: "name email", // Specify fields to select from the User model
//             })
//             .sort({ createdAt: -1 });

//         return res.json({
//             status: "Success",
//             data: orders,
//         });
//         console.log(orders)
//     } catch (error) {
//         console.error("Error fetching admin orders:", error);
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// });


// // Update order status (Admin)
// router.put("/update-status/:id", authenticateToken, async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;
//         const adminId = req.headers.id;

//         const adminUser = await User.findById(adminId);
//         if (!adminUser || adminUser.role !== "admin") {
//             return res.status(403).json({ message: "You are not authorized to update the status." });
//         }

//         await Order.findByIdAndUpdate(id, { status });

//         return res.json({
//             status: "Success",
//             message: "Order status updated successfully."
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// });

// module.exports = router;


const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const { authenticateToken } = require("./authenticateToken");

// 📌 Place Order Route
router.post("/order-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookIds, paymentMode } = req.body;

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      return res.status(400).json({ message: "Invalid or empty book order request." });
    }

    let orderIds = [];
    for (const bookId of bookIds) {
      const newOrder = new Order({
        user: id,
        book: bookId,
        paymentMode: paymentMode || "COD", // ✅ set paymentMode
      });
      await newOrder.save();
      orderIds.push(newOrder._id);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: { orders: { $each: orderIds } },
        $pull: { cart: { $in: bookIds } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Books have been ordered successfully." });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📌 Get order history for user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      status: "Success",
      data: userData.orders.reverse(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An Error Occurred", error: error.message });
  }
});

// 📌 Get all orders for admin
router.get("/get-all-orders-admin", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const adminUser = await User.findById(id);

    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const orders = await Order.find()
      .populate({
        path: "book",
        select: "title desc price",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// 📌 Update order status (Admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.headers.id;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update the status." });
    }

    await Order.findByIdAndUpdate(id, { status });

    return res.json({
      status: "Success",
      message: "Order status updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
