import React, { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config.js";
import { FunctionMeasureDropdown } from "../DropdownFunction/FunctionMeasureDropdown.jsx";
import { AllSimilaritas } from "../../../api/getDataSet.js";
import { getFormulaSimilarity } from "./Formula/FormulaSimilarity.jsx";
import ModalSimilarity from "./ModalSimilarityMeasure.jsx";
import DropdownWithDisplay from "../../Graph/DropdownVisual";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import simGif from "../../../assets/vidioAsset/simGif.gif";
import MathJaxComponent from "../../../MathJaxComponent.js";
import Spinner from "../../Navigate/Spinner.jsx";

/**
 * |----------------------------------------------------|
 * |                                                    |
 * |                                                    |
 * |                    Component Table                 |
 * |                                                    |
 * |                                                    |
 * |----------------------------------------------------|
 *
 */
const TableSimilarity = ({ children }) => {
  return (
    <>
      <table className="border border-black mt-4 min-w-full">{children}</table>
    </>
  );
};

const HeadTableSimilarity = ({ children, opsional }) => {
  return (
    <thead>
      <tr className={opsional == "user-based" ? "bg-blue-200" : "bg-gray-200"}>
        <th className="border border-black px-4 py-2">
          {opsional === "user-based" ? "U/U" : "I/I"}
        </th>
        {children}
      </tr>
    </thead>
  );
};

const TrTableSimilarity = ({ children }, key) => {
  return <tr>{children}</tr>;
};

const TdTableSimilarity = ({ rowIndex, colIndex, onClick, children }, key) => {
  return (
    <td
      className={`border border-black px-4 py-2 text-center text-xs sm:text-sm cursor-pointer hover:bg-card_green_primary ${rowIndex === colIndex ? "bg-red-200" : ""
        }`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

export default function SimilarityMeasure({
  opsional,
  similarity,
  initialData,
  headers,
  columns,
  funnyMode,
}) {
  const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
  const [selectedIndex, setSelectedIndex] = useState(null); // State untuk menyimpan user yang dipilih
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal

  const [showModalTutorial, setShowModalTutorial] = useState(false); // State untuk menampilkan
  // modal

  const [data] = useState(initialData);
  // get only data
  const [dataOnly] = useState(initialData.data);

  const { result } = AllSimilaritas(data, similarity);

  //   console.log("result", result);
  //   console.log("dataOnly", dataOnly);
  const FormulaSimilarity = getFormulaSimilarity(similarity, opsional);

  const handleMeanClick = (value, rowIndex, colIndex) => {
    setSelectedMean(value); // Simpan nilai mean yang ditekan
    setSelectedIndex([rowIndex, colIndex]);
    setShowModal(true); // Tampilkan modal
  };

  const closeModal = () => {
    setShowModal(false); // Sembunyikan modal
    setSelectedMean(null); // Reset nilai mean yang dipilih
    setSelectedIndex(null);
  };

  const RenderTabelSimilarity = () => {
    if (!result || !result["similarity"]) {
      return (
        <>
          <Spinner />
        </>
      );
    }
    const numberOfColumnsSim = result["similarity"][0].length;
    // console.log(result["similarity"]);

    if (!result || !result["mean-centered"]) return null;

    return (
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full">
          <TableSimilarity>
            <HeadTableSimilarity opsional={opsional}>
              {Array.from({ length: numberOfColumnsSim }, (_, index) => (
                <th
                  key={index}
                  className={`border border-black px-4 py-2 text-xs sm:text-sm ${opsional == "user-based" ? "bg-blue-200" : ""}`}
                >
                  {!funnyMode ? (index + 1) : (opsional == "user-based" ? columns : headers)[index]}
                </th>
              ))}
            </HeadTableSimilarity>
            <tbody>
              {result["similarity"].map((row, rowIndex) => (
                <TrTableSimilarity key={rowIndex}>
                  <td className={`border border-black px-4 py-2 ${opsional == "user-based" ? "bg-blue-200" : "bg-gray-200"} text-xs sm:text-sm`}>
                    {!funnyMode ? (rowIndex + 1) : (opsional == "user-based" ? columns : headers)[rowIndex]}
                  </td>
                  {row.map((value, colIndex) => (
                    <TdTableSimilarity
                      key={colIndex}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                    >
                      {value.toFixed(4)}
                    </TdTableSimilarity>
                  ))}
                </TrTableSimilarity>
              ))}
            </tbody>
          </TableSimilarity>
          {showModal && (
            <ModalSimilarity
              similarity={similarity}
              opsional={opsional}
              close={closeModal}
              selectedIndex={selectedIndex}
              selectedMean={selectedMean}
              dataOnly={dataOnly}
              data={result}
              headers={headers}
              columns={columns}
              funnyMode={funnyMode}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
      <div className="flex items-center">
        <div
          id="sim-section"
          className="border-l-4 border-card_blue_primary h-10 mr-4"
        />
        {/* Vertical Line */}
        <div className="flex items-center flex-wrap">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold mr-3 sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl">
            3
          </div>

          <h1 className="font-poppins text-xl text-start font-semibold text-black">
            Mencari Fungsi Similaritas{" "}
            <span className="italic">
              {" "}
              {similarity}{" "}
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
              {FormulaSimilarity.formula}
            </MathJaxComponent>
          </div>
        </div>
      </MathJaxContext>

      <FunctionMeasureDropdown DetailRumus={FormulaSimilarity.detail_formula} />

      <div className="px-4 sm:px-8 md:px-10 py-5">
        <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Hasil Fungsi Similaritas{" "}
          <span className="italic">
            {" "}
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
        {/* Tabel similaritas rating */}
        <RenderTabelSimilarity
          result={result}
          handleMeanClick={handleMeanClick}
          closeModal={closeModal}
        />

        {/* Modal pop-up */}
        {showModalTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[600px]">
              <h2 className="text-xl font-semibold mb-4">
                Tutorial Similaritas
              </h2>
              <img
                src={simGif}
                alt="Video Tutorial Cover"
                className="w-full h-full object-cover"
              />
              <p className="text-gray-700 text-justify font-semibold my-2">
                Ini adalah tutorial untuk memberikan informasi tambahan terkait
                Similaritas cara perhitungan.
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

      <div>
        <h1 className="font-semibold text-xl my-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          PILIH VISUALISASI FUNGSI SIMILARITAS{" "}
        </h1>

        <DropdownWithDisplay
          result={result}
          opsional={opsional}
          similarity={similarity}
        />
      </div>
    </div>
  );
}
