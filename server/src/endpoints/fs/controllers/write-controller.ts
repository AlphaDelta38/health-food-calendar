import { Response, Request } from "express";
import { writeDataToFile } from "@/endpoints/fs/services/write-service.js";

type reqBodyFile = Request<{}, {}, { name: string, json: string }>;

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
  writeDataToFileController
}
