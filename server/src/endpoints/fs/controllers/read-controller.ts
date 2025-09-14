import { Request, Response } from "express";
import { getDataFile } from "@/endpoints/fs/services/read-service.js";

type reqQueryFile = Request<{}, {}, {}, { name: string }>;

async function getDataFileController(req: reqQueryFile, res: Response) {
  try {
    const { name } = req.query;

    const data = await getDataFile(name);
    
    if (!data) {
      res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
}

export {
  getDataFileController,
}
