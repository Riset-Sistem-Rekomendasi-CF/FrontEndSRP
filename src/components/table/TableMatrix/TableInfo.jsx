export default function TableInfo({ data }) {
  const totalCells = data.length * (data[0]?.length || 0);
  const emptyCells = data.flat().filter((v) => v === 0).length;
  const sparsityPercent = ((emptyCells / totalCells) * 100).toFixed(1);

  return (
    <div className="mt-6 mx-4 font-poppins">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-md p-4">
        <p className="font-bold text-lg mb-3 text-gray-700">
          Informasi Tabel Data Rating:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Ukuran Tabel */}
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">📐</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ukuran Tabel</p>
              <p className="font-semibold text-gray-700">
                {data.length} User × {data[0]?.length || 0} Item
              </p>
            </div>
          </div>

          {/* Total Cell */}
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">📦</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Cell</p>
              <p className="font-semibold text-gray-700">{totalCells} Cell</p>
            </div>
          </div>

          {/* Sparsity */}
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">❓</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Sparsity (Data Kosong)</p>
              <p className="font-semibold text-gray-700">
                {emptyCells} Cell ({sparsityPercent}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
