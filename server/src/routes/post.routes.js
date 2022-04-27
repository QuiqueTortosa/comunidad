import { Router } from "express";
import * as postCtrl from "../controllers/post.controller";
import { authJwt, verifyPost } from "../middlewares";

const router = Router()

router.post('/', [authJwt.verifyToken2, authJwt.isModerator,verifyPost.checkDuplicateTitle],postCtrl.createPost)
router.put('/:id',[authJwt.verifyToken2, authJwt.isModerator, verifyPost.checkDuplicateTitle], postCtrl.updatePost)
router.delete('/:id',[authJwt.verifyToken2, authJwt.isModerator], postCtrl.deletePost)
router.get('/find/:id',authJwt.verifyToken2,postCtrl.getPostById)
router.get('/',postCtrl.getPosts)
router.get("/search", authJwt.verifyToken2,postCtrl.getPostBySearch)

router.post('/message/:postId', authJwt.verifyToken2,postCtrl.addMessage)
router.delete('/:postId/message/:id', authJwt.verifyToken2,postCtrl.deleteMessage)
router.put('/message/:id', authJwt.verifyToken2,postCtrl.updateMessage)



export default router;