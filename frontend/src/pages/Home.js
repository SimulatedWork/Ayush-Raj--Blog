import React, { useState, useEffect } from 'react';
import FullBlog from '../component/Fullblog';
import Cards from '../component/Cards';
import { ChakraProvider } from '@chakra-ui/react';
import {useBlogContext} from '../hooks/useBlogContext'
import './Home.css'
// import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
  // const [blogs, setBlogs] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const {blogs, dispatch}=useBlogContext()
  // const {user}=useAuthContext()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs'
        // headers:{
        //   'Authorization':`Bearer ${user.token}`
        // }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({type:'SET_BLOGS', payload: json})
      }
    };
    // if(user){
      fetchBlogs();
    // }
  }, [dispatch]);

  const handleExpand = (id) => {
    setCurrentBlog(id);
  };
  const handleClose = () => {
    setCurrentBlog(null);
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
      {/* Cards Section */}
      <div className="cards-div">
        {blogs &&
          blogs.map((blog) => (
            <ChakraProvider key={blog._id}>
              <Cards blog={blog} handleExpand={handleExpand} />
            </ChakraProvider>
          ))}
      </div>

      {/* FullBlog Section */}
      {currentBlog && blogs && blogs.find((blog) => blog._id === currentBlog) && (
        <div className="full-blog-section">
          <FullBlog
            blog={blogs.find((blog) => blog._id === currentBlog)}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleClose={handleClose} 
          />
        </div>
      )}
    </div>

  );
};

export default Home;
