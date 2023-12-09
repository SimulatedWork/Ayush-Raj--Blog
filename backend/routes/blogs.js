const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  comment
} = require("../controller/blogController");

const requireAuth = require("../middleware/requireAuth");
const { default: mongoose } = require("mongoose");
const router = express.Router();
// Get all blogs
router.get("/", getBlogs);

router.use(requireAuth);

// Get a single blog by ID
router.get("/:id", getBlog);

// Post a new blog
router.post("/", createBlog);

// Delete a blog by ID
router.delete("/:id", deleteBlog);

// Update a blog by ID
router.patch("/:id", updateBlog);

// likes Resquest
router.put("/like", likeBlog);

// Unlike Request
router.put("/unlike", unlikeBlog);

// Comment Request
// router.put("/comment", requireAuth, (req, res) => {
//   const comment = {
//     text: req.body.text,
//     postedBy: req.user._id,
//   };
//   blog
//     .findByIdAndUpdate(
//       req.body.blogId,
//       {
//         $push: { comment: comment },
//       },
//       {
//         new: true,
//       }
//     )
//     .populate("comment.postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

router.put("/comment", comment);
router.put("/uncomment", comment);
module.exports = router;
