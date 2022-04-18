import { Router } from "express";
import * as voteCtrl from "../controllers/vote.controller";
import { authJwt } from "../middlewares";

const router = Router()

router.get('/', voteCtrl.getVotes);
router.post('/', authJwt.verifyToken2 ,voteCtrl.createVote)
router.get('/:voteId', authJwt.verifyToken2, voteCtrl.getVoteById)
router.delete('/:voteId', authJwt.verifyToken2, voteCtrl.deleteVote)
router.put('/:voteId',authJwt.verifyToken2, voteCtrl.vote)
router.put('/changeStatus/:voteId', [authJwt.verifyToken2, authJwt.isAdmin], voteCtrl.changeStatus)



export default router;