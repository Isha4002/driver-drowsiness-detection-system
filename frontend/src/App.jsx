import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import StatCard from "./components/StatCard";
import DriverState from "./components/DriverState";

import TrendChart from "./components/TrendChart";
import LiveFeed from "./components/LiveFeed";
import AlertPanel from "./components/AlertPanel";
import AlertCountCard from "./components/AlertCountCard";

function App() {

  const [status, setStatus] = useState({
    ear: 0,
    mar: 0,
    state: "Alert"
  });

  useEffect(() => {

    const fetchStatus = () => {

      axios
        .get("http://127.0.0.1:5000/status")
        .then((res) => {
          setStatus(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    };

    fetchStatus();

    const interval = setInterval(
      fetchStatus,
      1000
    );

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">

        <Header />

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

          <StatCard
            title="EAR"
            value={status.ear}
            icon="👁"
          />

          <StatCard
            title="MAR"
            value={status.mar}
            icon="😮"
          />

          <DriverState
            state={status.state}
          />

          <AlertCountCard />

        </div>

        {/* GRAPH + ALERTS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

          <div className="xl:col-span-2">
            <TrendChart />
          </div>

          <AlertPanel />

        </div>

        {/* LIVE FEED + SAFETY */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">

          <LiveFeed />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

            <h2 className="text-2xl font-semibold mb-6">
              Safety Tips
            </h2>

            <ul className="space-y-5 text-slate-300 text-lg">

              <li>
                ✅ Take breaks every 2 hours
              </li>

              <li>
                ✅ Stay hydrated
              </li>

              <li>
                ✅ Avoid driving when sleepy
              </li>

              <li>
                ✅ Keep face well illuminated
              </li>

            </ul>

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;