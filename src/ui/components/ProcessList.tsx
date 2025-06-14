import React, { useEffect, useState } from 'react';
import { Cpu, ListOrdered, Terminal } from 'lucide-react';

type Process = {
  pid: number;
  name: string;
  cpu: number;
  mem: number;
};

const ProcessesComponent: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    //@ts-ignore
    window.electron.subscribeProcessUpdate(
      (data: { totalProcesses: number; processes: Process[] }) => {
        setTotal(data.totalProcesses);
        setProcesses(data.processes.sort((a, b) => b.cpu - a.cpu).slice(0, 20)); // top 10 by CPU
      }
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 dark:border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Running Processes</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{total}</p>
          </div>
          <ListOrdered className="w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>
      </div>

      {/* Process List */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 shadow-md overflow-hidden">
        <div className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          Top Processes by CPU Usage
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
          {processes.map((proc) => (
            <li key={proc.pid} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/60">
              <div className="flex items-center gap-4">
                <Terminal className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{proc.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PID: {proc.pid}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 dark:text-blue-400">CPU: {proc.cpu.toFixed(1)}%</p>
                <p className="text-sm text-green-600 dark:text-green-400">MEM: {proc.mem.toFixed(1)}%</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessesComponent;
