import React, { useState } from "react";
import ModalMeanCenteredMeasure from "./ModalMeanCenteredMeasure";
import { getFormulaMeanCentered } from "../Formula/FormulaMeanCentered";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { AllSimilaritas } from "../../../../api/getDataSet";
import { transposeMatrix } from "../../../../helper/helper";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import centerdGif from "../../../../assets/vidioAsset/meanCenGif.gif";
import MathJaxComponent from "../../../../MathJaxComponent";

const MeanCenteredMeasure = ({ opsional, similarity, initialData }) => {
  const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan user yang dipilih
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModalTutorial, setShowModalTutorial] = useState(false); // State untuk menampilkan
  // modal

  const handleMeanClick = (value, rowIndex, colIndex) => {
    setSelectedValue(value); // Simpan nilai mean yang ditekan
    setSelectedIndex([rowIndex, colIndex]);
    setShowModal(true); // Tampilkan modal
  };

  const closeModal = () => {
    setSelectedValue(null); // Reset nilai mean yang dipilih
    setShowModal(false); // Sembunyikan modal
  };

  const [data] = useState(initialData);
  // get only data
  const [dataOnly] = useState(initialData.data);

  const { result } = AllSimilaritas(data, similarity);

  const dataModify =
    similarity === "Adjusted Vector Cosine"
      ? opsional === "user-based"
        ? transposeMatrix(dataOnly)
        : transposeMatrix(dataOnly)
      : opsional === "user-based"
      ? dataOnly
      : transposeMatrix(dataOnly);
  const opsionalModify =
    similarity === "Adjusted Vector Cosine"
      ? opsional === "item-based"
        ? "user-based"
        : "item-based"
      : opsional;
  const FormulaMeanCentered = getFormulaMeanCentered(opsionalModify);

  const RenderTabelMeanCentered = () => {
    if (!result || !result["mean-centered"]) return null;

    const resultModify =
      similarity === "Adjusted Vector Cosine"
        ? transposeMatrix(result["mean-centered"])
        : opsional === "user-based"
        ? result["mean-centered"]
        : transposeMatrix(result["mean-centered"]);

    const numberOfColumns = resultModify[0].length; // Ambil jumlah kolom dari baris pertama

    return (
      <div className="flex justify-center mt-4">
        {/* Wrapper dengan overflow-x-auto untuk scroll horizontal */}
        <div className="overflow-x-auto w-full">
          <table className="border border-black mt-4 min-w-full">
            <thead>
              <tr className="bg-gray-200">
                {/* Kolom pertama (U/I) dengan lebar yang responsif */}
                <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                  U/I
                </th>

                {Array.from({ length: numberOfColumns }, (_, index) => (
                  <th
                    key={index}
                    className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base"
                  >
                    {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultModify.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Kolom pertama (U/I) dengan padding dan lebar responsif */}
                  <td className="border border-black px-4 py-2 bg-gray-200 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                    {rowIndex + 1}
                  </td>

                  {row.map((value, colIndex) => {
                    const OriginalValue =
                      similarity === "Adjusted Vector Cosine"
                        ? opsional === "user-based"
                          ? dataModify[colIndex][rowIndex]
                          : dataModify[colIndex][rowIndex]
                        : opsional === "user-based"
                        ? dataModify[rowIndex][colIndex]
                        : dataModify[colIndex][rowIndex];

                    const IsZero = OriginalValue === 0;

                    return (
                      <td
                        key={colIndex}
                        className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary text-xs sm:text-sm md:text-base ${
                          IsZero ? "bg-red-200" : ""
                        }`}
                        onClick={() =>
                          handleMeanClick(value, rowIndex, colIndex)
                        }
                      >
                        {value.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal jika ada interaksi */}
        {showModal && (
          <ModalMeanCenteredMeasure
            similarity={similarity}
            selectedIndex={selectedIndex}
            selectedValue={selectedValue}
            dataOnly={dataOnly}
            result={result}
            opsional={opsionalModify}
            close={closeModal}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mt-5 bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
      <div className="flex items-center">
        <div
          id="mean-cen-section"
          className="border-l-4 border-card_blue_primary h-10 mr-4"
        />
        {/* Vertical Line */}
        <div className="flex items-center flex-wrap">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold mr-3 sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl">
            2
          </div>

          <h1 className="font-poppins text-xl text-start font-semibold text-black">
            Mencari Mean-Centered <i> Rating </i>{" "}
            <span className="italic">
              {opsional
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
            </span>
          </h1>
        </div>
      </div>

      <MathJaxContext options={mathjaxConfig}>
        <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
          {/* Membungkus MathJax dengan overflow dan responsif */}
          <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
            <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
              {FormulaMeanCentered.formula}
            </MathJaxComponent>
          </div>
        </div>
      </MathJaxContext>
      <FunctionMeasureDropdown
        DetailRumus={FormulaMeanCentered.detail_formula}
      />
      <div className="px-4 sm:px-8 md:px-10 py-5">
        <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Hasil Mean-Centered{" "}
          <span className="italic">
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>
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
        {/* Tabel mean-centerd rating */}
        <RenderTabelMeanCentered />

        {/* Modal pop-up */}
        {showModalTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[600px]">
              <h2 className="text-xl font-semibold mb-4">
                Tutorial Mean-Centered
              </h2>
              <img
                src={centerdGif}
                alt="Video Tutorial Cover"
                className="w-full h-full object-cover"
              />
              <p className="text-gray-700 text-justify font-semibold my-2">
                Ini adalah tutorial untuk memberikan informasi tambahan terkait
                Mean-Centerd <i> Rating </i> cara perhitungan.
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
  );
};

export default MeanCenteredMeasure;
