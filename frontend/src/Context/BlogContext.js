// BlogContext.js
import { createContext, useReducer } from "react";

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        blogs: action.payload
      };
    case 'CREATE_BLOG':
      return {
        blogs: [action.payload, ...state.blogs]
      };
    case 'DELETE_BLOG':
      return {
        blogs: state.blogs.filter((w) => w._id !== action.payload._id)
      };
    case 'UPDATE_BLOG':
      return {
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? { ...blog, ...action.payload } : blog
        )
      };
    default:
      return state;
  }
};

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: null
  });

  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
