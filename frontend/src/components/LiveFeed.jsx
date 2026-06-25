import { useEffect, useState } from "react";

function LiveFeed() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setImageUrl(
        `/frame?t=${Date.now()}`
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-4">
        Live Feed
      </h2>

      <img
        src={imageUrl}
        alt="Live Feed"
        className="w-full rounded-xl"
      />
    </div>
  );
}

export default LiveFeed;