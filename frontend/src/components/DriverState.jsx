function DriverState({ state }) {

  const bg =
    state === "Drowsy"
      ? "#dc2626"
      : "#16a34a";

  return (
    <div
      className="state-card"
      style={{
        backgroundColor: bg
      }}
    >
      <h2>Driver State</h2>

      <h1>{state}</h1>
    </div>
  );
}

export default DriverState;