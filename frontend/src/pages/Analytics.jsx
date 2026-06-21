import Sidebar from "../components/Sidebar";
import AnalyticsPanel from "../components/AnalyticsPanel";

function Analytics() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6">
          Analytics
        </h1>

        <AnalyticsPanel />
      </main>

    </div>
  );
}

export default Analytics;