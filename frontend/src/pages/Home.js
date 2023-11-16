import React, { useState, useEffect } from 'react';
import FullBlog from '../component/Fullblog';
import Cards from '../component/Cards';
import { ChakraProvider } from '@chakra-ui/react';
import {useBlogContext} from '../hooks/useBlogContext'

const Home = () => {
  // const [blogs, setBlogs] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const {blogs, dispatch}=useBlogContext()
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const json = await response.json();
      if (response.ok) {

        dispatch({type:'SET_BLOGS', payload: json})
      }
    };
    fetchBlogs();
  }, []);

  const handleExpand = (id) => {
    setCurrentBlog(id);
  };

  const handlePrev = () => {
    if (blogs.length === 1) {
      setCurrentBlog(blogs[0]._id);
    } else {
      setCurrentBlog((prev) => (prev === blogs[0]._id ? blogs[blogs.length - 1]._id : blogs[blogs.findIndex((blog) => blog._id === prev) - 1]._id));
    }
  };

  const handleNext = () => {
    if (blogs.length === 1) {
      setCurrentBlog(blogs[0]._id);
    } else {
      setCurrentBlog((prev) => (prev === blogs[blogs.length - 1]._id ? blogs[0]._id : blogs[blogs.findIndex((blog) => blog._id === prev) + 1]._id));
    }
  };

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <ChakraProvider key={blog._id}>
            <Cards blog={blog} handleExpand={handleExpand} />
          </ChakraProvider>
        ))}
      {currentBlog && blogs && blogs.find((blog) => blog._id === currentBlog) && (
        <FullBlog
          blog={blogs.find((blog) => blog._id === currentBlog)}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default Home;
