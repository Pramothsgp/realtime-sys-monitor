import {app , BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from './utils/util.js';
import { getStaticData, pollresource } from './resourceManager.js';
import { getPreLoadPath } from './utils/pathresolver.js';

type test = string;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreLoadPath()
    }
  });
  if(isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
  pollresource(mainWindow);
  ipcMain.handle('get-static-data', () =>{
    return getStaticData();
  });
});