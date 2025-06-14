import React, { useEffect } from 'react';
import { Cpu, HardDrive, Monitor } from 'lucide-react';

interface SystemInfo {
  storage: {
    total: number;
    used: number;
    free: number;
  };
  cpuModel: string;
  cpuCores: number;
  platform: string;
  arch: string;
  hostname: string;
  uptime: number;
}

const InfoCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="p-5 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800/40 dark:to-gray-700/40 border border-gray-200 dark:border-gray-600 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</p>
      <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
    <div className="text-gray-500 dark:text-gray-300">{icon}</div>
  </div>
);

const SystemDetails = () => {
    const [systemData, setSystemData] = React.useState<SystemInfo | null>(null);
    useEffect(() => {
        const fetchSystemInfo = async () => {
            //@ts-ignore
            window.electron.getStatistics().then((data: SystemInfo) => {
                setSystemData(data);
            }).catch((error: Error) => {
                console.error('Error fetching system info:', error);
            });
        };
        fetchSystemInfo();
    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <InfoCard label="CPU Model" value={systemData?.cpuModel ?? "N/A"} icon={<Cpu className="w-6 h-6" />} />
      <InfoCard label="CPU Cores" value={`${systemData?.cpuCores}`} icon={<Cpu className="w-6 h-6" />} />
      <InfoCard label="Platform" value={systemData?.platform ?? "N/A"} icon={<Monitor className="w-6 h-6" />} />
      <InfoCard label="Architecture" value={systemData?.arch ?? "N/A"} icon={<Monitor className="w-6 h-6" />} />
      <InfoCard label="Hostname" value={systemData?.hostname ?? "Guestn"} icon={<Monitor className="w-6 h-6" />} />
      <InfoCard label="Uptime" value={`${Math.round(systemData?.uptime ?? 0)} sec`} icon={<Monitor className="w-6 h-6" />} />
      <InfoCard label="Storage Total" value={`${systemData?.storage.total.toFixed(1)} GB`} icon={<HardDrive className="w-6 h-6" />} />
      <InfoCard label="Storage Used" value={`${systemData?.storage.used.toFixed(1)} GB`} icon={<HardDrive className="w-6 h-6" />} />
      <InfoCard label="Storage Free" value={`${systemData?.storage.free.toFixed(1)} GB`} icon={<HardDrive className="w-6 h-6" />} />
    </div>
  );
};

export default SystemDetails;
