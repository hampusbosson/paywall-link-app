import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createLink } from '../controllers/linkController';

const router = express.Router();

router.post("/create", authenticateToken, createLink);

export default router;