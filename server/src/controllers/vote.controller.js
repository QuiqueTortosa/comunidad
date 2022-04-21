import Vote from '../models/Vote'
import User from "../models/User";

export const getVotes = async (req, res, next) => {
    try {
        const votes = await Vote.find().populate('user', ['id', 'email'])
        res.status(200).json(votes);
    } catch (err) {
        err.status = 400;
        next(err)
    }
}

export const createVote = async (req, res, next) => {
    try {
        const userId = req.userId
        const { question, options } = req.body
        console.log(options)
        const user = await User.findById(userId)
        const newVote = new Vote({
            user,
            question,
            options: options.map(option => ({ name: option, votes: 0 }))
        })

        console.log(newVote)

        const voteSaved = await newVote.save()
        user.polls.push(voteSaved._id)
        await user.save()

        res.status(201).json(voteSaved)
    } catch (err) {
        err.status = 400;
        next(err)
    }
}

export const getVoteById = async (req, res, next) => {
    try {
        const { voteId } = req.params;
        const vote = await Vote.findById(voteId).populate('user', ['id', 'email'])
        if (!vote) {
            res.json({message: "No votation found"})
            throw new Error("Votation not found")
        }

        res.status(200).json(vote);

    } catch (err) {
        err.status = 400;
        next(err)
    }
}

export const deleteVote = async (req, res, next) => {
    try {
        await Vote.findOneAndRemove({ _id: req.params.voteId })
        res.status(200).json()
    } catch (err) {
        err.status = 400;
        next(err)
    }
}

export const vote = async (req, res, next) => {
    try {
        const { voteId } = req.params;
        const userId = req.userId
        console.log(voteId)
        const { answer } = req.body;
        if(answer) {
            const votation = await Vote.findById(voteId)
            if(!vote) {
                res.json({message: "No votation found"})
                throw new Error("No votation found")
            } else {
                const vote = votation.options.map(
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
                const findUser  = votation.voted.find(user => {
                    return user._id.toString() === userId.toString()
                })
                if(!findUser) {
                    votation.voted.push(userId)
                    votation.options = vote 
                    await votation.save()
                    res.status(200).json(votation)
                }  else {
                    res.json({message: "Already voted"})
                    throw new Error('Already voted');
                }
            }
        } else {
            res.json({message: "No answer provided"})
        }
    } catch (err) {
        err.status = 400;
        next(err)
    }
}

export const changeStatus = async (req,res,next) => {
    try {
        const { voteId } = req.params;
        const { status } = req.body;
        const votation = await Vote.findById(voteId).populate('user', ['id', 'email'])
        console.log(req.body)
        console.log("tipo: "+(typeof status))
        if (!votation) {
            res.json({message: "No votation found"})
            throw new Error("Votation not found")
        }else {
            console.log(votation.status)
            if(Number(status) == 0){
                votation.status = 0
                await votation.save()
                res.status(200).json(votation)
            }else if(Number(status) == 1){
                votation.status = 1
                await votation.save()
                res.status(200).json(votation)
            }else
                throw new Error("Wrong status")
        }
    }catch(err) {
        err.status = 400;
        next(err)
    }
}





