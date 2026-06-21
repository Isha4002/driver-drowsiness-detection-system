import { useEffect, useState } from "react";
import axios from "axios";

function ScreenshotGallery() {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/screenshots")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <>
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold">
            Screenshot Gallery
          </h2>

          <span className="text-slate-400">
            {images.length} Images
          </span>

        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">

          {images.map((img, index) => (

            <div
              key={img}
              className="relative cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >

              {index === 0 && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Latest
                </span>
              )}

              <img
                src={`http://127.0.0.1:5000/screenshot/${img}`}
                alt={img}
                className="rounded-xl border border-slate-700 transition duration-300 group-hover:scale-105"
              />

            </div>

          ))}

        </div>

      </div>

      {/* FULL SCREEN MODAL */}

      {selectedImage && (

       <div
  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
  onClick={() => setSelectedImage(null)}
>
          <div
  className="relative max-w-5xl w-full"
  onClick={(e) => e.stopPropagation()}
>

            <button
  onClick={() => setSelectedImage(null)}
  className="absolute top-12 right-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white z-50"
>
  ✕
</button>

            <a
              href={`http://127.0.0.1:5000/screenshot/${selectedImage}`}
              download
              className="absolute -top-12 right-24 bg-blue-500 px-4 py-2 rounded-lg"
            >
              Download
            </a>

            <img
              src={`http://127.0.0.1:5000/screenshot/${selectedImage}`}
              alt={selectedImage}
              className="w-full rounded-2xl"
            />

            <p className="text-center text-slate-300 mt-4">
              {selectedImage}
            </p>

          </div>

        </div>

      )}

    </>
  );
}

export default ScreenshotGallery;