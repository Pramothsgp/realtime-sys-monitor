import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './utils/util.js';
import { getAllProcesses, getStaticData, killProcess, pollresource } from './resourceManager.js';
import { getPreLoadPath } from './utils/pathresolver.js';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'System Monitor',
    resizable: true,
    autoHideMenuBar: true,
    icon: path.join(app.getAppPath(), '../dist-react/assets/icon.ico'),
    webPreferences: {
      preload: getPreLoadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const url = isDev()
    ? 'http://localhost:5173'
    : path.join(app.getAppPath(), '/dist-react/index.html');

  isDev() ? mainWindow.loadURL(url) : mainWindow.loadFile(url);

  pollresource(mainWindow);
  getAllProcesses(mainWindow);

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();

  ipcMain.handle('get-static-data', getStaticData);
  ipcMain.handle('kill-process', (_event, pid: number) => killProcess(pid));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});