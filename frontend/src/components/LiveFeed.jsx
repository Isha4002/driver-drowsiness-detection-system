function LiveFeed() {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between mb-4">

        <h2 className="text-2xl font-semibold">
          Live Feed
        </h2>

        <span className="bg-red-600 px-3 py-1 rounded-lg">
          REC
        </span>

      </div>

      <div className="h-72 rounded-xl bg-slate-800 flex items-center justify-center">

        <div className="text-center">

          <div className="text-7xl mb-4">
            📷
          </div>

          <p className="text-slate-400">
            Camera Feed Coming Soon
          </p>

        </div>

      </div>

    </div>
  );
}

export default LiveFeed;