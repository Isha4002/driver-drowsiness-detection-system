import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function TrendChart() {

  const data = [
    { time: "60s", ear: 0.35, mar: 0.12 },
    { time: "45s", ear: 0.32, mar: 0.18 },
    { time: "30s", ear: 0.37, mar: 0.10 },
    { time: "15s", ear: 0.40, mar: 0.24 },
    { time: "Now", ear: 0.34, mar: 0.20 }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-semibold mb-4">
        EAR & MAR Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid stroke="#1e293b" />

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="ear"
            stroke="#3b82f6"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="mar"
            stroke="#a855f7"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TrendChart;