function AlertPanel() {

  const alerts = [
    {
      title: "Drowsiness Detected",
      time: "12:32 PM",
      color: "bg-red-500"
    },
    {
      title: "Yawning Detected",
      time: "11:47 AM",
      color: "bg-yellow-500"
    },
    {
      title: "Back To Alert State",
      time: "11:45 AM",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <div className="flex justify-between mb-5">

        <h2 className="text-3xl font-bold">
          Recent Alerts
        </h2>

        <button className="bg-slate-800 px-4 py-2 rounded-lg">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="bg-slate-800 p-4 rounded-2xl flex justify-between"
          >

            <div className="flex gap-4">

              <div
                className={`w-12 h-12 rounded-full ${alert.color}`}
              />

              <div>

                <h3 className="font-semibold">
                  {alert.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  Driver Monitoring Event
                </p>

              </div>

            </div>

            <span className="text-slate-400">
              {alert.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlertPanel;