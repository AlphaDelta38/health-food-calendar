import { CustomError } from "../../../utils/error-handler.js";

const getCursorFormId = (id: string) => {
  const cursor = id.split("_")[1];
  
  if (cursor.match(/\d+-\d+/)) {
    return cursor;
  } else {
    throw new CustomError("Invalid cursor", { status: 400 });
  }

}

export {
  getCursorFormId,
}
