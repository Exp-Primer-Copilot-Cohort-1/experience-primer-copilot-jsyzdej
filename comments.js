// Create new sever
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Create new comment
router.post('/new', (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    user: req.body.user,
    post: req.body.post,
    });
    comment.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
}
);
