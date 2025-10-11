import { handleError } from "@/shared/utils/error-handler.js";
import { authGoogleDiskCallbackService, authGoogleDiskService } from "@google/services/auth.service.js";
import { Request, Response } from "express";
import { AuthGoogleServiceReq } from "@google/types/services.js";


async function authGoogleDiskController(req: Request, res: Response): Promise<void> {
  try {
    const url = await authGoogleDiskService();
    res.redirect(url);
  } catch (e) {
    const result = handleError(e);
    res.status(result.status).json(result);
  }
}

async function authCallbackController(req: AuthGoogleServiceReq, res: Response): Promise<void> {
  try {
    const { code, state } = req.query;

    await authGoogleDiskCallbackService({code, state});

    res.status(200).json({
      message: "Google disk authentication successful",
    });

  } catch (e) {
    const result = handleError(e);
    res.status(result.status).json(result);
  }
}


export {
  authGoogleDiskController,
  authCallbackController,
}
