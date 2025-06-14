import React, { useEffect, useState } from 'react';

import { Cpu, Monitor, HardDrive, Sun, Moon } from 'lucide-react';
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
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches || false
  );
  const [maxStorage, setMaxStorage] = useState<number>(0);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    setIsDark(!isDark);
  };

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
      console.log(statistics);
      setMaxStorage(statistics.storage?.total ?? undefined);
    };

    fetchStatistics();
  }, []);

  const currentStats = data[data.length - 1];

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">System Monitor</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real-time performance metrics</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-4 rounded-2xl transition-all duration-300 hover:scale-110 bg-white/50 text-gray-600 dark:bg-gray-800/50 dark:text-yellow-400 hover:bg-white/80 dark:hover:bg-gray-700/50 shadow-lg"
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      <SystemDetails />
        {currentStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <div className="space-y-8">
          {/* CPU Chart */}
          <ChartCard title="CPU Performance" icon={<Cpu />} dataKey="cpuUsage" color="#3b82f6" data={data} />

          {/* RAM Chart */}
          <ChartCard title="Memory Usage" icon={<Monitor />} dataKey="ramUsage" color="#10b981" data={data} />

          {/* Storage Chart */}
          <ChartCard title="Storage Usage" icon={<HardDrive />} dataKey="storageUsed" color="#f97316" data={data} format="gb" max= {maxStorage} />
        </div>
      </div>
    </div>
  );
};


export default StatisticsComponent;
