import { Subscript } from "lucide-react";

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback : (statistics : any) => void) => {
        electron.ipcRenderer.on('resource-update', (event : Event, statistics : any) => {
            callback(statistics);
        });
    },
    subscribeProcessUpdate: (callback : (processes : any) => void) => {
        electron.ipcRenderer.on('process-update', (event : Event, processes : any) => {
            callback(processes);
        });
    },
    getStatistics: () => electron.ipcRenderer.invoke('get-static-data'),
})