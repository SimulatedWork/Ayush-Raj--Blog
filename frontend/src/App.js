import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BlogContextProvider } from './Context/BlogContext';

import BasicExample from './component/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ChakraProvider>
      <BlogContextProvider>
        <BrowserRouter>
          <BasicExample />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </BlogContextProvider>
    </ChakraProvider>
  );
}

export default App;
