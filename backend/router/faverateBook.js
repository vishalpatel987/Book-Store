const router = require("express").Router();
const Book = require("../models/books");
const User = require("../models/user");
const { authenticateToken } = require("./authenticateToken");

// Add book to favorites
router.put("/add-book-to-favorite", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.favorites.includes(bookid)) {
            return res.status(200).json({ message: "Book is already in favorites" });
        }

        await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
        res.status(200).json({ message: "Book added to favorites" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Delete book from favorites
router.delete("/remove-favorite-book", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.favorites.includes(bookid)) {
            return res.status(400).json({ message: "Book is not in favorites" });
        }

        await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
        res.status(200).json({ message: "Book removed from favorites" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get favorite books
router.get("/get-favorite-books", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate("favorites");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Success", data: user.favorites });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Add book to cart
router.put("/add-cart-book", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;
        console.log("id:", id, "bookId:", bookid);

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.cart.includes(bookid)) {
            return res.status(200).json({ message: "Book is already in cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        res.status(201).json({ message: "Book added to cart successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Delete book from cart
router.delete("/delete-cart-book", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.cart.includes(bookid)) {
            return res.status(400).json({ message: "Book not found in cart" });
        }

        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        res.status(200).json({ message: "Book removed from cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get books from cart
router.get("/get-cart-books", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate("cart");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Success", data: user.cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Add book to orders
router.put("/add-order-book", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.orders.includes(bookid)) {
            return res.status(200).json({ message: "Book is already in orders" });
        }

        await User.findByIdAndUpdate(id, { $push: { orders: bookid } });
        res.status(201).json({ message: "Book added to orders successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;