import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User"
import Role from "../models/Role"

export const verifyToken2 = async (req, res, next) => {
    try {
        const authorization = req.get('authorization')
        let token = ''

        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7)
        }

        const decodedToken = jwt.verify(token, config.SECRET)
        const user = await User.findById(decodedToken.id, { password: 0 }) //Pssword 0 para no utilizar la contraseña

        if (!token || !decodedToken.id || !user) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const { id: userId } = decodedToken //En el token tenemos guardado el id
        req.userId = userId //Asignamos al parametro req.userId a userId
        console.log("usuario2 " + req.userId)
        next()
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export const isModerator = async (req, res, next) => {
    //Se podria comprobar si existe el usuario primero
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
            next() //Sin esto no acaba la ejecucion de la peticion http
            return;
        }
    }
    console.log(roles)
    return res.status(403).json({ message: "Requieres rol de Moderador" })
}

export const isAdmin = async (req, res, next) => {
    //Se podria comprobar si existe el usuario primero
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next() //Sin esto no acaba la ejecucion de la peticion http
            return;
        }
    }
    console.log(roles)
    return res.status(403).json({ message: "Requieres rol de Administrador" })
}

export const isSuperiorRole = async (req, res, next) => {

    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }
    console.log("token: ")
    console.log(authorization)
    const decodedToken = jwt.verify(token, config.SECRET)
    const currentUser = await User.findById(decodedToken.id, { password: 0 }).populate('roles') //Pssword 0 para no utilizar la contraseña
    const modifyUser = await User.findById(req.params.id).populate('roles')
    if (!token || !decodedToken.id || !currentUser) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    let maxPrioCurrentUser = 0, maxPrioModifyUser = 0
    
    for (let i = 0; i < currentUser.roles.length; i++) {
        if (currentUser.roles[i].prio > maxPrioCurrentUser)
        maxPrioCurrentUser = currentUser.roles[i].prio
    }

    for (let i = 0; i < modifyUser.roles.length; i++) {
        if (modifyUser.roles[i].prio > maxPrioModifyUser)
        maxPrioModifyUser = modifyUser.roles[i].prio
        
    }
    console.log(maxPrioCurrentUser)
    console.log(maxPrioModifyUser)
    if(maxPrioCurrentUser => maxPrioModifyUser){
        next()
    }else if(maxPrioCurrentUser == 0 && currentUser.email != modifyUser.email){
        return res.status(403).json({ message: "No puedes actualizar otros usuarios" })
    }
    else {
        return res.status(403).json({ message: "Necesitas un rol mayor" })
    }
}