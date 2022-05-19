import Post from "../models/Post";
import PostMessage from "../models/PostMessage"
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const checkDuplicateTitle = async (req, res, next) => {
  try {
    const post = await Post.findOne({ title: req.body.title });
    if (post && req.params.id != post._id)
      return res.status(400).json({ message: "La noticia ya existe, prueba con otro título" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const isModOrAdminOrSameUser = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, config.SECRET)
    const { id: userId } = decodedToken //En el token tenemos guardado el id
    req.userId = userId //Asignamos al parametro req.userId a userId

    const currentUser = await User.findById(decodedToken.id, { password: 0 }).populate('roles') //Pssword 0 para no utilizar la contraseña
    const modifyMessage = await PostMessage.findById(req.params.id).populate('roles').populate('user')

    if (!token || !decodedToken.id || !currentUser) {
      return response.status(401).json({ error: 'Token no valido' })
    }

    if (modifyMessage.user) {
      if (currentUser.email == modifyMessage.user.email || currentUser.roles.find(r => r.name == "admin" || r.name == "moderator")) {
        next()
      } else {
        return res.status(403).json({ message: "Necesitas un rol mayor" })
      }
    } else {
      if (currentUser.roles.find(r => r.name == "admin" || r.name == "moderator")) {
        next()
      } else {
        return res.status(403).json({ message: "Necesitas un rol mayor" })
      }
    }
  } catch (err) {
    return res.status(403).json({ message: "No autorizado" })
  }
}


