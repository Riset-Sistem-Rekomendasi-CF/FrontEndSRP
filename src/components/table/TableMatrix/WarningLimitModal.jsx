import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function WarningLimitModal({
  isOpen,
  onClose,
  onConfirm,
  limitType,
  currentCount,
  maxLimit,
}) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const typeLabel = limitType === "row" ? "User" : "Item";
  const newCount = currentCount + 1;
  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div
        className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-md mx-4"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal (opsional tapi disarankan)
      >
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <WarningAmberIcon style={{ fontSize: 40, color: "#f59e0b" }} />
        </div>
        <h2 className="text-xl font-bold text-yellow-600 mb-2">
          Peringatan Batas Maksimum!
        </h2>
        <p className="text-gray-600 mb-4">
          Anda akan menambahkan {typeLabel} ke-
          <span className="font-bold text-yellow-600">{newCount}</span>.
          <br />
          Batas yang disarankan adalah{" "}
          <span className="font-bold">
            {maxLimit} {typeLabel}
          </span>
          .
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left">
          <p className="text-sm text-yellow-800 font-medium mb-2">
            ⚠️ Risiko jika melebihi batas:
          </p>
          <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
            <li>Tampilan tabel menjadi terlalu padat</li>
            <li>Angka-angka sulit dibaca</li>
            <li>Visualisasi grafik kurang optimal dan susah di analisis</li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Apakah Anda tetap ingin melanjutkan?
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 font-medium"
          >
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
}
