function DriverState({ state }) {

  const isAlert =
    state === "ALERT";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isAlert
          ? "bg-green-950 border-green-700"
          : "bg-red-950 border-red-700"
      }`}
    >
      <h2 className="text-2xl font-semibold">
        DRIVER STATE
      </h2>

      <h1
        className={`text-5xl font-bold mt-6 ${
          isAlert
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {state}
      </h1>

      <p className="mt-4 text-slate-300">
        {isAlert
          ? "You're good to go!"
          : "Drowsiness Detected"}
      </p>
    </div>
  );
}

export default DriverState;