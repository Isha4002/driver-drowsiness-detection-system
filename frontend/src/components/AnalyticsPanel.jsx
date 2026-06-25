import { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsPanel() {

  const [data, setData] = useState({
    avgEAR: 0,
    avgMAR: 0,
    totalAlerts: 0,
    drowsyPercent: 0,
    accuracy: 94.6
  });

  useEffect(() => {

    axios
      .get("http://driver-drowsiness-backends.onrender.com/analytics")
      .then((res) => {
        setData({
          ...res.data,
          accuracy: 94.6
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div className="space-y-6">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Analytics Dashboard
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">
              Total Alerts
            </p>

            <h1 className="text-4xl font-bold text-red-400 mt-2">
              {data.totalAlerts}
            </h1>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">
              Average EAR
            </p>

            <h1 className="text-4xl font-bold text-blue-400 mt-2">
              {data.avgEAR}
            </h1>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">
              Average MAR
            </p>

            <h1 className="text-4xl font-bold text-purple-400 mt-2">
              {data.avgMAR}
            </h1>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400">
              Detection Accuracy
            </p>

            <h1 className="text-4xl font-bold text-green-400 mt-2">
              {data.accuracy}%
            </h1>
          </div>

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Monitoring Insights
        </h2>

        <div className="space-y-3 text-lg">

          <p>
            👁 Average EAR:
            <span className="text-blue-400 ml-2">
              {data.avgEAR}
            </span>
          </p>

          <p>
            😮 Average MAR:
            <span className="text-purple-400 ml-2">
              {data.avgMAR}
            </span>
          </p>

          <p>
            🚨 Total Alerts:
            <span className="text-red-400 ml-2">
              {data.totalAlerts}
            </span>
          </p>

          <p>
            ⚠ Drowsy Percentage:
            <span className="text-yellow-400 ml-2">
              {data.drowsyPercent}%
            </span>
          </p>

          <p>
            ✅ Driver Alert Time:
            <span className="text-green-400 ml-2">
              {(100 - data.drowsyPercent).toFixed(1)}%
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsPanel;