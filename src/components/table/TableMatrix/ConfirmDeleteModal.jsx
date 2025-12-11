import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  deleteType,
  deleteIndex,
  deleteName,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const typeLabel = deleteType === "row" ? "User (Baris)" : "Item (Kolom)";

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div
        className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🗑️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-600 mb-4">
          Apakah Anda yakin ingin menghapus{" "}
          <span className="font-semibold text-red-600">
            {typeLabel} ke-{deleteIndex + 1}
          </span>
          {deleteName && (
            <span className="font-semibold text-red-600"> ({deleteName})</span>
          )}
          ?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Tindakan ini tidak dapat dibatalkan.
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
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
}
