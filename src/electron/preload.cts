const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback : (statixtics : any) => void) => {
        electron.ipcRenderer.on('resource-update', (event : Event, statistics : any) => {
            callback(statistics);
        });
    },
    getStatistics: () => electron.ipcRenderer.invoke('get-static-data'),
})