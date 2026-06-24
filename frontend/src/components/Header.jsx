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

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-w-[220px]">

  <h2 className="text-green-400 text-xl font-bold">
    👤 Admin
  </h2>

  <p className="text-slate-400 mb-3">
    Logged In
  </p>

  <button
    onClick={() => {

      localStorage.removeItem("token");

      window.location.reload();

    }}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
  >
    Logout
  </button>

</div>

      </div>

    </div>

  );
}

export default Header;