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
            return response.status(401).json({ message: 'Token no valido' })
        }

        const { id: userId } = decodedToken //En el token tenemos guardado el id
        req.userId = userId //Asignamos al parametro req.userId a userId
        console.log("usuario2 " + req.userId)
        next()
    } catch (err) {
        return res.status(403).json({ message: "No autorizado" })
    }
}

export const checkDuplicatedUser = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) 
        return res.status(400).json({ message: "El usuario ya existe, prueba con otro usuario" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

export const checkDuplicatedEmail = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.email });
      if (user) 
        return res.status(400).json({ message: "El usuario ya existe, prueba con otro email" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

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

export const isSuperiorRoleOrSameUser = async (req, res, next) => {

    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    console.log("token: ")
    console.log(authorization)
    const decodedToken = jwt.verify(token, config.SECRET)
    const { id: userId } = decodedToken //En el token tenemos guardado el id
    req.userId = userId //Asignamos al parametro req.userId a userId

    const currentUser = await User.findById(decodedToken.id, { password: 0 }).populate('roles') //Pssword 0 para no utilizar la contraseña
    const modifyUser = await User.findById(req.params.id).populate('roles')
    const array = currentUser.roles.sort()
    console.log(array)
    console.log(modifyUser.roles.sort())
    if (!token || !decodedToken.id || !currentUser) {
        return response.status(401).json({ error: 'Token no valido' })
    }

    if(currentUser.roles.sort()[currentUser.roles.length-1] != 0 && (currentUser.roles.sort()[currentUser.roles.length-1].prio > modifyUser.roles.sort()[modifyUser.roles.length-1].prio || currentUser.email == modifyUser.email)){
        next()
    }else if(currentUser.roles.sort()[currentUser.roles.length-1] == 0 && currentUser.email == modifyUser.email) {
        next()
    }else if(currentUser.roles[currentUser.roles.length-1].prio == 0 && currentUser.email != modifyUser.email){
        return res.status(403).json({ message: "No puedes actualizar otros usuarios" })
    }
    else {
        return res.status(403).json({ message: "Necesitas un rol mayor" })
    }
}