const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { comments } = require('../data');

// GET /api/comments
router.get('/', (req, res) => {
  const { userId, postId } = req.queryParams;
  let filteredComments = comments;

  if (userId) {
    filteredComments = filteredComments.filter(comment => comment.userId === userId);
  }

  if (postId) {
    filteredComments = filteredComments.filter(comment => comment.postId === postId);
  }

  res.json(filteredComments);
});

// POST /api/comments
router.post('/', (req, res) => {
  const { userId, postId, body } = req.body;
  const newComment = {
    id: uuidv4(),
    userId,
    postId,
    body
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// GET /api/comments/:id
router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// PATCH /api/comments/:id
router.patch('/:id', (req, res) => {
  const { body } = req.body;
  const commentIndex = comments.findIndex(c => c.id === req.params.id);
  if (commentIndex !== -1) {
    comments[commentIndex].body = body;
    res.json(comments[commentIndex]);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// DELETE /api/comments/:id
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === req.params.id);
  if (commentIndex !== -1) {
    const deletedComment = comments.splice(commentIndex, 1)[0];
    res.json(deletedComment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

module.exports = router;
