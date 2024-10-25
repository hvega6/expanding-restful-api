const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware for parsing query parameters
const parseQueryParams = (req, res, next) => {
  req.queryParams = {};
  if (req.query.userId) req.queryParams.userId = req.query.userId;
  if (req.query.postId) req.queryParams.postId = req.query.postId;
  next();
};

app.use(parseQueryParams);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
