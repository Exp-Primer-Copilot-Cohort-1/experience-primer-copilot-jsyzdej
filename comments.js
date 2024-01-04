// Create new sever
const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      console.log(err);
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      console.log(err);
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect campground show page
          req.flash("success", "Successfully added comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// EDIT - edit comment
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found");
      return res.redirect("back");
    }
    // find comment by id
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        // render edit template with campground and comment
        res.render("comments/edit", {
          campground_id: req.params.id,
          comment: foundComment,
        });
      }
    });
    }
    );
    });
