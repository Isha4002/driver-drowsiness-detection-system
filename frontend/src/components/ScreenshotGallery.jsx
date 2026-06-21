import { useEffect, useState } from "react";
import axios from "axios";

function ScreenshotGallery() {

  const [images, setImages] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/screenshots")
      .then((res) => {
        setImages(res.data);
      });

  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-4">
        Screenshot Gallery
      </h2>

      <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">

        {images.map((img) => (

          <img
            key={img}
            src={`http://127.0.0.1:5000/screenshot/${img}`}
            alt={img}
            className="rounded-xl border border-slate-700"
          />

        ))}

      </div>

    </div>
  );
}

export default ScreenshotGallery;