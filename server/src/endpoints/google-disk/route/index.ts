import { Router } from "express";
import { authCallbackController, authGoogleDiskController } from "@google/controllers/auth-controller.js";


const router = Router();


router.get("/auth", authGoogleDiskController);
router.get("/auth/callback", authCallbackController);

export default router;
