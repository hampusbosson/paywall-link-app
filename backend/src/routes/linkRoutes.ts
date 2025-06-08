import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
  createLink,
  getLinksForUser,
  getLinkById,
} from "../controllers/linkController";

const router = express.Router();

router.post("/create", authenticateToken, createLink);
router.get("/fetch", authenticateToken, getLinksForUser);
router.get("/:id", authenticateToken, getLinkById);

export default router;