import { Router } from "express";
import * as categoryCtrl from "../controllers/category.controller";
import { authJwt, verifyCategory } from "../middlewares";

const router = Router()

router.post('/' ,[authJwt.verifyToken2, verifyCategory.checkDuplicateCategoryName, authJwt.isAdmin],categoryCtrl.addCategory)
router.delete('/:id',[authJwt.verifyToken2, authJwt.isAdmin], categoryCtrl.deleteCategory)
router.get('/',categoryCtrl.getCategories)

export default router;