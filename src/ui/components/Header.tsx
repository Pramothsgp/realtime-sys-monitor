import { Sun, Moon, Cpu, List } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches || false
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
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

      {/* Navigation Bar */}
      <nav className="flex gap-6 text-lg font-medium text-gray-700 dark:text-gray-200">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:underline transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`
          }
        >
          <Cpu />
          Dashboard
        </NavLink>
        <NavLink
          to="/processes"
          className={({ isActive }) =>
            `hover:underline transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`
          }
        >
            <List />
          Processes
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
