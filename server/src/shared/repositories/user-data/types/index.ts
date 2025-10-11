interface UserDataRepository {
  getUserData: () => Promise<any>;
  setUserData: (userData: any) => Promise<void>;
}

enum RepositoriesKey {
  LOCAL = 'local',
  GOOGLE_DISK = 'googleDisk',
}
 
export {
  UserDataRepository,
  RepositoriesKey,
}
