import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); 
    const navigate = useNavigate();
    const handleSignup =async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
        return toast.error("Please fill in all fields");
    } try{
        const response=await fetch (`http://localhost:5000/api/register`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        }

        );
        const data = await response.json();
    if(response.ok){
        toast.success("Account Created! ⚽")
    navigate('/login') 
    }else{
        toast.error(data.message || "Registration failed");
    }} catch (error) {
        console.error(error);
        toast.error("Server Error");
    }
}
    return (
    <div className="bg-amber-200 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black w-full max-w-md">
        
        <h2 className="text-4xl font-bold text-center mb-6">JOIN THE SQUAD ⚽</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
            
            <div>
                <label className="font-bold block mb-1">Username</label>
                <input 
                    type="text" 
                    placeholder="Striker99" 
                    className="w-full border-2 border-black p-3 rounded-xl outline-none focus:bg-amber-50"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

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
                SIGN UP
            </button>
        </form>

        <p className="text-center mt-6 font-bold">
            Already have an account? <Link to="/login" className="text-blue-600 underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

