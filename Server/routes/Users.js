import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, update } from '../controllers/User.js';
import { varifyToken } from '../varifyToken.js';

const router = express.Router();

router.put("/:id",varifyToken , update )


router.delete("/:id",varifyToken, deleteUser )


router.get("/find/:id", getUser )


router.put("/sub/:id",varifyToken, subscribe )


router.put("/unsub/:id",varifyToken, unSubscribe )


router.put("/like/:videoId",varifyToken, like )


router.put("/dislike/:videoId",varifyToken, dislike )

export default router;