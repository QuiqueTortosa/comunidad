import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res, next) => {
    try{
        const { username, email, telefono, direccion, password, roles } = req.body;
        console.log("body:")
        console.log(req.body)
        if (!username || !email || !password || !roles || !direccion || !telefono) {
            res.json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        }
        const newUser = new User({
            username,
            email,
            direccion,
            telefono,
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
    }catch(e){
        e.status = 400;
        next(e)
    }

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

    const { username, email, direccion, telefono, password, roles, selectedFile } = req.body;
    const user = await User.findById(req.params.id)
    const newUpdateUser = {};
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS")
    if (username == undefined) newUpdateUser.username = user.username
    else newUpdateUser.username = username
    if (email == undefined) newUpdateUser.email = user.email
    else newUpdateUser.email = email
    if (direccion == undefined) newUpdateUser.direccion = user.direccion
    else newUpdateUser.direccion = direccion
    if (telefono == undefined) newUpdateUser.telefono = user.telefono
    else newUpdateUser.telefono = telefono
    if (roles == undefined || JSON.stringify(roles).length < 6) newUpdateUser.roles = user.roles
    else newUpdateUser.roles = roles
    if(selectedFile == undefined) newUpdateUser.selectedFile = user.selectedFile
    else newUpdateUser.selectedFile = selectedFile
    if (JSON.stringify(roles).includes("[[")) {
        newUpdateUser.roles = Object.values(roles)[0]
    } 

    if (password == "" || password == undefined) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: { username: newUpdateUser.username, email: newUpdateUser.email, telefono: newUpdateUser.telefono, direccion: newUpdateUser.direccion, roles: newUpdateUser.roles, selectedFile: newUpdateUser.selectedFile } },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(updatedUser)
    } else {
        newUpdateUser.password = await User.encryptPassword(password)
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: { username: newUpdateUser.username, email: newUpdateUser.email, telefono: newUpdateUser.telefono, direccion: newUpdateUser.direccion, password: newUpdateUser.password, roles: newUpdateUser.roles, selectedFile: newUpdateUser.selectedFile } },
            { new: true }) //Nos lo devuelve actulizado
        res.status(200).json(updatedUser)

    }

}

export const changePassword = async (req, res ,next) => {
    try {
        const userFound = await User.findById(req.params.id)
        //console.log(userFound)
        console.log(req.body.newPassword)
        //Si ha encontrado usuario compara las contraseñas si no devuelve false
        const passwordCorrect = userFound === null ? false : await User.comparePassword(req.body.password, userFound.password)
        if(passwordCorrect){
            const updatePassword = await User.encryptPassword(req.body.newPassword)
            console.log(updatePassword)
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: {password: updatePassword}})
            res.status(200).json(updatedUser)
        }else {
            res.json({message: "Las contraseñas no coinciden"})
            throw new Error("Las contraseñas no coinciden")
        }
    }catch(e) {
        e.status = 400;
        next(e)
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