import { transposeMatrix } from "../../../../helper/helper";
import { getFormulaMean } from "../Formula/FormulaMean";
import ModalMean from "./ModalMean";
import { useState, useMemo } from "react";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { AllSimilaritas } from "../../../../api/getDataSet";
import InfoIcon from "@mui/icons-material/Info";
import MeanGif from "../../../../assets/vidioAsset/tutorial_asset/mean-rating.gif";
import MathJaxComponent from "../../../../MathJaxComponent";
import Spinner from "../../../Navigate/Spinner";
import { TutorialModal } from "../../../modal/TutorialModal";
import { DividerHeadingBlue } from "../../../tabelData/DividerHeading";

export default function MeanMeasure({
  opsional,
  similarity,
  initialData,
  headers,
  columns,
  funnyMode,
}) {
  const [data] = useState(initialData);

  const [dataOnly] = useState(initialData.data);

  const { result } = AllSimilaritas(data, similarity);

  // const opsionalModify =
  //   similarity === "Adjusted Cosine"
  //     ? opsional === "user-based"
  //       ? "item-based"
  //       : "user-based"
  //     : opsional;
  // const dataModify =
  //   similarity === "Adjusted Cosine"
  //     ? opsional === "item-based"
  //       ? dataOnly
  //       : transposeMatrix(dataOnly)
  //     : opsional === "item-based"
  //     ? transposeMatrix(dataOnly)
  //     : dataOnly;

  // use memo
  const opsionalModify = useMemo(() => {
    if (similarity === "Adjusted Cosine") {
      return opsional === "user-based" ? "item-based" : "user-based";
    }
    return opsional;
  }, [similarity, opsional]);

  const dataModify = useMemo(() => {
    if (similarity === "Adjusted Cosine") {
      return opsional === "item-based" ? dataOnly : transposeMatrix(dataOnly);
    } else if (opsional === "item-based") {
      return transposeMatrix(dataOnly);
    }
    return dataOnly;
  }, [similarity, opsional, dataOnly]);

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
  // debug
  // console.log(opsional, similarity);
  // console.log(opsionalModify);
  // console.log("ini adalah data modify", dataModify);

  // console.log("Mean List:", result["mean-list"]);

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
          <div className="overflow-hidden rounded-xl shadow-lg">
            <table className="text-xs sm:text-sm md:text-base lg:text-lg text-black">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="px-6 py-3 font-semibold italic border-r border-blue-400">
                    {opsionalModify === "user-based" ? "U" : "I"}
                  </th>
                  <th className="px-6 py-3 font-semibold italic">μ</th>
                </tr>
              </thead>
              <tbody>
                {result["mean-list"].map((mean, index) => (
                  <tr
                    key={index}
                    className={`transition-all duration-200 hover:bg-green-100 hover:scale-[1.02] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-700 border-r border-gray-200 bg-gray-100">
                      {!funnyMode
                        ? index + 1
                        : (dataModify === "user-based" ? columns : headers)[
                            index
                          ]}
                    </td>
                    <td className="px-6 py-3">
                      <div
                        className="text-center cursor-pointer font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        onClick={() => handleMeanClick(mean, index)}
                      >
                        {mean.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

  const [showMean, setShowMean] = useState(false);
  const toggleShowMean = () => setShowMean((prev) => !prev);

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
            <div className="flex items-center justify-center w-8 h-8 text-lg sm:w-10 sm:h-10 sm:text-xl md:w-12 md:h-12 md:text-2xl lg:w-14 lg:h-14 lg:text-3xl bg-blue-500 text-white rounded-full font-semibold mr-3">
              1
            </div>

            <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
              Mencari Mean Rating {""}
              {opsional}
            </h1>
          </div>
        </div>
        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left text-black">
              <MathJaxComponent>{meanFormula.formula}</MathJaxComponent>
            </div>
          </div>
        </MathJaxContext>

        <FunctionMeasureDropdown DetailRumus={meanFormula.formula_detail} />

        <div className="px-2 sm:px-4 md:px-6">
          <DividerHeadingBlue
            show={showMean}
            onClick={toggleShowMean}
            text={`Mean Rating`}
          />

          {/* modal hasil */}
          {showMean && (
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
                    <span className="text-white text-sm sm:text-base font-medium font-poppins">
                      Tutorial
                    </span>
                  </div>
                </div>

                {/* Tabel mean rating */}
                <RenderTableMean />
              </div>
            </>
          )}

          {/* Modal pop-up */}
          {showModalTutorial && (
            <TutorialModal
              title={"Mean"}
              content={MeanGif}
              onClose={() => setShowModalTutorial(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
