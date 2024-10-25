const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users, posts, comments } = require('../data');

// GET /api/users
router.get('/', (req, res) => {
  res.json(users);
});

// POST /api/users
router.post('/', (req, res) => {
  const newUser = { id: uuidv4(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// PATCH /api/users/:id
router.patch('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// GET /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
  const userId = req.params.id;
  const userPosts = posts.filter(post => post.userId === userId);
  res.json(userPosts);
});

// GET /api/users/:id/comments
router.get('/:id/comments', (req, res) => {
  const userId = req.params.id;
  const { postId } = req.queryParams;
  let userComments = comments.filter(comment => comment.userId === userId);

  if (postId) {
    userComments = userComments.filter(comment => comment.postId === postId);
  }

  res.json(userComments);
});

module.exports = router;
