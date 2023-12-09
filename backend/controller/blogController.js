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
  const { id } = req.params; //question
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blog" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!blog) {
    return res.status(404).json({ error: "no such blog" });
  }
  res.status(200).json(blog);
};

// like a blog

const likeBlog = async (req, res) => {
  const { id } = req.params;
  const blog = Blog.findByIdAndUpdate({ likes: [...likes, id] });
  // .exec((err, result) => {
  //   if (err) {
  //     return res.status(422).json({ error: err });
  //   } else {
  //     res.json(result);
  //   }
  // });
  return res.status(200).json(blog);
};

// Unlike Blog
const unlikeBlog = async (req, res) => {
  blog
    .findByIdAndUpdate(
      req.body.blogId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
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
      .populate("postedBy", "_id name");

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uncomment = (req, res) => {
  let comment = req.body.comment;

  Blog.findByIdAndUpdate(
    req.body.blogId,
    {
      $pull: { comments: { _id: comment._id } },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  comment,
};
