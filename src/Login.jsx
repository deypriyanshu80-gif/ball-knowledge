
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
   e.preventDefault();
   if(!email||!password)
   {
    return toast.error("Please fill in all fields");
   }
   try {//connecting to login route
    const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data=await response.json();
        if(response.ok)
        {
            toast.success("Welcome Back! ⚽")
            //now i save the user info to the LocalSorage to keep me logged in.
            localStorage.setItem("user", JSON.stringify(data.user)); 
            navigate('/'); //redirecting to home page after logging in

        }else {
            toast.error(data.message || "Login failed");
        }
    
   } catch (error) {
    console.error(error);
    toast.error("Server Error :(");
    
   };

    } 
    return (
    <div className="bg-blue-950 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black w-full max-w-md">
        
        <h2 className="text-4xl font-bold text-center mb-6">WELCOME BACK ⚽</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            <div>
                <label className="font-bold block mb-1">Email</label>
                <input 
                    type="email" 
                    placeholder="messi@goat.com" 
                    className="w-full border-2 border-black p-3 rounded-xl outline-none focus:bg-amber-50"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="font-bold block mb-1">Password</label>
                <input 
                    type="password" 
                    placeholder="********" 
                    className="w-full border-2 border-black p-3 rounded-xl outline-none focus:bg-amber-50"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="bg-amber-400 font-bold text-xl py-3 rounded-xl border-2 border-black hover:bg-amber-500 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none mt-4">
                LOG IN
            </button>
        </form>

        <p className="text-center mt-6 font-bold">
            New to the squad? <Link to="/signup" className="text-blue-600 underline">Sign Up</Link>
        </p>
      </div>
    </div>
    );
};

export default Login
