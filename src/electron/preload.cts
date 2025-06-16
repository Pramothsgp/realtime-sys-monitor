import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (stats: any) => void) => {
    ipcRenderer.on('resource-update', (_event, stats) => callback(stats));
  },

  subscribeProcessUpdate: (callback: (processes: any) => void) => {
    ipcRenderer.on('process-update', (_event, processes) => callback(processes));
  },

  getStatistics: (): Promise<any> => ipcRenderer.invoke('get-static-data'),

  killProcess: (pid: number): Promise<any> => ipcRenderer.invoke('kill-process', pid),
});
