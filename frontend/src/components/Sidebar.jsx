import {
  FaHome,
  FaChartLine,
  FaBell,
  FaHistory,
  FaCog,
  FaInfoCircle
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col justify-between">

      <div>

        {/* Logo */}
        <div className="p-6 text-center border-b border-slate-800">
          <div className="text-6xl mb-3">🚗</div>

          <h1 className="text-2xl font-bold">
            DROWSINESS
          </h1>

          <p className="text-slate-400">
            DETECTION
          </p>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-3">

          <div className="bg-blue-600 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer">
            <FaHome />
            Dashboard
          </div>

          <div className="hover:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition">
            <FaChartLine />
            Analytics
          </div>

          <div className="hover:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition">
            <FaBell />
            Alerts
          </div>

          <div className="hover:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition">
            <FaHistory />
            History
          </div>

          <div className="hover:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition">
            <FaCog />
            Settings
          </div>

          <div className="hover:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition">
            <FaInfoCircle />
            About
          </div>

        </nav>

      </div>

      {/* Bottom Status */}
      <div className="m-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">

        <div className="mb-5">
          <p className="text-slate-400 text-sm">
            System Status
          </p>

          <p className="text-green-400 font-semibold">
            ● Online
          </p>
        </div>

        <div className="mb-5">
          <p className="text-slate-400 text-sm">
            Model Status
          </p>

          <p className="text-green-400 font-semibold">
            Active
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-2">
            Confidence
          </p>

          <h2 className="text-3xl font-bold text-blue-400">
            94.6%
          </h2>

          <div className="w-full h-2 bg-slate-700 rounded-full mt-3">
            <div className="w-[95%] h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;