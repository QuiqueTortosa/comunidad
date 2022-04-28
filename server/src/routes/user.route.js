import { Router } from "express";
import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

const router = Router()

router.post(
  "/",
  [authJwt.verifyToken2, authJwt.isModerator, verifySignup.checkRolesExisted, verifySignup.checkDuplicateUsernameOrEmail],
  usersCtrl.createUser
);

router.delete("/:id", [authJwt.verifyToken2, authJwt.isModerator], usersCtrl.deleteUser)

router.put("/user/:id", [authJwt.isSuperiorRoleOrSameUser], usersCtrl.updateUser)

router.put("/changePassword/:id", [authJwt.isSuperiorRoleOrSameUser], usersCtrl.changePassword)

router.get("/",usersCtrl.getUsers)

router.get("/find/:id", authJwt.verifyToken2,usersCtrl.getUserById)

router.get("/search",authJwt.verifyToken2, usersCtrl.getUsersBySearch)


export default router;