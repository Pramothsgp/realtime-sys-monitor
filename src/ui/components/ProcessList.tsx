import React, { useEffect, useState } from 'react';
import { ListOrdered, Terminal } from 'lucide-react';
import PaginationBar from './PaginationBar';

type Process = {
  pid: number;
  name: string;
  cpu: number;
  mem: number;
};

const PAGE_SIZE = 20;

const ProcessesComponent: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    //@ts-ignore
    window.electron.subscribeProcessUpdate(
      (data: { totalProcesses: number; processes: Process[] }) => {
        const sorted = data.processes.sort((a, b) => a.name.localeCompare(b.name));
        setTotal(data.totalProcesses);
        setProcesses(sorted);
      }
    );
  }, []);

  const filteredProcesses = processes.filter(
    (proc) =>
      proc.name.toLowerCase().includes(search.toLowerCase()) ||
      proc.pid.toString().includes(search)
  );

  const totalPages = Math.ceil(filteredProcesses.length / PAGE_SIZE);
  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleKill = async (pid: number) => {
    const confirmed = window.confirm(`Are you sure you want to kill process with PID ${pid}?`);
    if (!confirmed) return;

    try {
      // @ts-ignore
      const result = await window.electron.killProcess(pid);
      setPopupMessage(`✅ Process ${pid} terminated successfully.`);
    } catch (err) {
      setPopupMessage(`❌ Failed to terminate process ${pid}.`);
    } finally {
      setTimeout(() => setPopupMessage(null), 3000);
    }
 };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 dark:border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-300">
              Running Processes
            </p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{total}</p>
          </div>
          <ListOrdered className="w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>
      </div>

      {/* Search Input */}
      <div className="flex justify-end">
        <input
          type="text"
          className="w-full md:w-1/2 p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Search by name or PID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Process List */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 shadow-md overflow-hidden">
        <div className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          Top Processes by CPU Usage
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
          {paginatedProcesses.map((proc) => (
            <li
              key={proc.pid}
              className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              <div className="flex items-center gap-4">
                <Terminal className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {proc.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PID: {proc.pid}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  CPU: {proc.cpu.toFixed(1)}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  MEM: {proc.mem.toFixed(1)}%
                </p>
                <button
                  title="Kill Process"
                  onClick={() => handleKill(proc.pid)}
                  className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                >
                  {/* <XCircle className="w-5 h-5 text-red-500" /> */}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Popup Notification */}
      {popupMessage && (
        <div className="absolute bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ProcessesComponent;
