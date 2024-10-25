const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { posts, comments } = require('../data');

// GET /api/posts
router.get('/', (req, res) => {
  const { userId } = req.queryParams;
  if (userId) {
    const userPosts = posts.filter(post => post.userId === userId);
    res.json(userPosts);
  } else {
    res.json(posts);
  }
});

// POST /api/posts
router.post('/', (req, res) => {
  const newPost = { id: uuidv4(), ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// PATCH /api/posts/:id
router.patch('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex !== -1) {
    const deletedPost = posts.splice(postIndex, 1)[0];
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  const { userId } = req.queryParams;
  let postComments = comments.filter(comment => comment.postId === postId);

  if (userId) {
    postComments = postComments.filter(comment => comment.userId === userId);
  }

  res.json(postComments);
});

module.exports = router;
