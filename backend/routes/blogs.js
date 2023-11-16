const express = require('express');
const{
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
}=require('../controller/blogController')

const router = express.Router();



// Get all blogs
router.get('/', getBlogs);

// Get a single blog by ID
router.get('/:id', getBlog);

// Post a new blog
router.post('/', createBlog);

// Delete a blog by ID
router.delete('/:id', deleteBlog);

// Update a blog by ID
router.patch('/:id', updateBlog);

module.exports = router;
