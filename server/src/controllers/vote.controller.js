import Vote from '../models/Vote'
import User from "../models/User";

export const getVotes = async (req, res, next) => {
    try {
        const votes = await Vote.find().populate('user', ['id', 'email'])
        res.status(200).json(votes);
    } catch (err) {
        err.status = 500;
        next(err)
    }
}

export const createVote = async (req, res, next) => {
    try {
        const userId = req.userId
        const { question, options, description } = req.body
        if (!question || !options || !description ) {
            res.status(400).json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        } 
        console.log(description)
        const user = await User.findById(userId)
        const newVote = new Vote({
            user,
            question,
            description,
            options: options.map(option => ({ name: option, votes: 0 }))
        })

        console.log(newVote)

        const voteSaved = await newVote.save()
        user.polls.push(voteSaved._id)
        await user.save()

        res.status(200).json(voteSaved)
    } catch (err) {
        err.status = 500;
        next(err)
    }
}

export const getVoteById = async (req, res, next) => {
    try {
        const { voteId } = req.params;
        const vote = await Vote.findById(voteId).populate('user', ['id', 'email'])
        if (!vote) {
            res.status(400).json({message: "Votación no encontrada"})
            throw new Error("Votación no encontrada")
        }

        res.status(200).json(vote);

    } catch (err) {
        err.status = 500;
        next(err)
    }
}

export const deleteVote = async (req, res, next) => {
    try {
        await Vote.findOneAndRemove({ _id: req.params.voteId })
        res.status(200).json({ message: "Votación eliminada"})
    } catch (err) {
        err.status = 500;
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
                res.status(400).json({message: "No se encontro votación"})
                throw new Error("No se encontro votación")
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
                    res.status(400).json({message: "Ya has votado"})
                    throw new Error('Ya has votado');
                }
            }
        } else {
            res.json({message: "No se encontro respuesta"})
        }
    } catch (err) {
        err.status = 500;
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
            res.status(400).json({message: "No se encontro la votación"})
            throw new Error("No se encontro la votación")
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
            }else{
                res.status(400).json({message: "Estado incorrecto"})
                throw new Error("Estado incorrecto")
            }
        }
    }catch(err) {
        err.status = 500;
        next(err)
    }
}

export const getVoteBySearch = async (req,res,next) => {
    try {
        const { searchQuery } = req.query
        console.log(searchQuery)
        const query = new RegExp(searchQuery, 'i')
        console.log("query"+query)
        const votes = await Vote.find({question: query})
        console.log(votes)
        res.status(200).json(votes)
    }catch(err) {
        err.status = 500;
        next(err)
    }
}





