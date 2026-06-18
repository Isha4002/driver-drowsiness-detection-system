import { useEffect, useState } from "react";
import axios from "axios";

function AlertCountCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      axios
        .get("http://127.0.0.1:5000/alert-count")
        .then((res) => {
          setCount(res.data.count);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchCount();

    const interval = setInterval(
      fetchCount,
      2000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-950 border border-red-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold">
        🚨 ALERT COUNT
      </h3>

      <h1 className="text-5xl font-bold mt-4 text-red-400">
        {count}
      </h1>

      <p className="text-slate-300 mt-2">
        Total Drowsiness Events
      </p>
    </div>
  );
}

export default AlertCountCard;