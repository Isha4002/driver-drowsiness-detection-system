function StatCard({
  title,
  value,
  icon
}) {

  const isEAR = title === "EAR";

  const numValue = Number(value);

  const isNormal = isEAR
    ? numValue >= 0.25
    : numValue < 0.5;

  return (

    <div
      className={`rounded-3xl p-6 border overflow-hidden relative
      ${
        isEAR
          ? "bg-gradient-to-br from-blue-950 to-slate-900 border-blue-700"
          : "bg-gradient-to-br from-purple-950 to-slate-900 border-purple-700"
      }`}
    >

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl
            ${
              isEAR
                ? "bg-blue-600"
                : "bg-purple-600"
            }`}
          >
            {icon}
          </div>

          <div>

            <h3 className="text-3xl font-bold">
              {title}
            </h3>

            <p className="text-slate-400">
              {
                isEAR
                  ? "Eye Aspect Ratio"
                  : "Mouth Aspect Ratio"
              }
            </p>

          </div>

        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold
          ${
            isNormal
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {isNormal
            ? "Normal"
            : "Warning"}
        </div>

      </div>

      <h1 className="text-6xl font-bold mt-8">
        {Number(value).toFixed(2)}
      </h1>

      <p className="text-slate-400 mt-4">
        {
          isEAR
            ? "Normal Range: 0.25 - 0.40"
            : "Normal Range: 0.20 - 0.80"
        }
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-50">

        <svg width="100%" height="100%">

          <polyline
            fill="none"
            stroke={
              isEAR
                ? "#3b82f6"
                : "#a855f7"
            }
            strokeWidth="4"
            points="
              0,60
              40,25
              80,40
              120,15
              160,50
              200,30
              240,20
              280,45
              320,25
              360,40
            "
          />

        </svg>

      </div>

    </div>

  );
}

export default StatCard;