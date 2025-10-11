import { RepositoriesKey } from "../types/index.js";
import { LocalUserDataRepository } from "./local.js";
import { GoogleDiskUserDataRepository } from "./google-disk.js";

const repositories = {
  [RepositoriesKey.LOCAL]: LocalUserDataRepository,
  [RepositoriesKey.GOOGLE_DISK]: GoogleDiskUserDataRepository,
}

const getRepository = (key: RepositoriesKey) => {
  return new repositories[key]();
}

export {
  getRepository,
}