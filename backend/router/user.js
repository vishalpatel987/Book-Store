const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./authenticateToken");
const multer = require('multer');


// Signup Route
router.post("/sign-up", async(req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Validate password length
        if (password.length < 5) {
            return res.status(400).json({ message: "Password length should be more than 4 characters" });
        }

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be more than 4 characters" });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Login Route              
router.post("/log-in", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if all fields are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        await bcrypt.compare(password, user.password, (error, data) => {
            if (data) {
                const authClaims = [
                    { name: user.username },
                    { role: user.role }
                ]
                const token = jwt.sign({ authClaims }, "bhupendra$123", { expiresIn: "30d" })
                res.status(200).json({ message: "Login successful", id: user._id, role: user.role, token: token });
            } else {
                res.status(400).json({ message: "Invalid credintial" })
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update user information
router.put('/update-user', authenticateToken, async(req, res) => {
    try {
        const { username, password, address } = req.body;
        const updatedData = { username, address };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get("/get-user-information", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
});


// Multer storage configuration     
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "profilePicture")); // Ensuring correct path handling
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//update profilepicture
router.put("/update-profile-picture", upload.single("avatar"), authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        let avatar = req.file ? `/public/profilePicture/${req.file.filename}` : req.body.avatar; // Save the uploaded file path if available

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id, { avatar }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated profile piture successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//update username
router.put("/update-username", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const { username } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id, { username: username }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated username successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//update email
router.put("/update-email", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const { email } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id, { email: email }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated username successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//address email
router.put("/update-address", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id, { address: address }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated username successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;