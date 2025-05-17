const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./authenticateToken");

// Add to cart
router.put("/add-to-cart", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        if (userData.cart.includes(bookid)) {
            return res.json({ status: "success", message: "Book is already in your cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

        return res.json({ status: "success", message: "Book added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
});

// Delete from cart
router.delete("/delete-from-cart/:cartId", authenticateToken, async(req, res) => {
    try {
        const { cartId } = req.params;
        const { id } = req.headers;

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        await User.findByIdAndUpdate(id, { $pull: { cart: cartId } });

        res.status(200).json({ status: "success", message: "Book removed from the cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
});

// Get cart of a particular user
router.get("/get-cart/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const userData = await User.findById(id).populate("cart");

        if (!userData) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const cart = userData.cart ? userData.cart.reverse() : [];

        res.status(200).json({ status: "success", message: "Cart data retrieved", cart: cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
});

// Get all carts of all users
router.get("/get-all-cart", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const users = await User.findById(id).populate("cart");


        res.json({ status: "success", message: "All carts retrieved", data: users.cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
});

module.exports = router;