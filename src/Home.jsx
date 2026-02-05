//MAIN CONTENT


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { CiEdit } from 'react-icons/ci';
import { RiGeminiFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';

const Home = ({blogs}) => {
  return (
    <div className='h-500 w-full bg-amber-200'>
    
      <div className='bg-amber-200 w-full h-fit py-10 mb-20 flex justify-center items-center'>
        <h1 className='text-6xl font-bold'>FOOTBALL BLOG WEBSITE</h1>
      </div>

      <div className='mb-7'>
        <h1 className='text-3xl font-bold flex justify-center items-center'>TODAYS BLOGS:</h1>
        <div className='flex flex-row mt-10 gap-1 justify-center items-center'>
          {
            blogs.length==0 ? (<p>No blogs published today.</p>
            ):(
          
            (blogs.map((blog) => (
          <div key={blog.id} className="w-60 h-80 bg-white border-black border-2 rounded-2xl flex flex-col justify-center items-center p-5 shadow-lg overflow-hidden">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600 text-sm">By: {blog.author}</p>
            <p className="text-xs text-gray-400 mt-2">{blog.date}</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-600 hover:underline mt-4 block">
         Read More →
      </Link>
          </div>
        ))
      ))}
          
        </div>
      </div>
    

      <div className='flex justify-center items-center mb-5'>
        <h1 className='text-3xl font-bold'>.......</h1>
      </div>
     <div className='flex justify-center items-center '> 
         <Link to="/create" className='text-black no-underline'>   
          <div className='w-100 h-50 bg-white border-black border-2 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-gray-100 transition'>
            <h1 className='text-4xl font-bold mb-4'>CREATE BLOG</h1>
          
            <IoMdAdd size={50} />
          </div>
        </Link>

     
        <button className='text-black'> 
          <div className='w-100 h-50 bg-white border-black border-2 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-gray-100 transition'>
            <h1 className='text-4xl font-bold mb-4'>EDIT BLOGS</h1>
            <CiEdit size={50} />
          </div>
        </button>

       
        <button className='text-black'>
          <div className='w-100 h-50 bg-white border-black border-2 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-gray-100 transition'>
            <h1 className='text-4xl font-bold mb-4'>ANALYSE WITH AI</h1>
            <RiGeminiFill size={50} />
          </div>
        </button>
      </div>
      
      <div className='flex justify-center items-center mt-5'>
         <h1 className='text-3xl font-bold'>.......</h1>
      </div>
    </div>
  );
};

export default Home;
