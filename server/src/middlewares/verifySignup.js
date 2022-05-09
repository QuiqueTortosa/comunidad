import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    console.log(req.body.username)
    const user = await User.findOne({ username: req.body.username });
    if (user && user._id != req.params.id)
      return res.status(400).json({ message: "El usuario ya existe" });
    const email = await User.findOne({ email: req.body.email });
    if (email && email._id != req.params.id)
      return res.status(400).json({ message: "El email ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
