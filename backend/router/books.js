const router = require("express").Router();
const Book = require("../models/books");
const User = require("../models/user")
const { authenticateToken } = require("./authenticateToken");


router.post("/create-book", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const { url, title, author, price, desc, language } = req.body;

        const user = await User.findById(id)
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "You don't have access to add the books" })
        }
        const books = new Book({
            url,
            title,
            author,
            price,
            desc,
            language
        })
        await books.save();

        res.status(200).json({ message: "Book is created", data: books });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

// Update book information
router.put("/update-book", authenticateToken, async(req, res) => {
    try {
        const { bookId, url, title, author, price, desc, language } = req.body;

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId, { url, title, author, price, desc, language }, { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/all-books", async(req, res) => {
    try {
        const bookData = await Book.find().sort({ createAt: -1 })
        res.status(201).json({ message: "get recent book", book: bookData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//get recent book
router.get("/get-recent-books", async(req, res) => {
    try {
        const bookData = await Book.find().sort({ createAt: -1 }).limit(4);
        res.status(201).json({ message: "get recent book", book: bookData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//delete book 
router.delete("/delete-book/:bookId", authenticateToken, async(req, res) => {
    try {
        const { bookId } = req.params; // Get bookId from params
        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get("/get-book-id/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const bookData = await Book.findById(id);
        res.status(201).json({ data: bookData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})


module.exports = router