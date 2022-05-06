import Post from "../models/Post";

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


  