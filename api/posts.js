const mongoose = require('mongoose');
const Post = require('../models/Post'); // Model pro příspěvky

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = async (req, res) => {
    await connectDB();
    if (req.method === 'POST') {
        const { text } = req.body;
        try {
            const post = new Post({ text });
            await post.save();
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    if (req.method === 'GET') {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
