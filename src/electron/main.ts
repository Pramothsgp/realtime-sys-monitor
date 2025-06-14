import {app , BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from './utils/util.js';
import { getAllProcesses, getStaticData, pollresource } from './resourceManager.js';
import { getPreLoadPath } from './utils/pathresolver.js';

type test = string;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    title: 'System Monitor',
    resizable: true,
    autoHideMenuBar: true,
    icon: path.join(app.getAppPath(), '../dist-react/assets/icon.ico'),
    webPreferences: {
      preload: getPreLoadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });
  if(isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
  pollresource(mainWindow);
  getAllProcesses(mainWindow);
  ipcMain.handle('get-static-data', () =>{
    return getStaticData();
  });
});