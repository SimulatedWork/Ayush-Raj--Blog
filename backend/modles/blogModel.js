const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId  = mongoose.Schema.Types.ObjectId;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    // user_id:{
    //     type: String,
    //     required:true
    // }
    Image: {
      // public_id: {
      //   type: String,
      //   required: true,
      // },
      // url: {
      //   type: String,
      //   required: true,
      // },
      type: String,
      required: true,
    },
    likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
