import DiscussionCategory from '../models/DiscussionCategory';


export const addCategory = async (req,res,next) => {
    try {
        const { name } = req.body;
        console.log(req.body)
        if (!name) {
            res.json({ message: "Rellena todos los campos" });
            throw new Error('Rellena todos los campos');
        }        
        const newDiscussionCategory = DiscussionCategory({
            name
        })
        
        newDiscussionCategory.save()

        res.status(200).json(newDiscussionCategory)
    }catch(e) {
        e.status = 500;
        next(e)
    }
}

export const deleteCategory = async (req,res,next) => {
    try {
        try {
            await DiscussionCategory.findOneAndRemove({ _id: req.params.id })
            res.status(200).json({ message: "Categoria eliminada"})
        }catch(e){
            e.status = 400;
            next(e)
        }
    }catch(e) {
        e.status = 500;
        next(e)
    }
}

export const getCategories = async (req,res,next) => {
    try {
        const categories = await DiscussionCategory.find()
        res.status(200).json(categories)
    }catch(e){
        e.status = 500;
        next(e)
    }
}