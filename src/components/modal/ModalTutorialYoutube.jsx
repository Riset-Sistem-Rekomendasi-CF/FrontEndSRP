import React, { useState } from "react";
import { OnlyDivider } from "../tabelData/DividerHeading";

export const ModalTutorialYoutube = ({
  dontShowAgain,
  handleCheckboxChange,
  handleContinue,
  onClose,
}) => {
  const [selectedVideo, setSelectedVideo] = useState("user");
  // daftar video
  const videoLinks = {
    user: "https://www.youtube.com/embed/ZClUGV5b--g?si=488abd3JY_TeEfLh",
    item: "https://www.youtube.com/embed/xdce_71axzg?si=oBsvFsIN5c64xsX_",
  };

  const handleVideoSelect = (type) => {
    setSelectedVideo(type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-lg shadow-xl relative space-y-5 overflow-y-auto max-h-[90vh] font-poppins">
        <h2 className="text-2xl font-semibold text-gray-800">
          Penting Sebelum Melanjutkan
        </h2>
        <OnlyDivider />

        <p className="text-gray-700 text-sm leading-relaxed bg-green-200 rounded-md shadow-sm border border-black p-2">
          Hasil perhitungan yang akan ditampilkan berdasarkan metode prediksi
          dan fungsi similaritas yang Anda pilih. Pastikan Anda memahami cara
          kerja metode tersebut sebelum melihat hasilnya.
        </p>

        <OnlyDivider />
        <div className="space-y-3">
          <p className="text-gray-700 text-md font-medium leading-relaxed">
            Jika Anda belum memahami konsep dasarnya, silakan tonton video
            tutorial berikut ini terlebih dahulu:
          </p>
          {/* button opsi video user atau item */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <button
              onClick={() => handleVideoSelect("user")}
              className={`px-3 py-2 rounded-md shadow-sm text-sm transition ${
                selectedVideo === "user"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-200 text-blue-700 hover:bg-blue-200"
              }`}
            >
              Tutorial User-Based
            </button>
            <button
              onClick={() => handleVideoSelect("item")}
              className={`px-3 py-2 rounded-md shadow-sm text-sm transition ${
                selectedVideo === "item"
                  ? "bg-green-700 text-white"
                  : "bg-green-200 text-green-700 hover:bg-green-200"
              }`}
            >
              Tutorial Item-Based
            </button>
          </div>

          {/* Responsive YouTube Embed */}
          <div className="w-full">
            <iframe
              className="w-full h-[300px] md:h-[400px] rounded-md"
              src={videoLinks[selectedVideo]}
              title={`Tutorial Video Pemodelan Sistem Rekomendasi ${
                selectedVideo === "user" ? "User-Based" : "Item-Based"
              }`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <p className="text-gray-600 text-md">
            Video ini menjelaskan konsep dasar sistem rekomendasi dan fungsi
            similaritas secara menyeluruh dan mudah dipahami.
          </p>
        </div>

        {/* Checkbox: Jangan tampilkan lagi */}
        <div className="bg-yellow-200 rounded-md shadow-md border border-black p-2 max-w-fit">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Jangan tampilkan lagi saat membuka halaman ini</span>
          </label>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
            >
              Batal
            </button>
          )}
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
