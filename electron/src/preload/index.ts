import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getServerTime: () => ipcRenderer.invoke('get-server-time')
});
