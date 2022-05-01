import Discussion from '../models/Discussion'
import User from "../models/User";
import DiscussionMessage from '../models/DiscussionMessage';
import DiscussionCategory from '../models/DiscussionCategory';

export const createDiscussion = async (req,res,next) => {
    const userId = req.userId
    const { title, body, category } = req.body;
    console.log(req.body)

    if (!title || !body || !category ) {
        res.json({ message: "Rellena todos los campos" });
        throw new Error('Rellena todos los campos');
    }        
    const user = await User.findById(userId)
    const newDiscussion = Discussion({
        user,
        title,
        body,
        category
    })
    await User.findByIdAndUpdate(userId, { $push: { discussions: newDiscussion._id}})
    newDiscussion.save()
    res.status(201).json(newDiscussion)
}

export const updateDiscussion = async (req,res,next) => {
    const { title, body } = req.body

    const oldDiscussion = await Discussion.findById(req.params.id)
    const uDiscussion = {}   

    if (title == undefined) uDiscussion.title = oldDiscussion.title
    else uDiscussion.title = title
    if (body == undefined) uDiscussion.body = oldDiscussion.body
    else uDiscussion.body = body

    const nDiscussion = await Discussion.findByIdAndUpdate(req.params.id,
        { $set: { title: uDiscussion.title, body: uDiscussion.body } },
        { new: true }) //Nos lo devuelve actulizado
    res.status(200).json(nDiscussion)
}

export const deleteDiscussion = async (req,res,next) => {
    try {
        await Discussion.findOneAndRemove({ _id: req.params.id })
        res.status(200).json()
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const getDiscussionById = async (req,res,next) => {
    const { id } = req.params;
    const discussion = await Discussion.findById(id).populate({path: 'messages', 
                                                                model: "DiscussionMessage", 
                                                                populate: {path:"user", model: "User"}, 
                                                                populate: {path: "response", model: "DiscussionMessage"} // https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs
                                                            })
    if (!discussion) {
        res.json({message: "La discursión no ha sido encontrada"})
        throw new Error("Discussion not found")
    }
    res.status(200).json(discussion);
}

export const getDiscussions = async (req,res,next) => {
    try {
        const discussions = await Discussion.find().populate('messages')
        res.status(200).json(discussions)
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const getDiscussionBySearch = async (req,res,next) => {
    const { searchQuery } = req.query
    console.log(searchQuery)
    const query = new RegExp(searchQuery, 'i') //Antonio ANTONIO => antonio
    console.log("query"+query)
    const discussions = await Discussion.find({title: query})
    console.log(discussions)
    res.status(200).json(discussions)
}

export const addMessage = async (req,res,next) => {
    const userId = req.userId
    const discId = req.params.discId
    const { message, response, user } = req.body

    console.log(discId)
    const newMessage = DiscussionMessage({
        user,
        message, 
        response: response == undefined ? null : response
    })

    console.log(newMessage)
    const nMessage = await newMessage.save()
    
    await Discussion.findByIdAndUpdate(discId, { $push: {messages: newMessage} }).populate('messages')

    await User.findByIdAndUpdate(userId,{ $push: { messages: newMessage._id}})
    console.log(nMessage)
    res.status(200).json(nMessage)
}

export const deleteMessage = async (req,res,next) => {
    try {
        await Discussion.findOneAndUpdate({_id: req.params.discId}, {$pull: { messages: req.params.id}})
        await DiscussionMessage.findOneAndRemove({ _id: req.params.id })
        res.status(200).json()
    }catch(e){
        e.status = 400;
        next(e)
    }
}

export const updateMessage = async (req,res,next) => {
    try {
        const { message } = req.body
        const oldMessage = await DiscussionMessage.findById(req.params.id)
        const uMessage = {}   
        if (message == undefined) uMessage.message = oldMessage.message
        else uMessage.message = message
        const nMessage = await DiscussionMessage.findByIdAndUpdate(req.params.id,
            { $set: { message: uMessage.message} },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(nMessage)
    }catch(e){
        e.status = 400;
        next(e)
    }
}





