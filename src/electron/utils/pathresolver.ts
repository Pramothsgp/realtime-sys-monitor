import { app } from "electron"
import path from "path";
import { isDev } from "./util.js";

export const getPreLoadPath = () : string => {
    return path.join(
        app.getAppPath(), isDev() ? './' : '../' ,
        '/dist-electron/preload.cjs'
    );
};