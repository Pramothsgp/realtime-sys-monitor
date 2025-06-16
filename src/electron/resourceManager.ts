import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import si from "systeminformation";
import { BrowserWindow } from "electron";
import { getKillHelperPath } from "./utils/pathresolver.js";
import { exec } from "child_process";

const POLLING_INTERVAL = 1000; // 1 second
export const pollresource = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = await getRamUsage();
    mainWindow.webContents.send("resource-update", {
      cpuUsage: cpuUsage,
      ramUsage: ramUsage,
      storage: getStorageData(),
    });
  }, POLLING_INTERVAL);
};

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
    uptime: os.uptime(),
  });
};
const getCpuUsage = async (): Promise<number> => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
};

const getRamUsage = async (): Promise<number> => {
  return new Promise((resolve) => {
    resolve(1 - osUtils.freememPercentage());
  });
};

const getStorageData = (): { total: number; used: number; free: number } => {
  const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
  const total = stats.blocks * stats.bsize;
  const free = stats.bavail * stats.bsize;
  const used = total - free;
  return {
    total: total / (1024 * 1024 * 1024), // Convert to GB
    used: used / (1024 * 1024 * 1024), // Convert to GB
    free: free / (1024 * 1024 * 1024), // Convert to GB
  };
};

async function getProcesses() {
  try {
    const data = await si.processes();
    return { totalProcesses: data.all, processes: data.list };
  } catch (error) {
    console.error("Failed to get processes:", error);
    return { totalProcesses: 0, processes: [] };
  }
}

export const getAllProcesses = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const processes = await getProcesses();
    mainWindow.webContents.send("process-update", processes);
  }, POLLING_INTERVAL);
};

// export const killProcess = (pid: number): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const helperPath = getKillHelperPath();
//     const command = `${helperPath} ${pid}`;
//     console.log("Executing kill-helper from:", helperPath);
//     console.log("Command to execute:", command);
//     sudo.exec(command, { name: "CPU Manager" }, (error, stdout, stderr) => {
//       if (error) {
//         console.error("❌ Failed to execute with sudo:", error);
//         console.error("STDERR:", stderr);
//         reject(stderr || error.message);
//       } else {
//         console.log("✅ kill-helper stdout:", stdout);
//         resolve(stdout?.toString() || "");
//       }
//     });
//   });
// };


export const killProcess = (pid: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const helperPath = getKillHelperPath();
    const command = `pkexec ${helperPath} ${pid}`;
    console.log("🔪 Executing kill-helper with pkexec:", command);

    exec(command, (error, stdout, stderr) => {
        console.log("Callback Executing kill-helper with exec:", command);
      if (error) {
        console.error("❌ pkexec error:", error);
        console.error("STDERR:", stderr);
        reject(stderr || error.message);
      } else {
        console.log("✅ kill-helper output:", stdout);
        resolve(stdout?.toString() || "");
      }
    });
  });
};

