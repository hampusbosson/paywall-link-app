import express from "express";
import { analyzeLandingPage } from "../controllers/feedbackController";


const router = express.Router();

router.post('/analyze', analyzeLandingPage);

export default router;