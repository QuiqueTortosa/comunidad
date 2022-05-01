import { Router } from "express";
import * as forumCtrl from "../controllers/forum.controller";
import { authJwt } from "../middlewares";

const router = Router()

router.post('/' ,forumCtrl.createDiscussion)
router.put('/:id', forumCtrl.updateDiscussion)
router.delete('/:id', forumCtrl.deleteDiscussion)
router.get('/find/:id', forumCtrl.getDiscussionById)
router.get('/',forumCtrl.getDiscussions)
router.get("/search", forumCtrl.getDiscussionBySearch)

router.post('/message/:discId',forumCtrl.addMessage)
router.delete('/:discId/message/:id', forumCtrl.deleteMessage)
router.put('/message/:id', forumCtrl.updateMessage)

export default router;