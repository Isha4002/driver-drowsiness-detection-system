import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import DriverState from "./components/DriverState";

function App() {

  const [data, setData] = useState({
    ear: 0,
    mar: 0,
    state: "Loading..."
  });

  useEffect(() => {

    const fetchData = () => {

      axios
        .get("http://127.0.0.1:5000/status")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    };

    fetchData();

    const interval = setInterval(
      fetchData,
      1000
    );

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="container">

      <Sidebar />

      <div className="main">

        <h1>
          Driver Drowsiness Dashboard
        </h1>

        <div className="cards">

          <StatCard
            title="EAR"
            value={data.ear}
            icon="👁"
          />

          <StatCard
            title="MAR"
            value={data.mar}
            icon="😮"
          />

        </div>

        <DriverState
          state={data.state}
        />

      </div>

    </div>
  );
}

export default App;