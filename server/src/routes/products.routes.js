import { Router } from "express";
import { getProductById, createProduct, getProducts, updateProductById, deleteProductById } from '../controllers/products.controller';
import { authJwt } from "../middlewares"

const router = Router()

router.get('/', getProducts)
router.post('/', [authJwt.verifyToken2, authJwt.isModerator], createProduct)
router.get('/:productId', getProductById)
router.put('/:productId', [authJwt.verifyToken2, authJwt.isAdmin], updateProductById)
router.delete('/:productId', [authJwt.verifyToken2, authJwt.isAdmin], deleteProductById)



 
 export default router;