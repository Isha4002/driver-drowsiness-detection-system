import { useEffect, useState } from "react";
import api from "./api";

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
import ReportButton from "./components/ReportButton";
import SettingsPanel from "./components/SettingsPanel";

import Login from "./Login";
import Register from "./Register";

function App() {

  const [selectedPage, setSelectedPage] =
    useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] =
  useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] =
  useState(false);

  const [darkMode, setDarkMode] =
  useState(true);  

  const [status, setStatus] = useState({
    ear: 0,
    mar: 0,
    state: "Alert"
  });

  useEffect(() => {

    const fetchStatus = () => {

        api.get("/status")
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

 if (!isLoggedIn) {

  return showRegister ? (

    <Register
      setShowRegister={setShowRegister}
    />

  ) : (

    <Login
      setIsLoggedIn={setIsLoggedIn}
      setShowRegister={setShowRegister}
    />

  );

}

  return (
    <div
  className={`min-h-screen flex ${
    darkMode
      ? "bg-slate-950 text-white"
      : "bg-gray-100 text-black"
  }`}
>

      <Sidebar
  selectedPage={selectedPage}
  setSelectedPage={setSelectedPage}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
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

      <div className="mb-6">
  <ReportButton />
</div>

      <div className="mt-6">
        <HistoryPanel />
      </div>
    </>
  )
}



{/* ABOUT */}

{selectedPage === "about" && (

  <>
    <Header />

    <div className="mt-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">

      <h2 className="text-4xl font-bold mb-4">
        About Project
      </h2>

      <p className="text-slate-300 leading-8 text-lg">

        AI Driver Drowsiness Detection System is a real-time
        monitoring solution that uses Computer Vision and
        Machine Learning to detect signs of driver fatigue
        and alert the driver before accidents occur.

      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-3">
            🚀 Features
          </h3>

          <ul className="space-y-2 text-slate-300">

            <li>✅ Real-Time Eye Monitoring</li>
            <li>✅ Drowsiness Detection</li>
            <li>✅ Live Camera Feed</li>
            <li>✅ Alert History Tracking</li>
            <li>✅ Screenshot Capture</li>
            <li>✅ Analytics Dashboard</li>

          </ul>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-3">
            🛠 Tech Stack
          </h3>

          <ul className="space-y-2 text-slate-300">

            <li>React.js</li>
            <li>Flask API</li>
            <li>OpenCV</li>
            <li>MediaPipe FaceMesh</li>
            <li>Machine Learning</li>
            <li>Chart.js</li>

          </ul>

        </div>

      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-2xl">

        <h3 className="text-2xl font-semibold mb-3">
          👩‍💻 Developer
        </h3>

        <p className="text-slate-300">
          Isha Pal
        </p>

        <p className="text-slate-400">
          B.Tech Information Technology
        </p>

      </div>

    </div>

  </>

)}


{selectedPage === "settings" && (
  <>
    <Header />

    <div className="mt-6">
      <SettingsPanel
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
    </div>
  </>
)}

      </main>

    </div>
  );
}

export default App;