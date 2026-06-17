function Header() {
  return (
    <div className="flex justify-between items-start">

      <div>
        <h1 className="text-6xl font-bold">
          Driver Drowsiness Dashboard
        </h1>

        <p className="text-slate-400 text-xl mt-3">
          Real-time Monitoring System
        </p>
      </div>

      <div className="flex gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-2xl font-bold">
            03:24 PM
          </p>

          <p className="text-slate-400">
            May 18, 2025
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-green-400 text-xl font-bold">
            📷 Camera Active
          </p>
        </div>

      </div>

    </div>
  );
}

export default Header;