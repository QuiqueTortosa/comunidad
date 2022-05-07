import Discussion from "../models/Discussion";
import DiscussionMessage from "../models/DiscussionMessage";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const checkDuplicateDiscTitle = async (req, res, next) => {
    try {
      const disc = await Discussion.findOne({ title: req.body.title });
      if (disc && req.params.id != disc._id) 
        return res.status(400).json({ message: "La discusión ya existe, prueba con otro título" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
};


export const isModOrAdminOrSameUser = async (req, res, next) => {

  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, config.SECRET)
  const { id: userId } = decodedToken //En el token tenemos guardado el id
  req.userId = userId //Asignamos al parametro req.userId a userId

  const currentUser = await User.findById(decodedToken.id, { password: 0 }).populate('roles') //Pssword 0 para no utilizar la contraseña
  const modifyMessage = await DiscussionMessage.findById(req.params.id).populate('roles').populate('user')

  if (!token || !decodedToken.id || !currentUser) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }

  if(modifyMessage.user){
    if(currentUser.email == modifyMessage.user.email || currentUser.roles.find(r => r.name == "admin" || r.name == "moderator")){
      next()
    }else {
      return res.status(403).json({ message: "Necesitas un rol mayor" })
  }
  }else {
    if(currentUser.roles.find(r => r.name == "admin" || r.name == "moderator")){
      next()
    }else {
      return res.status(403).json({ message: "Necesitas un rol mayor" })
    }
  }
}