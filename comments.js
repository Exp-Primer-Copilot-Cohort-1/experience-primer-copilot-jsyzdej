// Create new sever
const router = express.Router();
const passport = require('passport');
const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comment');

router.get('/test', (req, res) => res.json({ msg: 'This is the comments route' }));

router.get('/', (req, res) => {
  Comment.find()
    .sort({ date: -1 })
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
});

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err =>
      res.status(404).json({ nocommentfound: 'No comment found with that ID' })
    );
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newComment = new Comment({
    body: req.body.body,
    userId: req.user.id,
    postId: req.body.postId
  });

  newComment.save().then(comment => res.json(comment));
});

module.exports = router;