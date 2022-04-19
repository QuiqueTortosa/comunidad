import Post from '../models/Post'
import User from "../models/User";
import PostMessage from '../models/PostMessage';

export const createPost = async (req,res,next) => {
    const userId = req.userId
    const { title, selectedFile, post } = req.body;
    console.log(post)
    const user = await User.findById("625ef3fb138cb8122057ab5e")

    const newPost = Post({
        user,
        title,
        selectedFile,
        post
    })
    await User.findByIdAndUpdate("625ef3fb138cb8122057ab5e",
            { $push: { posts: newPost._id}})
    newPost.save()
    res.status(201).json(newPost)
}

export const deletePost = async (req,res,next) => {
    await Post.findOneAndRemove({ _id: req.params.id })
    res.status(200).json()
}

export const updatePost = async (req,res,next) => {
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
}

export const getPosts = async (req,res,next) => {
    const posts = await Post.find().populate('messages')
    res.status(200).json(posts)
}

export const getPostBySearch = async (req,res,next) => {
    const { searchQuery } = req.query
    console.log(searchQuery)
    const query = new RegExp(searchQuery, 'i') //Antonio ANTONIO => antonio
    console.log("query"+query)
    const posts = await Post.find({title: query})
    console.log(posts)
    res.status(200).json(posts)
}


export const addMessage = async (req, res,next) => {
    //const userId = req.userId
    const postId = req.params.id
    const { message, response, email } = req.body

    console.log(postId)
    const newMessage = PostMessage({
        email,
        message, 
        response: response == undefined ? "" : response
    })

    console.log(newMessage)
    await newMessage.save()
    
    const nPost = await Post.findByIdAndUpdate(postId, { $push: {messages: newMessage} }).populate('messages')

    await User.findByIdAndUpdate("625ef3fb138cb8122057ab5e",{ $push: { messages: newMessage._id}})
    console.log(nPost)

    res.status(200).json(nPost)

}

export const deleteMessage = async (req,res,next) => {
    console.log(req.params.postId)
    console.log(req.params.id)
    await Post.findOneAndUpdate({_id: req.params.postId}, {$pull: { messages: req.params.id}})
    await PostMessage.findOneAndRemove({ _id: req.params.id })
    res.status(200).json()
}

export const updateMessage = async (req,res,next) => {
    const { message } = req.body

    const oldMessage = await PostMessage.findById(req.params.id)
    const uMessage = {}   

    if (message == undefined) uMessage.message = oldMessage.message
    else uMessage.title = message

    const nMessage = await PostMessage.findByIdAndUpdate(req.params.id,
        { $set: { message: uMessage.message} },
        { new: true }) //Nos lo devuelve actulizado
    res.status(200).json(nMessage)
}
