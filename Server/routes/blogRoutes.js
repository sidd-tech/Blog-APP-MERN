const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single blog post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog post
router.post('/posts', async (req, res) => {
    const { title, content, author } = req.body;
    const post = new BlogPost({ title, content, author });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog post by ID
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
