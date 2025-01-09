import React from "react";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CloseIcon from "@mui/icons-material/Close";

const ModalHomeFirst = ({ isOpen, onClose }) => {
  return (
    <div className="fixed inset-0 p-5 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 bg-red-200 rounded-full text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <CloseIcon />
        </button> */}

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-poppins font-semibold mb-6 text-center">
          Selamat datang di Website Media Pembelajaran Sistem Rekomendasi
        </h2>

        {/* Table with one column (Link) */}
        <div className="mb-6">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="text-center border-b py-2 font-poppins">
                  Link Yang Wajib Dibuka{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-200">
                <td className="border-b py-2 font-poppins font-semibold">
                  <a
                    href="https://s.id/FormPengujianSRP"
                    className="text-lg text-blue-500 hover:text-blue-700 hover:underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link Form Pengujian Sistem Rekomendasi
                    <TouchAppIcon className="ml-2 animate-bounce text-blue-500" />
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-blue-200">
                <td className="border-b py-2 font-poppins font-semibold">
                  <a
                    href="https://s.id/LinkMateri1-3"
                    className="text-lg text-blue-500 hover:text-blue-700 hover:underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link Materi PPT Sistem Rekomendasi
                    <TouchAppIcon className="ml-2 animate-bounce text-blue-500" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-red-500 font-poppins text-center text-sm font-medium mt-5">
            <ReportProblemIcon /> Buka Link Diatas Sebagai Acuan Untuk
            Pembelajaran
          </p>
        </div>

        {/* Keterangan */}
        <p className="mb-4 text-gray-700 text-justify font-poppins text-sm sm:text-base">
          Penting untuk memperhatikan setiap langkah yang diberikan dalam
          pembelajaran ini dengan serius. Lakukan setiap instruksi dengan
          seksama untuk mendapatkan pemahaman yang maksimal dan mendalam
          mengenai sistem rekomendasi. Semakin fokus Anda dalam mengikuti setiap
          tahapan, semakin baik hasil pembelajaran yang akan Anda capai.
        </p>

        {/* Button to close modal */}
        <div className="text-center mb-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHomeFirst;
