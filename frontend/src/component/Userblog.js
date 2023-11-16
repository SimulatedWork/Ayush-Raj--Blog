import React from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import UserblogComp from './UserblogComp';

const UserBlog = () => {
  const { blogs } = useBlogContext();

  

  return (
   <>
   {blogs &&
      blogs.map((blog) => (
        <UserblogComp blog={blog}/>
      ))}
   </>
  );
};

export default UserBlog;
