// Create new sever
const express = require('express')
const router = express.Router()
const Comment = require('../../models/comment')
const Restaurant = require('../../models/restaurant')

// Create new comment
router.post('/', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    userId: req.user._id,
    text: req.body.text,
    restaurantId: req.body.restaurantId
  })
  comment.save(err => {
    if (err) return console.error(err)
    return res.redirect(`/restaurants/${req.body.restaurantId}`)
  })
})

// Edit comment
router.get('/:id/edit', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.error(err)
    return res.render('edit', { comment: comment })
  })
})

// Update comment
router.put('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.error(err)
    comment.name = req.body.name
    comment.text = req.body.text
    comment.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${comment.restaurantId}`)
    })
  })
})

// Delete comment
router.delete('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.error(err)
    comment.remove(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${comment.restaurantId}`)
    })
  })
})

module.exports = router

