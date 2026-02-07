//DONE ONLY FOR CRUISING BETWEEN PAGES


import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';        
import CreateBlog from './CreateBlog'; 
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './BlogDetail';
import Signup from './Signup';
import Login from './Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const handlePublish=(newBlog)=>{
    setBlogs([...blogs, newBlog]);

  }

  return (
    <>
      
      <ToastContainer position="top-right" autoClose={3000} />
  <Router>
    <Routes>
  <Route path="/" element={<Home blogs={blogs} />}/> 
       <Route path="/create" element={<CreateBlog onPublish={handlePublish} />}/>
       <Route path="/blog/:id" element={<BlogDetail blogs={blogs} />} />  
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login/>}/>

    </Routes>
  </Router>
  </>
  )
}

export default App
