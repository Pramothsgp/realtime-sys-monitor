import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProcessesComponent from "./components/ProcessList";
import Statistics from "./components/Statistics";

function App() {
  return (
    <>
      <HashRouter>
        <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          <div className="p-6 max-w-7xl mx-auto">
            <Header />
            <Routes>
              <Route path="/" element={<Statistics />} />
              <Route path="/processes" element={<ProcessesComponent />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
