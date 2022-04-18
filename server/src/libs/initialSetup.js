import Role from "../models/Role"

export const createRoles = async () => {

    try {
        //Cuenta si existen documentos
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;

        //Ejecuta todo al mismo tiempo.
        const values = await Promise.all([
            new Role({ name: 'user', prio: 0 }).save(),
            new Role({ name: 'moderator', prio: 1 }).save(),
            new Role({ name: 'admin', prio: 2 }).save()
        ]) //Cuando termine devuelve un value
        console.log(values)
    } catch (error) {
        console.error(error)
    }
}