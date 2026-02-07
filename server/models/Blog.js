const mongoose = require('mongoose');
const blogSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
author:{
    type:String,
    required:true,
},
category: { 
        type: String,
        required: false,
    },
date:{
    type:Date,
    default:Date.now,
}
});
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;