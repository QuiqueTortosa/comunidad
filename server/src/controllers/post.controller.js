import Post from '../models/Post'
import User from "../models/User";
import PostMessage from '../models/PostMessage';

export const createPost = async (req,res,next) => {
    try {
        const userId = req.userId
        const { title, selectedFile, post } = req.body;
        if (!title || !selectedFile || !post ) {
            res.json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        }        
        const user = await User.findById(userId)
        const newPost = Post({
            user,
            title,
            selectedFile,
            post
        })
        await User.findByIdAndUpdate(userId,
                { $push: { posts: newPost._id}})
        newPost.save()
        res.status(201).json(newPost)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const deletePost = async (req,res,next) => {
    try {
        await Post.findOneAndRemove({ _id: req.params.id })
        res.status(200).json()
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const updatePost = async (req,res,next) => {
    try {
        const { title, selectedFile, post } = req.body

        const oldPost = await Post.findById(req.params.id)
        const uPost = {}   

        if (title == undefined) uPost.title = oldPost.title
        else uPost.title = title
        if (selectedFile == undefined) uPost.selectedFile = oldPost.selectedFile
        else uPost.selectedFile = selectedFile
        if (post == undefined) uPost.post = oldPost.post
        else uPost.post = post

        const nPost = await Post.findByIdAndUpdate(req.params.id,
            { $set: { title: uPost.title, post: uPost.post, selectedFile: uPost.selectedFile } },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(nPost)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const getPosts = async (req,res,next) => {
    try {
        const posts = await Post.find().populate('messages')
        res.status(200).json(posts)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const getPostBySearch = async (req,res,next) => {
    try {
        const { searchQuery } = req.query
        console.log(searchQuery)
        const query = new RegExp(searchQuery, 'i') //Antonio ANTONIO => antonio
        console.log("query"+query)
        const posts = await Post.find({title: query})
        console.log(posts)
        res.status(200).json(posts)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const getPostById = async (req,res,next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate({path: 'messages', model: "PostMessage", populate: {path:"user", model: "User"}})
        if (!post) {
            res.json({message: "No post found"})
            throw new Error("Post not found")
        }
        res.status(200).json(post);
    }catch(e){
        e.status = 400;
        next(e)
    }
}


export const addMessage = async (req, res,next) => {
    try {
        const userId = req.userId
        const postId = req.params.postId
        const { message, response, user } = req.body
    
        console.log(postId)
        const newMessage = PostMessage({
            user,
            message, 
            response: response == undefined ? "" : response
        })
    
        console.log(newMessage)
        const nMessage = await newMessage.save()
        
        await Post.findByIdAndUpdate(postId, { $push: {messages: newMessage} }).populate('messages')
    
        await User.findByIdAndUpdate(userId,{ $push: { messages: newMessage._id}})
        console.log(nMessage)
        res.status(200).json(nMessage)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const deleteMessage = async (req,res,next) => {
    try {
        await Post.findOneAndUpdate({_id: req.params.postId}, {$pull: { messages: req.params.id}})
        await PostMessage.findOneAndRemove({ _id: req.params.id })
        res.status(200).json()
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const updateMessage = async (req,res,next) => {
    try {
        const { message } = req.body

        const oldMessage = await PostMessage.findById(req.params.id)
        const uMessage = {}   
    
        if (message == undefined) uMessage.message = oldMessage.message
        else uMessage.title = message
    
        const nMessage = await PostMessage.findByIdAndUpdate(req.params.id,
            { $set: { message: uMessage.message} },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(nMessage)
    }catch(e){
        e.status = 400;
        next(e)
    }
}
