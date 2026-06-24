import { useEffect, useState } from "react";

function Header() {

  const [time, setTime] = useState(
    new Date()
  );

  const username =
    localStorage.getItem("username") ||
    "Admin";

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.reload();

  };

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

        {/* Time Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-w-[180px]">

          <h2 className="text-3xl font-bold">
            {time.toLocaleTimeString()}
          </h2>

          <p className="text-slate-400 mt-2">
            {time.toDateString()}
          </p>

        </div>

        {/* User Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-w-[240px]">

          <h2 className="text-green-400 text-xl font-bold">
            👤 {username}
          </h2>

          <p className="text-slate-400">
            Administrator
          </p>

          <p className="text-green-400 text-sm mt-1 mb-4">
            ● Online
          </p>

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              py-2
              rounded-xl
              text-white
              font-semibold
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}

export default Header;