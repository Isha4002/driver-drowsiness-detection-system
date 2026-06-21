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

import ScreenshotGallery from "./components/ScreenshotGallery";
import AnalyticsPanel from "./components/AnalyticsPanel";
import HistoryPanel from "./components/HistoryPanel";

function App() {

  const [selectedPage, setSelectedPage] =
    useState("dashboard");

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

      <Sidebar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <main className="flex-1 p-6 overflow-auto">

        {/* DASHBOARD */}

        {selectedPage === "dashboard" && (

          <>

            <Header />

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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

              <div className="xl:col-span-2">
                <TrendChart />
              </div>

              <AlertPanel />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">

              <LiveFeed />

              <ScreenshotGallery />

            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mt-6">

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

          </>

        )}

        {/* ANALYTICS */}

        {selectedPage === "analytics" && (

          <>

            <Header />

            <div className="mt-6">

              <AnalyticsPanel />

            </div>

          </>

        )}

        {/* ALERTS */}

{selectedPage === "alerts" && (

  <>
    <Header />

    <div className="mt-6">
      <AlertPanel />
    </div>

  </>

)}

{
  selectedPage === "history" && (
    <>
      <Header />

      <div className="mt-6">
        <HistoryPanel />
      </div>
    </>
  )
}

{/* SETTINGS */}

{selectedPage === "settings" && (

  <>
    <Header />

    <div className="mt-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">

      <h2 className="text-3xl font-bold mb-6">
        Settings
      </h2>

      <div className="space-y-6">

        <div>
          <label className="block text-slate-400 mb-2">
            EAR Threshold
          </label>

          <input
            type="number"
            defaultValue="0.20"
            className="bg-slate-800 p-3 rounded-xl w-full"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-2">
            Alert Sound
          </label>

          <select className="bg-slate-800 p-3 rounded-xl w-full">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

      </div>

    </div>

  </>

)}

{/* ABOUT */}

{selectedPage === "about" && (

  <>
    <Header />

    <div className="mt-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">

      <h2 className="text-3xl font-bold mb-4">
        About Project
      </h2>

      <p className="text-slate-300 leading-8">

        AI Driver Drowsiness Detection System uses
        MediaPipe FaceMesh, OpenCV, Machine Learning
        and React Dashboard to monitor driver alertness
        in real-time.

      </p>

      <div className="mt-6 space-y-2">

        <p>👩‍💻 Developer: Isha Pal</p>
        <p>🎓 B.Tech IT</p>
        <p>🤖 Tech Stack: React + Flask + OpenCV + ML</p>

      </div>

    </div>

  </>

)}

      </main>

    </div>
  );
}

export default App;