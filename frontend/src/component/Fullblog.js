import React from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Image } from '@chakra-ui/react';

const FullBlog = ({ blog, handlePrev, handleNext }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <h3>{blog.title}</h3>
      <Image src={blog.image} alt={blog.title} style={{ width: '300px', height: '300px' }} />
      <p>{blog.desc}</p>
      <div>
        <FaArrowAltCircleLeft onClick={handlePrev} style={{ fontSize: '24px', marginRight: '20px', cursor: 'pointer' }} />
        <FaArrowAltCircleRight onClick={handleNext} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default FullBlog;
