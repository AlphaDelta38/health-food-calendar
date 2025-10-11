import { getRepository } from "./implements/index.js";
import { RepositoriesKey, UserDataRepository } from "./types/index.js";

class UserDataProvider {
  private repository: UserDataRepository;

  constructor(repository: UserDataRepository) {
    this.repository = repository;
  }

  public changeRepository(key: RepositoriesKey) {
    this.repository = getRepository(key);
  }
}

export default new UserDataProvider(
  getRepository(RepositoriesKey.LOCAL)
);
