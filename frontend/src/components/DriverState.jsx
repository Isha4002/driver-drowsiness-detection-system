function DriverState({ state }) {

  console.log("DriverState Received:", state);

  const isAlert =
    state?.toLowerCase() === "alert";

  return (
    <div
      className={`rounded-3xl p-6 border transition-all duration-500
      ${
        isAlert
          ? "bg-gradient-to-br from-green-950 to-slate-900 border-green-700"
          : "bg-gradient-to-br from-red-950 to-slate-900 border-red-700 animate-pulse"
      }`}
    >

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          DRIVER STATE
        </h2>

        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold
          ${
            isAlert
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          LIVE
        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <div>

          <h1
            className={`text-6xl font-bold
            ${
              isAlert
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {state}
          </h1>

          <p className="text-slate-400 mt-3">
            {
              isAlert
                ? "You're good to go!"
                : "Drowsiness Detected"
            }
          </p>

        </div>

        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg
          ${
            isAlert
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {isAlert ? "✓" : "⚠"}
        </div>

      </div>

    </div>
  );
}

export default DriverState;