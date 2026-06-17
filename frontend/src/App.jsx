import { useEffect, useState } from "react";
import axios from "axios";

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
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("API Error:", error);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "30px",
          borderRadius: "20px",
          backgroundColor: "#1e293b",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.4)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          🚗 Driver Drowsiness Dashboard
        </h1>

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        >
          <h2>👁 EAR</h2>
          <h3>{data.ear}</h3>
        </div>

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        >
          <h2>😮 MAR</h2>
          <h3>{data.mar}</h3>
        </div>

        <div
          style={{
            background:
              data.state === "Drowsy"
                ? "#dc2626"
                : "#16a34a",
            padding: "15px",
            borderRadius: "12px"
          }}
        >
          <h2>📊 Driver State</h2>
          <h3>{data.state}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;