require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./models/Blog');
const User = require('./models/User');

const app = express(); // ✅ 1. Initialize App

app.use(cors());
app.use(express.json());

// ✅ 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ✅ 3. GET Route (Fetch Blogs) - Fixed! No more crash.
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
});

// ✅ 4. POST Route (Create Blog)
app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("🔥 ERROR SAVING BLOG:", error);
        res.status(500).json({ message: "Error saving blog", error: error.message });
    }
});

// ✅ 5. REGISTER Route 
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully! ⚽" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});
//login route
app.post('/api/login', async(req,res)=>{
    try{
        const { email, password } = req.body;
        //finding the user by his email
        const user = await User.findOne({ email });
        //checking if he exists and his password matches
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }
        //send message for successfully logging in
        res.json({
            message:"Login successful",
            user:{
                username:user.username,
                email:user.email,
                ballKnowledge: user.ballKnowledge
            }

        })
    }
    catch (error) {
        res.status(500).json({ message: "Login failed" });
    }


})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});