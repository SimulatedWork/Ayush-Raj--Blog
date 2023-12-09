const Blog = require("../modles/blogModel");
const mongoose = require("mongoose");

// const NBlog = mongoose.model("Blog");

// get all blog
const getBlogs = async (req, res) => {
  const blog = await Blog.find({})
    // .populate("postedBy", "_id name")
    .populate("comments", "text")
    .populate("comments.postedBy", "_id name")
    .sort({ createdAt: -1 });
  res.status(200).json(blog);
};

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params; //question
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }
  const blog = await Blog.findById(id)
    .populate("comments", "text")
    .populate("comments.postedBy", "_id name");
  if (!blog) {
    return res.status(404).json({ error: "no such blog" });
  }
  res.status(200).json(blog);
};

//create a new blog
const createBlog = async (req, res) => {
  const { title, desc, Image } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("tile");
  }
  if (!desc) {
    emptyFields.push("description");
  }
  if (!Image) {
    emptyFields.push("image");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the details", emptyFields });
  }
  //add doc to db
  try {
    const blog = await Blog.create({ title, desc, Image });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params; //question
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }
  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(404).json({ error: "no such blog" });
  }
  res.status(200).json(blog);
};

//upatate a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }

  // Exclude 'postedBy' from the update if it's present in the request body
  const updateFields = { ...req.body };
  if (updateFields.postedBy) {
    delete updateFields.postedBy;
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "no such blog" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// like a blog

const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    // Check if the user has already liked the blog
    const alreadyLiked = blog.likes.includes(req.user._id);

    if (alreadyLiked) {
      // User already liked, unlike the blog
      blog.likes.pull(req.user._id);
    } else {
      // User hasn't liked, like the blog
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dislikeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    // Check if the user has already disliked the blog
    const alreadyDisliked = blog.dislikes.includes(req.user._id);

    if (alreadyDisliked) {
      // User already disliked, remove the dislike
      blog.dislikes.pull(req.user._id);
    } else {
      // User hasn't disliked, add the dislike
      blog.dislikes.push(req.user._id);
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const comment = async (req, res) => {
  const { blogId, text } = req.body;

  // Create a new comment object
  const newComment = {
    text,
    postedBy: req.user._id,
  };

  try {
    // Use findByIdAndUpdate to add the new comment to the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: newComment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("likes", "_id name") // Add this line to populate likes
      .populate("comments.postedBy", "_id name");

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  comment,
};
