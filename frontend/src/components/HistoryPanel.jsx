import { useEffect, useState } from "react";
import axios from "axios";

function HistoryPanel() {

  const [alerts, setAlerts] = useState([]);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {

    axios
      .get("http://driver-drowsiness-backends.onrender.com/alerts")
      .then((res) => setAlerts(res.data));

    axios
      .get("hhttp://driver-drowsiness-backends.onrender.com/screenshots")
      .then((res) => setScreenshots(res.data));

  }, []);

  return (

    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Total Alerts
          </h3>

          <h1 className="text-4xl font-bold text-red-400 mt-2">
            {alerts.length}
          </h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Screenshots
          </h3>

          <h1 className="text-4xl font-bold text-blue-400 mt-2">
            {screenshots.length}
          </h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Status
          </h3>

          <h1 className="text-3xl font-bold text-green-400 mt-2">
            Active
          </h1>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* ALERT HISTORY */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-2xl font-bold mb-4">
            Alert History
          </h2>

          <div className="max-h-[500px] overflow-y-auto space-y-3">

            {alerts.map((alert, index) => (

              <div
                key={index}
                className="bg-slate-800 p-4 rounded-xl flex justify-between"
              >

                <div>
                  <p className="text-red-400 font-semibold">
                    {alert.event}
                  </p>
                </div>

                <p className="text-slate-400">
                  {alert.time}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* SCREENSHOTS */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-2xl font-bold mb-4">
            Captured Screenshots
          </h2>

          <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">

            {screenshots.map((img) => (

              <img
                key={img}
                src={`http://driver-drowsiness-backends.onrender.com/screenshot/${img}`}
                alt={img}
                className="rounded-xl border border-slate-700"
              />

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default HistoryPanel;