import { Router } from "express";
import * as postCtrl from "../controllers/post.controller";
import { authJwt } from "../middlewares";

const router = Router()

router.post('/', postCtrl.createPost)
router.put('/:id',postCtrl.updatePost)
router.delete('/:id',postCtrl.deletePost)
router.get('/',postCtrl.getPosts)
router.get("/search", postCtrl.getPostBySearch)

router.post('/message/:postId', postCtrl.addMessage)
router.delete('/:postId/message/:id', postCtrl.deleteMessage)
router.put('/message/:id', postCtrl.updateMessage)



export default router;