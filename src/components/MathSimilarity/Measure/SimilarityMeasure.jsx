import React, { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config.js";
import { FunctionMeasureDropdown } from "../DropdownFunction/FunctionMeasureDropdown.jsx";
import { AllSimilaritas } from "../../../api/getDataSet.js";
import { getFormulaSimilarity } from "./Formula/FormulaSimilarity.jsx";
import ModalSimilarity from "./ModalSimilarityMeasure.jsx";
import DropdownWithDisplay from "../../Graph/DropdownVisual";
import InfoIcon from "@mui/icons-material/Info";
import simGif from "../../../assets/vidioAsset/simGif.gif";
import MathJaxComponent from "../../../MathJaxComponent.js";
import Spinner from "../../Navigate/Spinner.jsx";
import { TutorialModal } from "../../modal/TutorialModal.jsx";
import {
  DividerHeading,
  DividerHeadingBlue,
} from "../../tabelData/DividerHeading.jsx";

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
      <table className="border border-black mt-4 text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
        {children}
      </table>
    </>
  );
};

const HeadTableSimilarity = ({ children, opsional }) => {
  return (
    <thead>
      <tr className={opsional === "user-based" ? "bg-blue-200" : "bg-gray-200"}>
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
    console.log(result["similarity"]);

    if (!result || !result["mean-centered"]) return null;

    return (
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full">
          <TableSimilarity>
            <HeadTableSimilarity opsional={opsional}>
              {Array.from({ length: numberOfColumnsSim }, (_, index) => (
                <th
                  key={index}
                  className={`border border-black px-4 py-2 text-xs sm:text-sm ${opsional === "user-based" ? "bg-blue-200" : ""
                    }`}
                >
                  {!funnyMode
                    ? index + 1
                    : (opsional === "user-based" ? columns : headers)[index]}
                </th>
              ))}
            </HeadTableSimilarity>
            <tbody>
              {result["similarity"].map((row, rowIndex) => (
                <TrTableSimilarity key={rowIndex}>
                  <td
                    className={`border border-black px-4 py-2 ${opsional === "user-based" ? "bg-blue-200" : "bg-gray-200"
                      } text-xs sm:text-sm`}
                  >
                    {!funnyMode
                      ? rowIndex + 1
                      : (opsional === "user-based" ? columns : headers)[
                      rowIndex
                      ]}
                  </td>
                  {row.map((value, colIndex) => {
                    return (
                      <TdTableSimilarity
                        key={colIndex}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                      >
                        {value.toFixed(4)}
                      </TdTableSimilarity>
                    )
                  }
                  )}
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

  const [showSimilarity, setShowSimilarity] = useState(false);
  const toogleShowSimilarity = () => setShowSimilarity((prev) => !prev);

  return (
    <div className="mt-5 bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
      <div className="flex items-center">
        <div
          id="sim-section"
          className="border-l-4 border-card_blue_primary h-10 mr-4"
        />
        {/* Vertical Line */}
        <div className="flex items-center flex-wrap">
          <div className="flex items-center justify-center w-8 h-8 text-lg sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl lg:w-14 lg:h-14 lg:text-3xl bg-blue-500 text-white rounded-full font-semibold mr-3">
            3
          </div>

          <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
            Mencari Fungsi Similaritas {similarity}{" "}
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </h1>
        </div>
      </div>
      <MathJaxContext options={mathjaxConfig}>
        <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
          <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mt-4 text-center sm:text-left">
            <MathJaxComponent>{FormulaSimilarity.formula}</MathJaxComponent>
          </div>
        </div>
      </MathJaxContext>

      <FunctionMeasureDropdown DetailRumus={FormulaSimilarity.detail_formula} />

      <div className="px-4 sm:px-8 md:px-10 py-5">
        <DividerHeadingBlue
          show={showSimilarity}
          onClick={toogleShowSimilarity}
          text={`Similaritas`}
        />

        {showSimilarity && (
          <>
            <div className="mt-4 space-y-4">
              {/* Tombol dengan ikon */}
              <div className="flex justify-center mt-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 bg-card_blue_primary rounded-md cursor-pointer hover:bg-blue-500 transition-all shadow-md outline outline-2 outline-white w-fit"
                  onClick={() => setShowModalTutorial(true)}
                >
                  {/* Info Icon */}
                  <InfoIcon className="text-white text-lg sm:text-xl" />

                  {/* Tutorial Title */}
                  <span className="text-white text-sm sm:text-base font-medium font-poppins">
                    Tutorial
                  </span>
                </div>
              </div>
              {/* Tabel similaritas rating */}
              <RenderTabelSimilarity
                result={result}
                handleMeanClick={handleMeanClick}
                closeModal={closeModal}
              />
              <div>
                <DividerHeading text={"Pilih Visualisasi"} />

                <DropdownWithDisplay
                  result={result}
                  opsional={opsional}
                  similarity={similarity}
                />
              </div>
            </div>
          </>
        )}

        {/* Modal pop-up */}
        {showModalTutorial && (
          <TutorialModal
            title={"Fungsi Similaritas"}
            content={simGif}
            onClose={() => setShowModalTutorial(false)}
          />
        )}
      </div>
    </div>
  );
}
