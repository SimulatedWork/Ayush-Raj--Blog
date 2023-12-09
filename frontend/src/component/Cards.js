import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import {
  ThumbUpAltOutlined,
  ThumbUp,
  ThumbDown,
  ThumbDownAltOutlined,
} from "@mui/icons-material";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";

const Blog = ({ blog, handleExpand }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [comments, setComments] = useState(blog.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleLike = async (id) => {
    // Assume your API call is successful and you've updated the likes count
    setLikes(likes + 1);
    setIsLiked(true);

    // If the user has already disliked, reset the dislike state
    if (isDisliked) {
      setIsDisliked(false);
    }

    // Make a request to the server to update the like status
    try {
      const response = await fetch(`/api/blogs/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      // Handle the response as needed
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleDislike = async (id) => {
    // Assume your API call is successful and you've updated the likes count
    setLikes(likes - 1);
    setIsDisliked(true);

    // If the user has already liked, reset the like state
    if (isLiked) {
      setIsLiked(false);
    }

    // Make a request to the server to update the dislike status
    try {
      const response = await fetch(`/api/blogs/dislike/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Add any necessary request body
      });

      const json = await response.json();
      // Handle the response as needed
    } catch (error) {
      console.error("Error disliking the blog:", error);
    }
  };

  const handleComment = async (id) => {
    if (!newComment) {
      alert("Please enter a comment!");
      return;
    }

    // Make a request to the server to add a new comment
    try {
      const response = await fetch(`/api/blogs/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        setComments([...comments, json.newComment]);
        setNewComment("");
      } else {
        console.error("Error adding comment:", json.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const truncateContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  // Rest of your component code...

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
            <Text>{truncateContent(blog.desc, 150)}</Text>
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
