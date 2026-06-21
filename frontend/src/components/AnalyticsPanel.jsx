import { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsPanel() {

  const [data, setData] = useState({
    avgEAR: 0,
    avgMAR: 0,
    totalAlerts: 0,
    drowsyPercent: 0
  });

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/analytics")
      .then((res) => {
        setData(res.data);
      });

  }, []);

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Analytics
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Total Alerts
          </p>
          <h1 className="text-4xl font-bold text-red-400">
            {data.totalAlerts}
          </h1>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Avg EAR
          </p>
          <h1 className="text-4xl font-bold text-blue-400">
            {data.avgEAR}
          </h1>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Avg MAR
          </p>
          <h1 className="text-4xl font-bold text-purple-400">
            {data.avgMAR}
          </h1>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Drowsy %
          </p>
          <h1 className="text-4xl font-bold text-yellow-400">
            {data.drowsyPercent}%
          </h1>
        </div>

      </div>

    </div>
  );
}

export default AnalyticsPanel;