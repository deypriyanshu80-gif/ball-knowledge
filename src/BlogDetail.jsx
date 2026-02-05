import React from 'react'
import { useParams,Link } from 'react-router-dom'
const BlogDetail = ({blogs}) => {
    const {id}=useParams();
    const blog = blogs.find((b) => b.id === Number(id));
    if (!blog) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Blog not found!</h2>
        <Link to="/" className="text-blue-500 underline">Go Home</Link>
      </div>
    );
  }
  return (
    <div className="p-10 max-w-4xl mx-auto">
        <Link to="/" className="text-gray-500 hover:text-black mb-5 inline-block">
      </Link>
      <div className='h-500 w-full bg-amber-200'>
        <h1 className='text-black'>{blog.title}</h1>
        <div >
        <p className='text-black'>By:blog.author</p>
        <p className='text-black'>{blog.date}</p>
        </div>
        <div>
        <h2 className='text-black'>{blog.content}</h2>
        </div>
      </div>
      
    </div>
  )
}

export default BlogDetail
