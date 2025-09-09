import { Request, Response } from "express";
import { getDataFile, writeDataToFile } from "../../service/fs/index.js";

type reqQueryFile = Request<{}, {}, {}, { name: string }>;
type reqBodyFile = Request<{}, {}, { name: string, json: string }>;

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

async function writeDataToFileController(req: reqBodyFile, res: Response) {
  try {
    const { name, json } = req.body;

    const data = await writeDataToFile(name, json);

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
}

export {
  getDataFileController,
  writeDataToFileController
}
