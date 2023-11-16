const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt_secret = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

// register
router.post('/register', async (req, res) => {
    try {
        // check if user already exists
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) throw new Error("User with this email already exists");

        // Hash password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Create new User
        await User.create(req.body);

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("User with this email does not exist");

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password");

        // create token
        const token = jwt_secret.sign({ id: user._id }, process.env.jwt_secret, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: "User login successful",
            success: true,
            data: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
// Get User (protected)
router.get('/get-current-user',authMiddleware, async(req,res)=>{
try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({message:"User fetched successfully", success: true, data:user});
} catch (error) {
    res.status(500).json({message:error, success:false});
}
});
module.exports = router;
