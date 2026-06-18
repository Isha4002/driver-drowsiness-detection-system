import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import StatCard from "./components/StatCard";
import DriverState from "./components/DriverState";

import TrendChart from "./components/TrendChart";
import StatsPanel from "./components/StatsPanel";

import LiveFeed from "./components/LiveFeed";
import AlertPanel from "./components/AlertPanel";
import AlertCountCard from "./components/AlertCountCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">

        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

          <StatCard
            title="EAR"
            value="0.32"
            icon="👁"
          />

          <StatCard
            title="MAR"
            value="0.24"
            icon="😮"
          />

          <DriverState
            state="ALERT"
          />

           <AlertCountCard />

          <StatsPanel />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

          <div className="xl:col-span-2">
            <TrendChart />
          </div>

          <AlertPanel />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">

          <LiveFeed />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-2xl font-semibold mb-4">
              Safety Tips
            </h2>

            <ul className="space-y-4 text-slate-300">
              <li>✅ Take breaks every 2 hours</li>
              <li>✅ Stay hydrated</li>
              <li>✅ Avoid driving when sleepy</li>
              <li>✅ Keep face well illuminated</li>
            </ul>
          </div>

        </div>

      </main>

    </div>
  );
}

export default App;