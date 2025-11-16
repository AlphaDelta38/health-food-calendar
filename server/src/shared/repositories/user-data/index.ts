import { getRepository } from "./implements/index.js";
import { 
  GetEntityPageReturn,
  RepositoriesKey, 
  ReturnItemsMap, 
  SearchCacheType, 
  SetUserDataProps, 
  UserDataKeys, 
  UserDataMap, 
  UserDataRepository } from "./types/index.js";

class UserDataProvider {
  private repository: UserDataRepository;

  constructor(repository: UserDataRepository) {
    this.repository = repository;
  }

  public async initUserData() {
    await this.repository.initUserData();
  }

  public async syncUserData(key: UserDataKeys) {
    await this.repository.syncUserData(key);
  }

  public async getUserData<K extends UserDataKeys>(key: K, cursor: string): Promise<UserDataMap[K]> {
    return this.repository.getUserData(key, cursor);
  }

  public async setUserData<K extends UserDataKeys>(data: SetUserDataProps<K>, isNew?: boolean) {
    return this.repository.setUserData(data, isNew);
  }

  public async searchEntity<K extends keyof SearchCacheType>(key: K, search: string): Promise<ReturnItemsMap[K]> {
    return this.repository.searchEntity(key, search);
  }

  public async getEntityPage<K extends UserDataKeys>(key: K, page: number, pageSize: number): Promise<GetEntityPageReturn<K>> {
    return this.repository.getEntityPage<K>(key, page, pageSize);
  }
  
  public changeRepository(key: RepositoriesKey) {
    this.repository = getRepository(key);
  }
  
}

export default new UserDataProvider(
  getRepository(RepositoriesKey.LOCAL)
);
