import type { 
  GetEntityPageReturn,
  ReturnItemsMap, 
  SearchCacheType, 
  SetUserDataProps, 
  UserDataKeys,
  UserDataMap, 
  UserDataRepository 
} from "../types/index.js"


class GoogleDiskUserDataRepository implements UserDataRepository {
  getUserData<K extends UserDataKeys>(key: K, cursor: string): Promise<UserDataMap[K]> {
    throw new Error("Method not implemented.");
  }

  setUserData(data: SetUserDataProps<any>): void {
    throw new Error("Method not implemented.");
  }

  initUserData(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  syncUserData(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  searchEntity<K extends keyof SearchCacheType>(key: K, search: string): Promise<ReturnItemsMap[K]> {
    throw new Error("Method not implemented.");
  }

  getEntityPage<K extends UserDataKeys>(key: K, page: number, pageSize: number): Promise<GetEntityPageReturn<K>> {
    throw new Error("Method not implemented.");
  }
}


export {
  GoogleDiskUserDataRepository
}
