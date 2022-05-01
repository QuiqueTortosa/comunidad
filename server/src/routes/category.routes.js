import { Router } from "express";
import * as categoryCtrl from "../controllers/category.controller";
import { authJwt } from "../middlewares";

const router = Router()

router.post('/' ,categoryCtrl.addCategory)
router.delete('/:id', categoryCtrl.deleteCategory)
router.get('/',categoryCtrl.getCategories)

export default router;