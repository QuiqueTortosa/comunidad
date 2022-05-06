import DiscussionCategory from "../models/DiscussionCategory";

export const checkDuplicateCategoryName = async (req, res, next) => {
    try {
      const category = await DiscussionCategory.findOne({ name: req.body.name });
      if (category && req.params.id != category._id) 
        return res.status(400).json({ message: "La categoría ya existe, prueba con otro nombre" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };