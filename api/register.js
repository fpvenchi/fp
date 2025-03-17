const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Model pro uživatele

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = async (req, res) => {
    await connectDB();
    if (req.method === 'POST') {
        const { username, email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: 'Email is already taken' });

            const user = new User({ username, email, password });
            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
