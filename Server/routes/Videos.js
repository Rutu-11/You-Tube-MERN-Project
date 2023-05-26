import express from "express";
import { addVideo, addView, random, subscribes, trends, updateVideo } from "../controllers/Video.js";
import { varifyToken } from "../varifyToken.js";
import { subscribe } from "../controllers/User.js";
const router = express.Router();

router.post("/",varifyToken, addVideo);
router.put("/:id",varifyToken, updateVideo);
router.delete("/:id",varifyToken, addVideo);
router.get("/find/:id",varifyToken, addVideo);
router.put("/view/:id", addView)
// router.get("/trends", trends)
router.get("/random", random)
router.get("/sub", subscribes)
export default router;