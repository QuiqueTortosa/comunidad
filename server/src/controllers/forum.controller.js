import Discussion from '../models/Discussion'
import User from "../models/User";
import DiscussionMessage from '../models/DiscussionMessage';
import DiscussionCategory from '../models/DiscussionCategory';

export const createDiscussion = async (req,res,next) => {
    try {
        const userId = req.userId
        const { title, body, category, poll } = req.body;

        if (!title || !body || !category ) {
            res.status(200).json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        }        


        console.log(poll)
        const user = await User.findById(userId)
        let newDiscussion;
        if(poll.options[0].length != 0){
            newDiscussion = Discussion({
                user,
                title,
                body,
                category,
                poll: {
                    question: (poll.question),
                    options: poll.options.map(option => ({ name: option, votes: 0 }))
                }
            })
            await User.findByIdAndUpdate(userId, { $push: { discussions: newDiscussion._id}})
        }else {
            newDiscussion = Discussion({
                user,
                title,
                body,
                category,
                poll: null
            })
            await User.findByIdAndUpdate(userId, { $push: { discussions: newDiscussion._id}})
        }
        newDiscussion.save()
        res.status(200).json(newDiscussion)
    }catch(err){
        err.status = 500;
        next(err)
    }
}

export const updateDiscussion = async (req,res,next) => {
    try {
        const { title, body, category, poll } = req.body

        const oldDiscussion = await Discussion.findById(req.params.id)
        const uDiscussion = {}   
        if (title == undefined) uDiscussion.title = oldDiscussion.title
        else uDiscussion.title = title
        if (body == undefined) uDiscussion.body = oldDiscussion.body
        else uDiscussion.body = body
        if (category == undefined) uDiscussion.category = oldDiscussion.category
        else uDiscussion.category = category
        if (poll.options[0].length == 0) uDiscussion.poll = oldDiscussion.poll
        else {
            uDiscussion.poll = {
                question: (poll.question),
                options: poll.options.map(option => ({ name: option, votes: 0 }))
            }
        }
        if(oldDiscussion.poll.options.length != 0 && poll.options[0].length != 0) {
            res.status(400).json({message: "La discusión ya tiene una votación"})
            throw new Error("La discusión ya tiene una votación")
        } else {
            console.log(poll)
            const nDiscussion = await Discussion.findByIdAndUpdate(req.params.id,
                { $set: { title: uDiscussion.title, body: uDiscussion.body, category: uDiscussion.category, poll: uDiscussion.poll } },
                { new: true }) //Nos lo devuelve actulizado
            res.status(200).json(nDiscussion)
        }
    }catch(err){
        err.status = 500;
        next(err)
    }
}

export const voteDisc = async (req,res,next) => {
    try {
        const { id } = req.params;
        const userId = req.userId
        console.log(req.params)
        const { answer } = req.body;
        if(answer) {
            const disc = await Discussion.findById(id)
            if(!disc) {
                res.status(400).json({message: "No se ha encontrado discusión"})
                throw new Error("No se ha encontrado discusión")
            } else if(JSON.stringify(disc.poll.options[0]).length < 5){
                res.status(400).json({message: "La discusión no tiene votación"})
                throw new Error("La discusión no tiene votación")
            }else {
                const vote = disc.poll.options.map(
                    option => {
                        if(option.name.toString() === answer.toString()){
                            return {
                                _id: option._id,
                                name: option.name,
                                votes: option.votes + 1
                            }
                        }else {
                            return option
                        }
                    }
                )
                const findUser  = disc.poll.voted.find(user => {
                    return user._id.toString() === userId.toString()
                })
                if(!findUser) {
                    disc.poll.voted.push(userId)
                    disc.poll.options = vote 
                    await disc.save()
                    res.status(200).json(disc)
                }  else {
                    res.status(400).json({message: "Ya has votado"})
                    throw new Error('Ya has votado');
                }
            }
        } else {
            res.status(400).json({message: "No se ha proporcionado una respuesta"})
        }
    }catch(e){
        e.status = 500;
        next(e)
    }
}

export const deleteDiscussion = async (req,res,next) => {
    try {
        await Discussion.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "Discusión eliminada"})
    }catch(e){
        e.status = 500;
        next(e)
    }
}

export const getDiscussionById = async (req,res,next) => {
    try {
        const { id } = req.params;
        const discussion = await Discussion.findById(id).populate({
                                                            path: 'messages',
                                                            populate: { path: 'user' },
                                                            populate: { path: 'response' }
                                                        }).populate({
                                                            path: 'messages',
                                                            populate: { 
                                                                path: 'user', 
                                                                    populate: {
                                                                        path: 'roles'
                                                                    }
                                                            }                                                            
                                                        }).populate({
                                                            path: 'messages',
                                                            populate: { 
                                                                path: 'response', 
                                                                    populate: {
                                                                        path: 'user',
                                                                        select: 'username'
                                                                    }
                                                            }                                                            
                                                        })
        if (!discussion) {
            res.json({message: "La discursión no ha sido encontrada"})
            throw new Error("Discussion not found")
        }
        res.status(200).json(discussion);
    }catch(err){
        err.status = 500;
        next(err)
    }
}

export const getDiscussions = async (req,res,next) => {
    try {
        const discussions = await Discussion.find().populate({
                                                        path: 'messages',
                                                        populate: { path: 'user' },
                                                        populate: { path: 'response' }
                                                    }).populate({
                                                        path: 'messages',
                                                        populate: { path: 'user' }                                                            
                                                    }).populate({
                                                        path: 'user',
                                                        populate: { path: 'roles' }                                                            
                                                    })
    res.status(200).json(discussions.reverse())
    }catch(e){
        e.status = 500;
        next(e)
    }
}

export const getDiscussionBySearch = async (req,res,next) => {
    try {
        const { searchQuery } = req.query
        const query = new RegExp(searchQuery, 'i') //Antonio ANTONIO => antonio
        const discussions = await Discussion.find({title: query})
        res.status(200).json(discussions)
    }catch(err){
        err.status = 500;
        next(err)
    }
}

export const addMessage = async (req,res,next) => {
    try {
        const userId = req.userId
        const discId = req.params.discId
        const { message, response, user } = req.body

        const newMessage = DiscussionMessage({
            user,
            message, 
            response: response == undefined ? null : response
        })

        const nMessage = await newMessage.save()
        
        await Discussion.findByIdAndUpdate(discId, { $push: {messages: newMessage} }).populate('messages')

        await User.findByIdAndUpdate(userId,{ $push: { forumMessages: newMessage._id}})
        res.status(200).json(nMessage)
    }catch(err){
        err.status = 400;
        next(err)
    }
}

export const deleteMessage = async (req,res,next) => {
    try {
        await Discussion.findOneAndUpdate({_id: req.params.discId}, {$pull: { messages: req.params.id}})
        await DiscussionMessage.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "Mensaje eliminado"})
    }catch(e){
        e.status = 500;
        next(e)
    }
}

export const updateMessage = async (req,res,next) => {
    try {
        const { message } = req.body
        const oldMessage = await DiscussionMessage.findById(req.params.id).populate('user')
        const uMessage = {} 
        if (message == undefined) uMessage.message = oldMessage.message
        else uMessage.message = message
        const nMessage = await DiscussionMessage.findByIdAndUpdate(req.params.id,
            { $set: { message: uMessage.message} },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(nMessage)
    }catch(e){
        e.status = 500;
        next(e)
    }
}





