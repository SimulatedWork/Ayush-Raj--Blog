const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  comment,
} = require("../controller/blogController");

const requireAuth = require("../middleware/requireAuth");
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

// Like Request
router.put("/like/:id", likeBlog); // Updated route to capture blog ID from URL parameter

// Unlike Request
router.put("/dislike/:id", dislikeBlog); // Updated route to capture blog ID from URL parameter

// Comment Request
router.put("/comment/:id", comment); // Updated route to capture blog ID from URL parameter
router.put("/uncomment/:id", comment); // Updated route to capture blog ID from URL parameter

module.exports = router;
