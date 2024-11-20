import mathjaxConfig from "../../../../mathjax-config";
import ModalPredictionMeasure from "./ModalPredictionMeasure";
import { getFormulaPrediction } from "../Formula/FormulaPrediction";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import React, { useState } from "react";
import { AllSimilaritas } from "../../../../api/getDataSet";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { transposeMatrix } from "../../../../helper/helper";
import {IconButton} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PrediksiGif from "../../../../assets/vidioAsset/prediksiGIf.gif";

export function PredictionMeasure({ opsional, similarity, initialData }) {
  const [data] = useState(initialData);
  const [dataOnly] = useState(initialData.data);
  const formula = getFormulaPrediction(similarity, opsional);

  const dataModify =
    opsional === "item-based" || similarity === "Adjusted Vector Cosine"
      ? transposeMatrix(dataOnly)
      : dataOnly;

  const { result } = AllSimilaritas(data, similarity);

  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalTutorial, setShowModalTutorial] = useState(false); // State untuk menampilkan
  // modal

  const [selectedIndex, setSelectedIndex] = useState([]);

  const [topSimilarities, setTopSimilarities] = useState([]);

  const [selectedUserTopN, setSelectedUserTopN] = useState(null);

  // Fungsi untuk mendapatkan prediksi terbesar dan item terkait
  const getTopPredictions = (userIndex) => {
    // Cek apakah result dan top-n tersedia
    if (!result || !result["top-n"]) {
      return null;
    }

    // Ambil prediksi untuk user yang dipilih berdasarkan userIndex
    const predictions = result["top-n"][userIndex]; // Mengakses berdasarkan userIndex

    console.log("ini adalah top n ", predictions)
    if (!predictions) {
      return null;
    }

    // Mengurutkan prediksi dari terbesar ke terkecil
    return [...predictions].sort((a, b) => b - a);
  };

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
      rowIndex
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

  const RenderTabelPrediksi = () => {
    if (!result || !result["prediction"]) return null;

    return (
        <div className="flex justify-center mt-4">
          {/* Wrapper with scroll for horizontal overflow */}
          <div className="overflow-x-auto w-full">
            <table className="border border-black mt-4 min-w-full">
              <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">U/I</th>
                {Array.from(
                    { length: result["prediction"][0].length },
                    (_, index) => (
                        <th key={index} className="border border-black px-4 py-2 text-xs sm:text-sm">
                          {index + 1}
                        </th>
                    )
                )}
              </tr>
              </thead>
              <tbody>
              {result["prediction"].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-black px-4 py-2 bg-blue-200 text-xs sm:text-sm">
                      {rowIndex + 1}
                    </td>
                    {row.map((value, colIndex) => {
                      const IsZero = dataOnly[rowIndex][colIndex] === 0;
                      return (
                          <td
                              key={colIndex}
                              className={`border border-black px-4 py-2 text-center text-xs sm:text-sm ${
                                  IsZero
                                      ? "bg-red-200 cursor-pointer hover:bg-card_green_primary"
                                      : ""
                              }`}
                              onClick={
                                IsZero
                                    ? () => handleMeanClick(value, rowIndex, colIndex)
                                    : undefined
                              }
                          >
                            {value.toFixed(3)} {/* Format desimal */}
                          </td>
                      );
                    })}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          {/* Show modal */}
          {showModal &&
              selectedIndex[1] !== null &&
              selectedIndex[0] !== null && (
                  <ModalPredictionMeasure
                      opsional={opsional}
                      similarity={similarity}
                      topSimilarities={topSimilarities}
                      selectedIndex={selectedIndex}
                      data={dataModify}
                      result={result}
                      close={closeModal}
                      selectedValue={selectedValue}
                  />
              )}
        </div>
    );
  };


  return (
    <div>
      <div className="flex items-center mb-5">
        <div id="pred-section"  className="border-l-4 border-card_blue_primary h-10 mr-4" />
        {/* Vertical Line */}
        <h1 className="font-poppins text-start text-xl font-semibold text-black">
          Langkah-Langkah Prediksi{" "}
          <span className="italic">
            {opsional
              .replace("-", " ")
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>{" "}
        </h1>
      </div>
      <div className="text-start sm:ml-5 md:ml-10">
        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          1. Menentukan <span className="italic">{opsional.split()[0]}</span> target
        </h2>

        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          2.{" "}
          {opsional === "user-based"
              ? <>Mencari daftar sistem yang belum diberi <i> rating </i> <i
                  className="italic">user</i> target</>
              : <>Mencari daftar <i className="italic">user</i> yang belum
                memberi <i> rating </i> <i> user </i>
                target</>}
        </h2>

        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          3. Menentukan tetangga terdekat{" "}
          <span className="italic">{opsional.split()[0]}</span> target
        </h2>

        <p className="text-gray-700 font-medium ml-5 text-justify text-xs sm:text-sm md:text-base">
          Tetangga terdekat X<sub>u</sub>(j) merupakan himpunan sejumlah k{" "}
          <i>user</i> yang merupakan tetangga terdekat (atau similar dengan){" "}
          <i>user target</i> u, yang telah memberikan <i> rating </i> pada <i>item</i> j
        </p>

        <p className="ml-5 font-semibold text-xs sm:text-sm md:text-base">
          Catatan : | X<sub>u</sub>(j) | ≤ k
        </p>

        <MathJaxContext options={mathjaxConfig}>
          <div className="flex flex-col sm:flex-row my-5 pl-5">
            {/* MathJax Container */}
            <div className="border-2 py-3 px-3 border-black rounded-lg w-full sm:w-auto overflow-x-auto sm:overflow-x-visible">
              <MathJax className="text-xs sm:text-sm md:text-base leading-relaxed">
                {formula.arg_max}
              </MathJax>
            </div>

            {/* Deskripsi */}
            <p className="mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify">
              Di mana himpunan didapatkan berdasarkan urutan nilai similaritas
              (dari yang terbesar ke yang terkecil)
            </p>
          </div>
        </MathJaxContext>

        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          4. Menentukan prediksi <i> rating </i>
        </h2>
      </div>

      <div className="flex items-center  mt-5">
        <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
        {/* Vertical Line */}
        <h1 className="font-poppins text-start text-xl font-semibold text-black">
          Mencari Prediksi{" "}
          <span className="italic">
            {opsional
                .replace("-", " ")
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>{" "}
        </h1>
      </div>
      <MathJaxContext options={mathjaxConfig}>
        <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
          {/* Membungkus MathJax dengan overflow dan responsif */}
          <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
            <MathJax className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
              {formula.formula}
            </MathJax>
          </div>
        </div>
      </MathJaxContext>
      <FunctionMeasureDropdown DetailRumus={formula.detail_formula}/>
        <div className="px-4 sm:px-8 md:px-10 py-5">
          <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary">
            Hasil Prediksi{" "}
            <span className="italic">
            {opsional
                .replace("-", " ")
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>{" "}
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
              <InfoIcon className="text-white hover:text-green-500"/>
            </IconButton>


            {/* Tutorial Title */}
            <h1 className="text-md font-medium text-white">
              Tutorial
            </h1>
          </div>
          {/*    call api */}
          <RenderTabelPrediksi/>

          {/* Modal pop-up */}
          {showModalTutorial && (
              <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-[600px]">
                  <h2 className="text-xl font-semibold mb-4">Tutorial Prediksi </h2>
                  <img
                      src={PrediksiGif}
                      alt="Video Tutorial Cover"
                      className="w-full h-full object-cover"
                  />
                  <p className="text-gray-700 text-justify font-semibold my-2">
                    Ini adalah tutorial untuk memberikan informasi tambahan terkait
                    Prediksi cara perhitungan.
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
          <div id="topN-section" className="flex items-center my-5">
            <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
            {/* Vertical Line */}
            <h1 className="font-poppins text-start text-xl font-semibold text-black">
              Menghasilkan Top-N Rekomendasi{" "}
            </h1>
          </div>
          <div className="text-start">
            {/* Penjelasan Rekomendasi Top-N */}
            <p className={`text-gray-700 font-medium ml-5 text-justify ${isExpanded ? '' : 'line-clamp-3'}`}>
              Rekomendasi <span className="italic">Top-N</span> untuk <i>user</i>{" "}
              target dihasilkan dengan cara mengurutkan nilai prediksi{" "}
              <span className="italic">rating</span> dari <i>user</i> target
              terhadap daftar
              <i> item </i> yang belum diberikan <i>rating</i>. Semakin tinggi nilai
              prediksi rating suatu <i>item</i>, maka semakin di
              direkomendasikan <i>item</i> tersebut untuk <i>user</i> target.
            </p>

            {/* Tampilkan tombol jika teks belum lengkap */}
            {!isExpanded && (
                <button
                    className="ml-5 text-card_blue_primary mt-2 text-sm text-start"
                    onClick={toggleText}
                >
                  Baca Selengkapnya
                </button>
            )}

            {/* Tombol untuk menutup teks */}
            {isExpanded && (
                <button
                    className=" ml-5 text-card_blue_primary mt-2 text-sm text-start"
                    onClick={toggleText}
                >
                  Tampilkan Lebih Sedikit
                </button>
            )}

            {/* MathJaxContext untuk Render Matematika */}
            <MathJaxContext options={mathjaxConfig}>
              <div className="flex flex-col sm:flex-row my-5 pl-5">
                {/* MathJax Container */}
                <div
                    className="border-2 py-3 px-3 border-black rounded-lg w-full sm:w-auto overflow-x-auto sm:overflow-x-visible">
                  <MathJax className="text-xs sm:text-sm md:text-base leading-relaxed">
                    {formula.TopN}
                  </MathJax>
                </div>

                {/* Deskripsi */}
                <p className="mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify">
                  Dimana himpunan didapatkan berdasarkan urutan nilai yang telah
                  diprediksi (dari yang terbesar ke yang terkecil)
                </p>
              </div>
            </MathJaxContext>

            {/* Dropdown untuk memilih user */}
            <div className="mt-4">
              <label
                  htmlFor="user-dropdown"
                  className="font-semibold text-lg ml-5 block"
              >
                Lihat TopN Prediksinya
              </label>
              <select
                  id="user-dropdown"
                  className="ml-5 mt-3 p-2 w-full sm:w-auto border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedUserTopN || ""}
                  onChange={(e) => setSelectedUserTopN(Number(e.target.value))} // Mengurangi 1 karena index dimulai dari 0
              >
                <option value="">Pilih User</option>
                <option value={1}>User 1</option>
                <option value={2}>User 2</option>
                <option value={3}>User 3</option>
                <option value={4}>User 4</option>
                <option value={5}>User 5</option>
              </select>
            </div>


            {/* Menampilkan Hasil Prediksi dan Penjelasan Ranking hanya setelah memilih user */}
            {selectedUserTopN !== null && (
                <>
                  <p className="ml-5 font-semibold text-lg sm:text-xl mt-5">
                    Hasil Prediksi <span className="italic">rating</span> untuk{" "}
                    <span className="italic">user</span> target {selectedUserTopN} :
                  </p>

                  <ul className="ml-5 my-2 font-semibold text-lg sm:text-xl">
                    {/* Akses prediksi dengan indeks yang benar */}
                    {getTopPredictions(selectedUserTopN - 1).map((prediction, index) => (
                        <li key={index} className="my-1">
        <span className="relative inline-block">
          <sup className="absolute top-0 left-0 text-xs">^</sup>
          <span>r</span>
        </span>
                          <sub>
                            {selectedUserTopN}
                            {index + 1}
                          </sub>{" "}
                          = {prediction.toFixed(4)}
                        </li>
                    ))}
                  </ul>

                  {/* Penjelasan Ranking */}
                  <p className="font-semibold text-md sm:text-lg ml-5 my-4 text-justify">
                    Karena
                    {getTopPredictions(selectedUserTopN - 1).map((prediction, index) => (
                        <>
        <span
            key={index}
            className={`p-1 rounded-lg font-bold 
                      ${index === 0
                ? "bg-yellow-300"
                : index === 1
                    ? "bg-blue-300"
                    : "bg-green-300"}`}
        >
          <span className="relative inline-block">
            <sup className="absolute -top-1 left-0 text-xs">^</sup>
            <span>r</span>
          </span>
          <sub>
            {selectedUserTopN}
            {index + 1}
          </sub>
        </span>
                          {/* Menambahkan tanda ">" jika bukan prediksi terakhir */}
                          {index <
                              getTopPredictions(selectedUserTopN - 1).length - 1 &&
                              " > "}
                        </>
                    ))}
                    , maka rekomendasi:
                    {getTopPredictions(selectedUserTopN - 1).length === 1 ? (
                        <>
                          <i>User </i> {selectedUserTopN} lebih direkomendasikan
                          kepada <i> User </i>{" "}
                          {selectedUserTopN}
                        </>
                    ) : (
                        <>
                          Top -{" "}
                          {getTopPredictions(selectedUserTopN - 1)[0] >
                          getTopPredictions(selectedUserTopN - 1)[1]
                              ? "2"
                              : "1"}{" "}
                          lebih direkomendasikan kepada <i>User </i> {selectedUserTopN} ,{" "}
                        </>
                    )}
                    jika dibandingkan dengan <i>User </i> target yang lainnya.
                  </p>
                </>
            )}
          </div>
        </div>
      </div>
      )
      ;
      }

      export default PredictionMeasure;
