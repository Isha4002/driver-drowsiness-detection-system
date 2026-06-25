import { useEffect, useState } from "react";
import api from "../api";

function AlertPanel() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const fetchAlerts = () => {

      api
        .get("/alerts")
        .then((res) => {
          setAlerts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    };

    fetchAlerts();

    const interval = setInterval(
      fetchAlerts,
      2000
    );

    return () => clearInterval(interval);

  }, []);

  const clearAlerts = () => {

    api
      .post("/clear-alerts")
      .then(() => {
        setAlerts([]);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[560px] flex flex-col">

      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-3xl font-bold">
            Recent Alerts
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {alerts.length} Alerts Recorded
          </p>

        </div>

        <button
          onClick={clearAlerts}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          🗑 Clear Alerts
        </button>

      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">

        {alerts.length === 0 ? (

          <div className="flex flex-col items-center justify-center h-full text-center">

            <div className="text-6xl mb-3">
              🎉
            </div>

            <h3 className="text-xl font-semibold">
              No Alerts Yet
            </h3>

            <p className="text-slate-400 mt-2">
              Driver is currently safe.
            </p>

          </div>

        ) : (

          alerts.map((alert, index) => (

            <div
              key={index}
              className="
                bg-slate-800
                hover:bg-slate-700
                transition
                p-4
                rounded-2xl
                flex
                justify-between
                items-center
              "
            >

              <div>

                <h3 className="font-semibold text-red-400 text-lg">
                  {alert.event}
                </h3>

                <p className="text-slate-400 text-sm">
                  Driver Monitoring Event
                </p>

              </div>

              <div className="text-right">

                <p className="text-slate-300 font-medium">
                  {alert.time}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default AlertPanel;