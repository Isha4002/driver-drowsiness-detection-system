function StatsPanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Statistics
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span>Monitoring Time</span>
          <span>00:15:42</span>
        </div>

        <div className="flex justify-between">
          <span>Drowsy Episodes</span>
          <span>2</span>
        </div>

        <div className="flex justify-between">
          <span>Last Alert</span>
          <span>12:32 PM</span>
        </div>

        <div className="flex justify-between">
          <span>Accuracy</span>
          <span>94.6%</span>
        </div>

        <div className="flex justify-between">
          <span>Frames Analyzed</span>
          <span>28,542</span>
        </div>

      </div>

    </div>
  );
}

export default StatsPanel;