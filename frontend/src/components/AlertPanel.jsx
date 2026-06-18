import { useEffect, useState } from "react";
import axios from "axios";

function AlertPanel() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const fetchAlerts = () => {

      axios
        .get("http://127.0.0.1:5000/alerts")
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

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[560px] flex flex-col">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-3xl font-bold">
          Recent Alerts
        </h2>

        <span className="text-slate-400">
          {alerts.length} Alerts
        </span>

      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">


        {alerts.length === 0 ? (

          <p className="text-slate-400">
            No Alerts Yet
          </p>

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