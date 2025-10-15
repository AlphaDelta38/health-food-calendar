import { getRepository } from "./implements/index.js";
import { RepositoriesKey, setUserDataProps, UserDataKeys, UserDataRepository } from "./types/index.js";

class UserDataProvider {
  private repository: UserDataRepository;

  constructor(repository: UserDataRepository) {
    this.repository = repository;
  }

  public async initUserData() {
    await this.repository.initUserData();
  }

  public async syncUserData() {
    await this.repository.syncUserData();
  }

  public getUserData(key: UserDataKeys, cursor: string) {
    return this.repository.getUserData(key, cursor);
  }

  public setUserData(data: setUserDataProps) {
    this.repository.setUserData(data);
  }

  public changeRepository(key: RepositoriesKey) {
    this.repository = getRepository(key);
  }
  
}

export default new UserDataProvider(
  getRepository(RepositoriesKey.LOCAL)
);
