function AlertPanel() {

  const alerts = [
    {
      title: "Drowsiness Detected",
      time: "12:32 PM"
    },
    {
      title: "Yawning Detected",
      time: "11:47 AM"
    },
    {
      title: "Back To Alert",
      time: "11:45 AM"
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-semibold mb-5">
        Recent Alerts
      </h2>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <div className="flex justify-between">

              <div>

                <h3 className="font-semibold">
                  {alert.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  Driver Monitoring Event
                </p>

              </div>

              <span className="text-slate-400">
                {alert.time}
              </span>

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}

export default AlertPanel;