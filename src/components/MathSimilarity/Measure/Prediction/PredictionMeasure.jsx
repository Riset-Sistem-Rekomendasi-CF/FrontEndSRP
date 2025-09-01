import mathjaxConfig from "../../../../mathjax-config";
import ModalPredictionMeasure from "./ModalPredictionMeasure";
import { getFormulaPrediction } from "../Formula/FormulaPrediction";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import React, { memo, useState } from "react";
import { AllSimilaritas, getInitialData } from "../../../../api/getDataSet";
import { MathJaxContext } from "better-react-mathjax";
import { transposeMatrix } from "../../../../helper/helper";
import InfoIcon from "@mui/icons-material/Info";
import PrediksiGif from "../../../../assets/vidioAsset/prediksiGIf.gif";
import { Button, Input } from "@headlessui/react";
import MathJaxComponent from "../../../../MathJaxComponent";
import ScatterPlot, { VisualChartJs } from "../../../Graph/ChartJsPlot";
import Spinner from "../../../Navigate/Spinner";
import { TopNPrediction } from "./TopNPrediction";
import { TutorialModal } from "../../../modal/TutorialModal";
import { PredictionSteps } from "./PredictionSteps";
import { RenderTabelPrediksi } from "./RenderTabelPrediksi";
import { PredictionTopKValidate } from "./PredictionTopKValidate";
import { DividerHeadingBlue } from "../../../tabelData/DividerHeading";

export default function PredictionMeasure({
  dataRating,
  opsional,
  similarity,
  headers,
  columns,
  funnyMode,
}) {
  const [kValue, setKValue] = useState(2);
  const [finalK, setFinalK] = useState(null);
  // const [k, setK] = useState(null);

  const initialData = getInitialData(dataRating, opsional, kValue);
  const [data] = useState(initialData);

  const [dataOnly] = useState(initialData.data);

  const { result } = AllSimilaritas(data, similarity);
  const formula = getFormulaPrediction(similarity, opsional);

  const dataModify =
    opsional === "item-based" || similarity === "Adjusted Vector Cosine"
      ? transposeMatrix(dataOnly)
      : dataOnly;

  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalTutorial, setShowModalTutorial] = useState(false); // State untuk menampilkan
  // modal

  const [selectedIndex, setSelectedIndex] = useState([]);

  const [topSimilarities, setTopSimilarities] = useState([]);

  const findTopSimilaritiesWithValidRatings = (
    similarityData,
    dataModify,
    itemIndex,
    userIndex,
    count = 2
  ) => {
    const similarities = similarityData.map((row, index) => {
      return {
        index,
        value: row[opsional === "user-based" ? userIndex : itemIndex],
        hasRated:
          index === (opsional === "item-based" ? itemIndex : userIndex)
            ? false
            : (opsional === "item-based"
                ? transposeMatrix(dataModify)[userIndex][index]
                : dataModify[index][itemIndex]) !== 0,
      };
    });

    const validSimilarities = similarities
      .filter((item) => item.hasRated)
      .sort((a, b) => b.value - a.value);

    return validSimilarities.slice(0, count);
  };

  const handleMeanClick = (value, rowIndex, colIndex) => {
    setSelectedValue(value);
    setSelectedIndex([rowIndex, colIndex]);
    const top = findTopSimilaritiesWithValidRatings(
      result["similarity"],
      dataModify,
      colIndex,
      rowIndex,
      kValue
    );
    setTopSimilarities(top);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIndex([]);
    setSelectedValue(null);
    setTopSimilarities(null);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // Fungsi untuk toggle teks
  const toggleText = () => setIsExpanded(!isExpanded);

  const [showPrediciton, setShowPrediction] = useState(false);
  const toggleShowPrediction = () => setShowPrediction((prev) => !prev);
  return (
    <div className="mt-5 bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
      <div className="flex items-center mb-5">
        <div
          id="pred-section"
          className="border-l-4 border-card_blue_primary h-10 mr-4"
        />
        {/* Vertical Line */}
        <div className="flex items-center flex-wrap">
          <div className="flex items-center justify-center w-8 h-8 text-lg sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl lg:w-14 lg:h-14 lg:text-3xl bg-blue-500 text-white rounded-full font-semibold mr-3">
            4
          </div>

          <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
            Langkah-Langkah Prediksi{" "}
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </h1>
        </div>
      </div>
      <PredictionSteps opsional={opsional} similarity={similarity} />

      <div className="flex items-center  mt-5">
        <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
        {/* Vertical Line */}
        <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
          Mencari Prediksi{" "}
          {opsional
            .toLowerCase()
            .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
        </h1>
      </div>
      <MathJaxContext options={mathjaxConfig}>
        <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
          <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mt-4 text-center sm:text-left">
            <MathJaxComponent>{formula.formula}</MathJaxComponent>
          </div>
        </div>
      </MathJaxContext>
      <FunctionMeasureDropdown DetailRumus={formula.detail_formula} />
      <div className="px-4 sm:px-8 md:px-10 py-5">
        <DividerHeadingBlue
          show={showPrediciton}
          onClick={toggleShowPrediction}
          text={`Tabel Prediksi Rating`}
        />

        {showPrediciton && (
          <>
            <div className="mt-4 space-y-4">
              <div className="flex justify-center mt-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 bg-card_blue_primary rounded-md cursor-pointer hover:bg-blue-500 transition-all shadow-md outline outline-2 outline-white w-fit"
                  onClick={() => setShowModalTutorial(true)}
                >
                  {/* Info Icon */}
                  <InfoIcon className="text-white text-lg sm:text-xl" />

                  {/* Tutorial Title */}
                  <span className="text-white text-sm sm:text-base font-medium">
                    Tutorial
                  </span>
                </div>
              </div>

              <PredictionTopKValidate
                kValue={kValue}
                setKValue={setKValue}
                setFinalK={setFinalK}
                finalK={finalK}
                dataRating={dataRating}
                opsional={opsional}
                similarity={similarity}
                funnyMode={funnyMode}
                headers={headers}
                columns={columns}
                result={result}
                dataModify={dataModify}
                showModal={showModal}
                selectedIndex={selectedIndex}
                selectedValue={selectedValue}
                topSimilarities={topSimilarities}
                closeModal={closeModal}
                handleMeanClick={handleMeanClick}
              />

              {finalK !== null && (
                <TopNPrediction
                  k={finalK}
                  dataRating={dataRating}
                  opsional={opsional}
                  similarity={similarity}
                  funnyMode={funnyMode}
                  headers={headers}
                  columns={columns}
                  formula={formula}
                />
              )}
            </div>
          </>
        )}

        {/* Modal pop-up */}
        {showModalTutorial && (
          <TutorialModal
            title={"Prediksi"}
            content={PrediksiGif}
            onClose={() => setShowModalTutorial(false)}
          />
        )}
      </div>
    </div>
  );
}
