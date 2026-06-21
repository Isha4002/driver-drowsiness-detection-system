import {
  FaHome,
  FaChartLine,
  FaBell,
  FaHistory,
  FaCog,
  FaInfoCircle
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";


function Sidebar({
  selectedPage,
  setSelectedPage
}) {

  const [stats, setStats] = useState({
    online: true,
    model: "Active",
    alerts: 0,
    uptime: "00:00:00"
  });

  useEffect(() => {

    const fetchStats = () => {

      axios
        .get("http://127.0.0.1:5000/stats")
        .then((res) => {
          setStats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    };

    fetchStats();

    const interval = setInterval(
      fetchStats,
      1000
    );

    return () => clearInterval(interval);

  }, []);

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col justify-between">

      <div>

        {/* Logo */}
        <div className="p-6 text-center border-b border-slate-800">

          <div className="text-6xl mb-3">
            🚗
          </div>

          <h1 className="text-2xl font-bold">
            DROWSINESS
          </h1>

          <p className="text-slate-400">
            DETECTION
          </p>

        </div>

        {/* Menu */}
        <nav className="p-4 space-y-3">

          <div
  onClick={() => setSelectedPage("dashboard")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "dashboard"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaHome />
  Dashboard
</div>

          <div
  onClick={() => setSelectedPage("analytics")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "analytics"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaChartLine />
  Analytics
</div>

          <div
  onClick={() => setSelectedPage("alerts")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "alerts"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaBell />
  Alerts
</div>

          <div
  onClick={() => setSelectedPage("history")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "history"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaHistory />
  History
</div>

          <div
  onClick={() => setSelectedPage("settings")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "settings"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaCog />
  Settings
</div>

          <div
  onClick={() => setSelectedPage("about")}
  className={`rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition
  ${
    selectedPage === "about"
      ? "bg-blue-600"
      : "hover:bg-slate-800"
  }`}
>
  <FaInfoCircle />
  About
</div>

        </nav>

      </div>

      {/* Bottom Stats */}
      <div className="m-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">

        <div className="mb-5">

          <p className="text-slate-400 text-sm">
            System Status
          </p>

          <p className="text-green-400 font-semibold text-xl">
            ● {stats.online ? "Online" : "Offline"}
          </p>

        </div>

        <div className="mb-5">

          <p className="text-slate-400 text-sm">
            Model Status
          </p>

          <p className="text-green-400 font-semibold text-xl">
            {stats.model}
          </p>

        </div>

        <div className="mb-5">

          <p className="text-slate-400 text-sm">
            Monitoring Time
          </p>

          <p className="font-semibold text-white text-lg">
            {stats.uptime}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Drowsy Episodes
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {stats.alerts}
          </h2>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;