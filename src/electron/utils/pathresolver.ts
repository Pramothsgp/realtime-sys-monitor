import { app } from "electron"
import path from "path";
import { isDev } from "./util.js";

export const getPreLoadPath = () : string => {
    return path.join(
        app.getAppPath(), isDev() ? './' : '../' ,
        '/dist-electron/preload.cjs'
    );
};

export const getKillHelperPath = (): string => {
  const binaryName = process.platform === 'win32' ? 'kill-helper.exe' : 'kill-helper';

  const basePath = isDev()
    ? path.join(app.getAppPath(), 'public', 'bin')
    : path.join(process.resourcesPath, 'app.asar.unpacked', 'public', 'bin');

  return path.join(basePath, binaryName);
};
