import type { UserDataRepository } from "../types/index.js"


class GoogleDiskUserDataRepository implements UserDataRepository {
  async getUserData(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async setUserData(userData: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}


export {
  GoogleDiskUserDataRepository
}
