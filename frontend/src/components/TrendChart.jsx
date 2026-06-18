import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function TrendChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchHistory = () => {

      axios
        .get("http://127.0.0.1:5000/history")
        .then((res) => {

          const formatted =
            res.data.map(
              (item, index) => ({
                time: index + 1,
                ear: item.ear,
                mar: item.mar
              })
            );

          setData(formatted);

        })
        .catch((err) => {
          console.log(err);
        });

    };

    fetchHistory();

    const interval = setInterval(
      fetchHistory,
      1000
    );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <h2 className="text-3xl font-bold mb-4">
        EAR & MAR Trends
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <XAxis dataKey="time" />

          <YAxis />

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