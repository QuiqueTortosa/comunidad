import { Router } from "express";
import * as forumCtrl from "../controllers/forum.controller";
import { authJwt, verifyForum } from "../middlewares";
const router = Router()

router.post('/' ,[authJwt.verifyToken2, authJwt.isModerator, verifyForum.checkDuplicateDiscTitle],forumCtrl.createDiscussion)
router.put('/disc/:id', [authJwt.verifyToken2, authJwt.isModerator,verifyForum.checkDuplicateDiscTitle], forumCtrl.updateDiscussion)
router.put('/vote/:id', authJwt.verifyToken2, forumCtrl.voteDisc)
router.delete('/:id', [authJwt.verifyToken2,  authJwt.isAdmin],forumCtrl.deleteDiscussion)
router.get('/find/:id', authJwt.verifyToken2,forumCtrl.getDiscussionById)
router.get('/',forumCtrl.getDiscussions)
router.get("/search", authJwt.verifyToken2,forumCtrl.getDiscussionBySearch)

router.post('/message/:discId',authJwt.verifyToken2,forumCtrl.addMessage)
router.delete('/:discId/message/:id', [authJwt.verifyToken2],forumCtrl.deleteMessage)
router.put('/message/:id', [verifyForum.isModOrAdminOrSameUser],forumCtrl.updateMessage)

export default router;