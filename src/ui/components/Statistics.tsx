// components/StatisticsComponent.tsx
import React, { useEffect, useState } from 'react';
import { Cpu, Monitor, HardDrive } from 'lucide-react';
import SystemDetails from './SystemDetails';
import ChartCard from './ChartCard';

interface Statistics {
  timestamp: string;
  cpuUsage: number;
  ramUsage: number;
  storageUsed: number;
}

const StatisticsComponent: React.FC = () => {
  const [data, setData] = useState<Statistics[]>([]);
  const [maxStorage, setMaxStorage] = useState<number>(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      //@ts-ignore
      window.electron.subscribeStatistics((statistics: any) => {
        const timestamp = new Date().toLocaleTimeString();
        const stat: Statistics = {
          timestamp,
          cpuUsage: statistics.cpuUsage ?? 0,
          ramUsage: statistics.ramUsage ?? 0,
          storageUsed: statistics.storage?.used ?? 0,
        };
        setData(prev => [...prev.slice(-19), stat]);
      });

      //@ts-ignore
      const statistics = await window.electron.getStatistics();
      setMaxStorage(statistics.storage?.total ?? undefined);
    };

    fetchStatistics();
  }, []);

  const currentStats = data[data.length - 1];

  return (
    <div className="space-y-8">
      <SystemDetails />

      {currentStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CPU */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 dark:from-blue-600/20 dark:to-blue-500/20 dark:border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-300">CPU Usage</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {(currentStats.cpuUsage * 100).toFixed(1)}%
                </p>
              </div>
              <Cpu className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          {/* RAM */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 dark:from-green-600/20 dark:to-green-500/20 dark:border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-300">RAM Usage</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {(currentStats.ramUsage * 100).toFixed(1)}%
                </p>
              </div>
              <Monitor className="w-12 h-12 text-green-500 dark:text-green-400" />
            </div>
          </div>

          {/* Storage */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 dark:from-orange-600/20 dark:to-orange-500/20 dark:border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-300">Storage</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {currentStats.storageUsed.toFixed(1)} GB
                </p>
              </div>
              <HardDrive className="w-12 h-12 text-orange-500 dark:text-orange-400" />
            </div>
          </div>
        </div>
      )}

      <ChartCard title="CPU Performance" icon={<Cpu />} dataKey="cpuUsage" color="#3b82f6" data={data} />
      <ChartCard title="Memory Usage" icon={<Monitor />} dataKey="ramUsage" color="#10b981" data={data} />
      <ChartCard title="Storage Usage" icon={<HardDrive />} dataKey="storageUsed" color="#f97316" data={data} format="gb" max={maxStorage} />
    </div>
  );
};

export default StatisticsComponent;
