import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from 'electron';

const POLLING_INTERVAL = 1000; // 1 second
export const pollresource = (mainWindow : BrowserWindow)=> {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = await getRamUsage();
        mainWindow.webContents.send('resource-update', {
            cpuUsage: cpuUsage,
            ramUsage: ramUsage,
            storage: getStorageData()
        });
    }, POLLING_INTERVAL);
}   


export const getStaticData = (): Promise<{
    storage: { total: number; used: number; free: number };
    cpuModel: string;
    cpuCores: number;
    platform: string;
    arch: string;
    hostname: string;
    uptime: number;
}> => {
    return Promise.resolve({
        storage: getStorageData(),
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length,
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        uptime: os.uptime()
    });
}
const getCpuUsage = async (): Promise<number> => {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve);
    });
}

const getRamUsage = async (): Promise<number> => {
    return new Promise((resolve) => {
        resolve(1 - osUtils.freememPercentage());
    });
}


const getStorageData = () : { total: number; used: number; free: number } => {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C:\\' : '/');
    const total = stats.blocks * stats.bsize;
    const free = stats.bavail * stats.bsize;
    const used = total - free;
    return {
        total: total / (1024 * 1024 * 1024), // Convert to GB
        used: used / (1024 * 1024 * 1024), // Convert to GB
        free: free / (1024 * 1024 * 1024) // Convert to GB
    };
}