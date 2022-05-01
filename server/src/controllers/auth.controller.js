import User from "../models/User";
import jwt from "jsonwebtoken";
import config from '../config'
import Role from "../models/Role";

const maxAge = 24 * 60 * 60;

export const signUp = async (req, res) => {
    const { username, email, password,direccion, telefono, roles } = req.body;

    const newUser = new User({
        username,
        email,
        direccion, 
        telefono,
        password: await User.encryptPassword(password),
    });

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        //Si el usuario no ingresa nada se pone rol user
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    console.log(newUser)

    const savedUser = await newUser.save()

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24h
    })

    res.status(201).json({token})
}

export const signIn = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles") //Roles hace que te de el objeto entero

    console.log(req.body.password)
    //Si ha encontrado usuario compara las contraseñas si no devuelve false
    const passwordCorrect = userFound === null ? false : await User.comparePassword(req.body.password, userFound.password)
    console.log(req.body.password)

    if (!(userFound && passwordCorrect)) {
        return res.status(400).json({ message: "Invalid user or password" });
    }

    const infoToken = {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        roles: userFound.roles,
    }

    const token = jwt.sign(infoToken, config.SECRET, {
        expiresIn: 86400 //24h
    })
    console.log(token)
    
    //await res.cookie("token", token, { httpOnly: false, maxAge: maxAge * 1000 });
    
    res.json({token: token})
}

/*
export const signIn = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles") //Roles hace que te de el objeto entero
    console.log("e"+req.body.email)

    //Si ha encontrado usuario compara las contraseñas si no devuelve false
    const passwordCorrect = userFound === null ? false : await User.comparePassword(req.body.password, userFound.password)

    if (!(userFound && passwordCorrect)) {
        return res.status(400).json({ message: "Invalid user or password" });
    }

    const infoToken = {
        id: userFound._id,
        roles: userFound.roles,
    }

    const token = jwt.sign(infoToken, config.SECRET, {
        expiresIn: 86400 //24h
    })
    
    res.json({token: token, roles: userFound.roles})
}

*/