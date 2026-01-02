import { useState, useEffect } from "react"; //
import { createPortal } from "react-dom"; //
import SwitchToggle from "../Toggle/SwitchToggle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import OnlyTabel from "./OnlyTabel";
import { tutorialRatingData, tutorialSparsityInfo } from "../../data";

const TabelView = ({ changeFunny, headers, columns }) => {
  const data = tutorialRatingData;

  const { numerator, denominator, percentage } = tutorialSparsityInfo;

  const [isModalSparsityOpen, setIsModalSparsityOpen] = useState(false);
  const [isFullPageOpen, setIsFullPageOpen] = useState(false);

  // State untuk memastikan kode berjalan di Client-Side (Next.js Friendly)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOpenModalSparsity = () => setIsModalSparsityOpen(true);
  const handleCloseModalSparsity = () => setIsModalSparsityOpen(false);
  const handleOpenFullPageModal = () => setIsFullPageOpen(true);
  const handleCloseFullPageModal = () => setIsFullPageOpen(false);

  // Komponen Keterangan yang bisa dipakai ulang
  const KeteranganSection = () => (
    <div className="mt-6 text-left w-full font-poppins">
      <p className="font-semibold text-lg text-gray-800 mb-3">Keterangan:</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
          <div className="w-8 h-6 bg-red-100 rounded mr-2 flex items-center justify-center text-red-500 font-medium text-sm">
            ?
          </div>
          <span className="text-gray-700 text-sm">Data Sparsity</span>
          <span
            className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-md font-semibold text-sm cursor-pointer hover:bg-red-200 transition-colors"
            onClick={handleOpenModalSparsity}
          >
            23.33%
          </span>
        </div>
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
          <div className="w-8 h-6 bg-blue-100 rounded mr-2"></div>
          <span className="text-gray-700 text-sm">Index User</span>
        </div>
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
          <div className="w-8 h-6 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-700 text-sm">Index Item</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-amber-50 p-4 m-2 rounded-xl  dark:bg-amber-100 dark:text-black">
      <div className="flex flex-col items-center justify-center">
        {/* Header Controls */}
        <div className="flex items-center justify-between w-full mb-2">
          <SwitchToggle title={"Funny Mode"} changeToggle={changeFunny} />

          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg shadow-sm hover:bg-green-200 hover:shadow-md transition-all duration-200 font-medium"
            onClick={handleOpenFullPageModal}
          >
            <FullscreenIcon className="text-green-600" fontSize="small" />
            Full Page
          </button>
        </div>

        {/* Table Utama (Non-Modal) */}
        <OnlyTabel headers={headers} columns={columns} data={data} />

        {/* Keterangan */}
        <KeteranganSection />

        {mounted &&
          isModalSparsityOpen &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 p-4">
              <div
                className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Rumus Persentase Sparsity
                </h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-700 font-medium text-sm">
                    (Jumlah Data yang belum di Rating / Total Data Rating) ×
                    100%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-800 text-center">
                    {numerator} / {denominator} ={" "}
                    <span className="text-blue-600">{percentage}%</span>
                  </p>
                </div>
                <button
                  onClick={handleCloseModalSparsity}
                  className="mt-5 w-full bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>,
            document.body // Target Portal
          )}

        {mounted &&
          isFullPageOpen &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 p-4 overflow-y-auto">
              <div className="bg-white w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-6xl overflow-auto p-6 rounded-xl shadow-2xl relative">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
                    Tabel Full Page Data Rating
                  </h2>
                  <button
                    onClick={handleCloseFullPageModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Tutup
                  </button>
                </div>

                <div className="mb-4">
                  <SwitchToggle
                    title={"Funny Mode"}
                    changeToggle={changeFunny}
                  />
                </div>

                <OnlyTabel headers={headers} columns={columns} data={data} />
                <KeteranganSection />
              </div>
            </div>,
            document.body // Target Portal
          )}
      </div>
    </div>
  );
};

export default TabelView;
