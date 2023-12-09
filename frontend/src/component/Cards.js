import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  ThumbUpAltOutlined,
  ThumbUp,
  ThumbDown,
  ThumbDownAltOutlined,
} from "@mui/icons-material";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";

const Blog = ({ blog, handleExpand }) => {
  const {user } = useAuthContext();
  const [likes, setLikes] = useState(blog.likes.length);
  const [isLiked, setIsLiked] = useState(
    user ? blog.likes.includes(user._id) : false
  );
  const [isDisliked, setIsDisliked] = useState(false);
  const [comments, setComments] = useState(blog.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleLike = async (id) => {
    try {
      const response = await fetch(`/api/blogs/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedBlog = await response.json();

      setLikes(updatedBlog.likes.length);
      setIsLiked(!isLiked);

      if (isDisliked) {
        setIsDisliked(false);
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleDislike = async (id) => {
    try {
      const response = await fetch(`/api/blogs/dislike/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedBlog = await response.json();

      setLikes(updatedBlog.likes.length);
      setIsDisliked(!isDisliked);

      if (isLiked) {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error disliking the blog:", error);
    }
  };

  const handleComment = async (id) => {
    if (!newComment) {
      alert("Please enter a comment!");
      return;
    }

    try {
      const response = await fetch(`/api/blogs/comment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          blogId: id,
          text: newComment,
        }),
      });

      const updatedBlog = await response.json();

      if (response.ok) {
        setComments([...updatedBlog.comments]);
        setNewComment("");
        alert("Comment added Successfully!")
      } else {
        console.error("Error adding comment:", updatedBlog.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  return (
    <div key={blog.id} style={{ margin: "20px" }}>
      <Card maxW="sm" style={{ height: "660px", width: "340px" }}>
        <CardBody>
          <div>
            <Image
              className="blog-image"
              src={blog.Image}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              style={{ objectFit: "contain" }}
            />
          </div>

          <Stack mt="6" spacing="3">
            <Heading size="md">{blog.title}</Heading>
            <Text>
              {blog.desc.length > 220
                ? `${blog.desc.slice(0, 220)}...`
                : blog.desc}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => handleExpand(blog._id)}
          >
            Read More
          </Button>
          {isLiked ? (
            <ThumbUp
              onClick={() => handleDislike(blog._id)}
              style={{ marginLeft: "140px" }}
            />
          ) : (
            <ThumbUpAltOutlined
              onClick={() => handleLike(blog._id)}
              style={{ marginLeft: "140px" }}
            />
          )}
          {isDisliked ? (
            <ThumbDown
              onClick={() => handleLike(blog._id)}
              style={{ marginLeft: "15px" }}
            />
          ) : (
            <ThumbDownAltOutlined
              onClick={() => handleDislike(blog._id)}
              style={{ marginLeft: "15px" }}
            />
          )}
        </CardFooter>
        <input
          type="text"
          name="comment section"
          id=""
          placeholder="Add your comment here....."
          style={{
            margin: "0 12px",
            borderRadius: "10px",
            height: "4vh",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="solid"
          colorScheme="blue"
          style={{
            margin: "10px",
            borderRadius: "10px",
            height: "4vh",
          }}
          onClick={() => handleComment(blog._id)}
        >
          Comment
        </Button>
      </Card>
      ;
    </div>
  );
};

export default Blog;
