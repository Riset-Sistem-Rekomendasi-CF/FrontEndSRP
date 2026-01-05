import { useState } from "react";
import ModalMeanCenteredMeasure from "./ModalMeanCenteredMeasure";
import { getFormulaMeanCentered } from "../Formula/FormulaMeanCentered";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { AllSimilaritas } from "../../../../api/getDataSet";
import InfoIcon from "@mui/icons-material/Info";
import centerdGif from "../../../../assets/vidioAsset/tutorial_asset/mean-centered.gif";
import MathJaxComponent from "../../../../MathJaxComponent";
import Spinner from "../../../Navigate/Spinner";
import { TutorialModal } from "../../../modal/TutorialModal";
import { DividerHeadingBlue } from "../../../tabelData/DividerHeading";

const MeanCenteredMeasure = ({
  opsional,
  similarity,
  initialData,
  headers,
  columns,
  funnyMode,
}) => {
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

  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "item-based"
        ? "user-based"
        : "item-based"
      : opsional;

  // const opsionalModify =
  //   opsional === "user-based"
  //     ? similarity === "Adjusted Cosine"
  //       ? "user-based"
  //       : "item-based"
  //     : opsional;

  const FormulaMeanCentered = getFormulaMeanCentered(opsionalModify);

  const RenderTabelMeanCentered = () => {
    if (!result || !result["mean-centered"]) {
      return (
        <>
          <Spinner />
        </>
      );
    }

    const numberOfColumns =
      result["mean-centered"] && result["mean-centered"][0]
        ? result["mean-centered"][0].length
        : 0;

    return (
      <div className="flex justify-center mt-4">
        {/* Wrapper dengan overflow-x-auto untuk scroll horizontal */}
        <div className="overflow-x-auto w-full rounded-xl">
          <table className="text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                {/* Kolom pertama (U/I) dengan lebar yang responsif */}
                <th className="px-4 py-3 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px] font-semibold border-r border-blue-400">
                  {opsional === "user-based" ? "U/I" : "I/U"}
                </th>

                {Array.from({ length: numberOfColumns }, (_, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-xs sm:text-sm md:text-base font-semibold border-r border-blue-400 last:border-r-0"
                  >
                    {!funnyMode ? index + 1 : headers[index]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result["mean-centered"].map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-all duration-200 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Kolom pertama (U/I) dengan padding dan lebar responsif */}
                  <td className="px-4 py-3 bg-gray-100 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px] font-medium text-gray-700 border-r border-gray-200">
                    {!funnyMode ? rowIndex + 1 : columns[rowIndex]}
                  </td>

                  {row.map((value, colIndex) => {
                    const OriginalValue = dataOnly[rowIndex][colIndex];

                    const IsZero = OriginalValue === 0;

                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-3 text-center cursor-pointer transition-all duration-200 hover:bg-green-100 hover:scale-105 text-xs sm:text-sm md:text-base border-r border-gray-100 last:border-r-0 ${
                          IsZero ? "bg-red-100 text-red-600" : "text-gray-700"
                        }`}
                        onClick={() =>
                          handleMeanClick(value, rowIndex, colIndex)
                        }
                      >
                        <span
                          className={`font-medium ${
                            !IsZero && "hover:text-blue-600"
                          }`}
                        >
                          {value.toFixed(2)}
                        </span>
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
            headers={headers}
            columns={columns}
            funnyMode={funnyMode}
          />
        )}
      </div>
    );
  };

  const [showMeanCentered, setShowMeanCentered] = useState(false);
  const toggleShowMeaCentered = () => setShowMeanCentered((prev) => !prev);

  return (
    <div className="mt-5 bg-yellow-secondary shadow-md p-5 rounded-md outline outline-2 outline-black">
      <div className="flex items-center justify-start mb-4">
        <div
          id="mean-cen-section"
          className="border-l-4 border-card_blue_primary h-10 mr-4"
        />
        {/* Vertical Line */}
        <div className="flex items-center flex-wrap">
          <div className="flex items-center justify-center w-8 h-8 text-lg sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl lg:w-14 lg:h-14 lg:text-3xl bg-blue-500 text-white rounded-full font-semibold mr-3">
            2
          </div>
          <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
            Mencari Mean-Centered Rating {""}
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </h1>
        </div>
      </div>

      <MathJaxContext options={mathjaxConfig}>
        <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
          <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] text-center sm:text-left text-black">
            <MathJaxComponent>{FormulaMeanCentered.formula}</MathJaxComponent>
          </div>
        </div>
      </MathJaxContext>
      <FunctionMeasureDropdown
        DetailRumus={FormulaMeanCentered.detail_formula}
      />
      <div className="px-2 sm:px-4 md:px-6">
        <DividerHeadingBlue
          show={showMeanCentered}
          onClick={toggleShowMeaCentered}
          text={`Mean-Centered`}
        />

        {/* modal mean centered */}
        {showMeanCentered && (
          <>
            <div className="mt-4 space-y-4 text-black">
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
              {/* Tabel mean-centerd rating */}
              <RenderTabelMeanCentered />
            </div>
          </>
        )}
        {/* Modal pop-up */}
        {showModalTutorial && (
          <TutorialModal
            title={"Mean-Centered Rating"}
            content={centerdGif}
            onClose={() => setShowModalTutorial(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MeanCenteredMeasure;
