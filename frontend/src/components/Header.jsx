import { useEffect, useState } from "react";

function Header() {

  const [time, setTime] = useState(
    new Date()
  );

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="flex justify-between items-start">

      <div>
        <h1 className="text-6xl font-bold">
          Driver Drowsiness Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Real-time Monitoring System
        </p>
      </div>

      <div className="flex gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-w-[180px]">
          <h2 className="text-3xl font-bold">
            {time.toLocaleTimeString()}
          </h2>

          <p className="text-slate-400 mt-2">
            {time.toDateString()}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-w-[180px]">
          <h2 className="text-green-400 text-2xl font-bold">
            📷 Camera Active
          </h2>

          <p className="text-slate-400">
            Live Monitoring
          </p>
        </div>

      </div>

    </div>

  );
}

export default Header;