import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBlog = ({onPublish}) => {
  const [category, setCategory] = useState('Opinion'); 
const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const navigate=useNavigate();
const handleSubmit = (e) => {
    e.preventDefault();
const newBlog={
  title: title,
      author: author,
      category:category,
      content:content,
      id: Date.now(),
    date:new Date().toLocaleDateString()
}
onPublish(newBlog);
toast.success("Blog Published Successfully! 🚀");
navigate('/');

  }
  return (
    <div className='bg-amber-200 w-full h-500'>
        <div className='flex items-center justify-center' >
          <h1 className='text-5xl'>CREATE A NEW POST</h1>
        </div>
        <form onSubmit={handleSubmit} className='w-full'>
        <div className='mt-10 flex justify-center items-center flex-col'>
          <h1 className='text-bold text-2xl font-bold '>TYPE BLOG TITLE :</h1>
          <input type="text"
          placeholder="barca is best"
          className='border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-300 mt-5' 
          onChange={(e)=> setTitle(e.target.value)}/>
        </div>
        <div className='flex justify-center items-center flex-col'>
        <input type="text"
        placeholder='type your name'
        className='border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-300 mt-5'
        onChange={(e)=> setAuthor(e.target.value)} />
        </div>
        <div className='flex justify-center items-center mt-10'>
          <label className='text-2xl font-bold'>Category:</label>
          <select className='border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-300 bg-white '
          onChange={(e)=>setCategory(e.target.value)}>
          <option >Opinion</option>
           <option >Match Analysis</option>
            <option >Transfer News</option>
             <option >Player Stats</option>
            
          </select>
        </div>


        <div className='flex flex-col justify-center items-center mt-10'>
        <label className='text-2xl font-bold'>Content:</label>
        <textarea rows="6"
        placeholder='write your analysis'
        className='border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-300'
        onChange={(e)=>setContent(e.target.value)}>
        </textarea>
        </div>


        <div className='flex items-center justify-center '>
       <button className='bg-amber-100 text-3xl font-bold py-4 rounded-xl border-2 border-black hover:bg-amber-400 transition mt-4'>
        PUBLISH

       </button>
       </div>
       </form>
                                        
    </div>
  )
}

export default CreateBlog
