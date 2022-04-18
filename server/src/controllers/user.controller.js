import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {

        const { username, email, password, roles } = req.body;
        console.log("body:")
        console.log(req.body)
        if (!username || !email || !password || !roles) {
            res.status(500).json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        }
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            //Si el usuario no ingresa nada se pone rol user
            const role = await Role.findOne({ name: "user" })
            newUser.roles = [role._id];
        }

        console.log(newUser)

        const savedUser = await newUser.save()

        res.status(201).json(savedUser)

}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findOneAndRemove({ _id: req.params.id })
        res.status(200).json()
    } catch (err) {
        res.status(500).json({ message: err });
        next(err)
    }
}

export const updateUser = async (req, res, next) => {

    const { username, email, password, roles, selectedFile } = req.body;
    const user = await User.findById(req.params.id)
    const newUpdateUser = {};

    if (username == undefined) newUpdateUser.username = user.username
    else newUpdateUser.username = username
    if (email == undefined) newUpdateUser.email = user.email
    else newUpdateUser.email = email
    if (roles == undefined) newUpdateUser.roles = user.roles
    newUpdateUser.roles = roles
    if(selectedFile == undefined) newUpdateUser.selectedFile = user.selectedFile
    else newUpdateUser.selectedFile = selectedFile

    if (JSON.stringify(roles).includes("[[")) {
        newUpdateUser.roles = Object.values(roles)[0]
    } 
    console.log(email)
    if (password == undefined) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: { username: newUpdateUser.username, email: newUpdateUser.email, roles: newUpdateUser.roles, selectedFile: newUpdateUser.selectedFile } },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(updatedUser)
    } else {
        newUpdateUser.password = await User.encryptPassword(password)
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: { username: newUpdateUser.username, email: newUpdateUser.email, password: newUpdateUser.password, roles: newUpdateUser.roles, polls: user.polls, selectedFile: newUpdateUser.selectedFile } },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(updatedUser)

    }

}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('roles')
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err });
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('roles')


        if (!user) {
            res.json({ message: "User not found" })
            throw new Error("User not found")
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err });
        next(err)
    }
}

export const getUsersBySearch = async (req,res,next) => {
    try {
        const { searchQuery } = req.query
        console.log(searchQuery)
        const nombre = new RegExp(searchQuery, 'i') //Antonio ANTONIO => antonio
        console.log(nombre)
        const users = await User.find({ $or: [{username: nombre, email: nombre}]})
        console.log(users.username)
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({ message: err });
        next(err)
    }
}