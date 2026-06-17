import Webcam from "react-webcam";

function LiveFeed() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-3xl font-bold">
          Live Feed
        </h2>

        <div className="bg-red-600 px-4 py-2 rounded-xl font-semibold">
          🔴 REC
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl">

        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full rounded-2xl"
        />

      </div>

      <div className="flex justify-end mt-3">

        <span className="text-green-400 font-semibold">
          FPS: 28
        </span>

      </div>

    </div>
  );
}

export default LiveFeed;