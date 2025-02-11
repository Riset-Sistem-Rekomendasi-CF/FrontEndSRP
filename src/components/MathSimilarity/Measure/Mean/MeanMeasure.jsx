import { transposeMatrix } from "../../../../helper/helper";
import { getFormulaMean } from "../Formula/FormulaMean";
import ModalMean from "./ModalMean";
import React, { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { AllSimilaritas } from "../../../../api/getDataSet";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MeanGif from "../../../../assets/vidioAsset/MeanGif.gif";
import MathJaxComponent from "../../../../MathJaxComponent";
import CloseIcon from "@mui/icons-material/Close";
import Spinner from "../../../Navigate/Spinner";

export default function MeanMeasure({ opsional, similarity, initialData, headers, columns, funnyMode }) {
  const [data] = useState(initialData);

  const [dataOnly] = useState(initialData.data);

  const { result } = AllSimilaritas(data, similarity);

  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "item-based"
        : "user-based"
      : opsional;
  const dataModify =
    similarity === "Adjusted Cosine"
      ? opsional === "item-based"
        ? dataOnly
        : transposeMatrix(dataOnly)
      : opsional === "item-based"
        ? transposeMatrix(dataOnly)
        : dataOnly;

  const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
  const [selectedIndex, setSelectedIndex] = useState([]); // State untuk menyimpan user yang dipilih
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
  const [showModalTutorial, setShowModalTutorial] = useState(false); // State untuk menampilkan modal

  const handleMeanClick = (mean, index) => {
    setSelectedMean(mean); // Simpan nilai mean yang ditekan
    setSelectedIndex([index]);
    setShowModal(true); // Tampilkan modal
  };

  const closeModal = () => {
    setShowModal(false); // Sembunyikan modal
    setSelectedMean(null); // Reset nilai mean yang dipilih
  };

  const meanFormula = getFormulaMean(opsionalModify, similarity);

  const RenderTableMean = () => {
    if (!result || !result["mean-list"]) {
      return (
        <>
          <Spinner />
        </>
      );
    }

    return (
      <>
        <div className="flex justify-center mt-4">
          <table className="border border-black mt-4 ">
            <thead>
              <tr className=" bg-gray-200">
                <th className="border border-black px-4 py-2 italic">
                  {opsionalModify === "user-based" ? "U" : "I"}
                </th>
                <th className="border border-black px-4 py-2 italic">μ</th>
              </tr>
            </thead>
            <tbody>
              {result["mean-list"].map((mean, index) => (
                <tr key={index} className="hover:bg-card_green_primary">
                  <td className="border border-black px-4 py-2">
                    {!funnyMode ? (index + 1) : (opsional == "user-based" ? columns : headers)[index]}
                  </td>
                  <td className="border border-black px-4 py-2">
                    <div
                      className="text-center cursor-pointer"
                      onClick={() => handleMeanClick(mean, index)}
                    >
                      {mean.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modal Card */}
          {showModal && (
            <ModalMean
              opsional={opsionalModify}
              data={dataModify}
              similarity={similarity}
              selectedIndex={selectedIndex}
              selectedMean={selectedMean}
              close={closeModal}
              headers={headers}
              columns={columns}
              funnyMode={funnyMode}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div className="h-[5rem]"></div> */}
      <div className="mt-[2rem]  bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
        {/* add space  */}

        <div
          id="mean-rating-section"
          className="flex items-center justify-start mb-4 "
        >
          <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
          <div className="flex items-center flex-wrap">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold mr-3 sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl">
              1
            </div>

            <h1 className="font-poppins capitalize text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black text-start">
              Mencari <i>Mean Rating </i> <i>{opsional}</i>
            </h1>
          </div>
        </div>

        <MathJaxContext options={mathjaxConfig}>
          <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full ">
            {/* Membungkus MathJax dengan overflow dan responsif */}
            <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
              <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                {meanFormula.formula}
              </MathJaxComponent>
            </div>
          </div>
        </MathJaxContext>

        <FunctionMeasureDropdown DetailRumus={meanFormula.formula_detail} />

        <div className="px-4 sm:px-8 md:px-10 py-5 ">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary">
            Hasil <i>Mean Rating</i>{" "}
            <i>
              {opsionalModify
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
            </i>
          </h1>

          {/* Tombol dengan ikon */}
          <div
            className="flex items-center justify-end my-4 bg-card_blue_primary p-4 rounded-lg cursor-pointer hover:bg-blue-500 transition-all w-[130px] h-[35px] shadow-md outline outline-2 outline-white"
            onClick={() => setShowModalTutorial(true)}
          >
            {/* Info Button */}
            <IconButton
              className="text-white hover:text-green-500 transition-colors duration-300"
              aria-label="Info"
            >
              <InfoIcon className="text-white hover:text-green-500" />
            </IconButton>

            {/* Tutorial Title */}
            <h1 className="text-md font-medium text-white">Tutorial</h1>
          </div>

          {/* Tabel mean rating */}
          <RenderTableMean />

          {/* Modal pop-up */}
          {showModalTutorial && (
            <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className=" bg-white rounded-lg p-4 md:p-6 shadow-lg w-[90%] sm:w-[600px] relative">
                <button
                  onClick={() => setShowModalTutorial(false)}
                  className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <CloseIcon />{" "}
                  {/* Pastikan CloseIcon adalah komponen atau ikon yang benar */}
                </button>
                <h2 className="text-xl font-semibold mb-6 sm:mb-4">
                  Tutorial rata-rata Measure
                </h2>
                <img
                  src={MeanGif}
                  alt="Video Tutorial Cover"
                  className="w-full h-auto object-cover rounded-md"
                />
                <p className="text-gray-700 text-justify font-semibold my-2">
                  Ini adalah tutorial untuk memberikan informasi tambahan
                  terkait rata-rata <i>Rating</i> cara perhitungan.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setShowModalTutorial(false)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
