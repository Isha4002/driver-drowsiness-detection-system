function StatCard({
  title,
  value,
  icon
}) {

  const isEAR = title === "EAR";

  return (
    <div
      className={`rounded-3xl p-6 border overflow-hidden relative
      ${
        isEAR
          ? "bg-gradient-to-br from-blue-950 to-slate-900 border-blue-700"
          : "bg-gradient-to-br from-purple-950 to-slate-900 border-purple-700"
      }`}
    >

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
            {isEAR
              ? "Eye Aspect Ratio"
              : "Mouth Aspect Ratio"}
          </p>
        </div>

      </div>

      <h1 className="text-6xl font-bold mt-8">
        {value}
      </h1>

      <p className="text-slate-400 mt-4">
        {isEAR
          ? "Normal Range: 0.25 - 0.40"
          : "Normal Range: 0.20 - 0.80"}
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40">
        <svg width="100%" height="100%">
          <polyline
            fill="none"
            stroke={isEAR ? "#3b82f6" : "#a855f7"}
            strokeWidth="3"
            points="0,50 40,20 80,35 120,10 160,45 200,30 240,20 280,40 320,15"
          />
        </svg>
      </div>

    </div>
  );
}

export default StatCard;