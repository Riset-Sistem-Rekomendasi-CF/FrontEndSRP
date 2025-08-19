import mathjaxConfig from "../../../../mathjax-config";
import ModalPredictionMeasure from "./ModalPredictionMeasure";
import { getFormulaPrediction } from "../Formula/FormulaPrediction";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import React, { memo, useState } from "react";
import { AllSimilaritas, getInitialData } from "../../../../api/getDataSet";
import { MathJaxContext } from "better-react-mathjax";
import { transposeMatrix } from "../../../../helper/helper";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PrediksiGif from "../../../../assets/vidioAsset/prediksiGIf.gif";
import LegendTable from "../../../tabelData/LegendTable";
import { Input } from "@headlessui/react";
import MathJaxComponent from "../../../../MathJaxComponent";
import ScatterPlot, { VisualChartJs } from "../../../Graph/ChartJsPlot";
import Spinner from "../../../Navigate/Spinner";

export default function PredictionMeasure({
  dataRating,
  opsional,
  similarity,
  headers,
  columns,
  funnyMode,
}) {
  const [kValue, setKValue] = useState(2);
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

  const RenderTabelPrediksi = memo(({ k }) => {
    const initialData = getInitialData(dataRating, opsional, k !== "" ? k : 2);
    const [dataOnly] = useState(initialData.data);

    const [data] = useState(initialData);
    const { result } = AllSimilaritas(data, similarity);
    if (!result || !result["prediction"]) {
      return (
        <>
          <Spinner />
        </>
      );
    }

    return (
      <>
        <div className="flex justify-center mt-4">
          {/* Wrapper with scroll for horizontal overflow */}
          <div className="overflow-x-auto w-full">
            <table className="border border-black mt-4 text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                    U/I
                  </th>
                  {Array.from(
                    { length: result["prediction"][0].length },
                    (_, index) => (
                      <th
                        key={index}
                        className="border border-black px-4 py-2 text-xs sm:text-sm"
                      >
                        {!funnyMode ? index + 1 : headers[index]}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {result["prediction"].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-black px-4 py-2 bg-blue-200 text-xs sm:text-sm">
                      {!funnyMode ? rowIndex + 1 : columns[rowIndex]}
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
                kValue={kValue}
                opsional={opsional}
                similarity={similarity}
                topSimilarities={topSimilarities}
                selectedIndex={selectedIndex}
                data={dataModify}
                dataRating={dataRating}
                result={result}
                close={closeModal}
                selectedValue={selectedValue}
                headers={headers}
                columns={columns}
                funnyMode={funnyMode}
              />
            )}
        </div>
      </>
    );
  });

  const TopNPrediction = ({ k }) => {
    const initialData = getInitialData(dataRating, opsional, k !== "" ? k : 2);
    const [data] = useState(initialData);
    const [dataOnly] = useState(initialData.data);
    const { result } = AllSimilaritas(data, similarity);
    const [selectedUserTopN, setSelectedUserTopN] = useState(null);
    const [topNCount, setTopNCount] = useState(2); // Nilai default untuk Top-N
    const [redCells, setRedCells] = useState([]);

    // untuk validasi ketika top-n lebih dari yang belum di prediksi
    const [showModal, setShowModal] = useState(false);
    const [maxPrediksiKosong, setMaxPrediksiKosong] = useState(0);

    if (!result || !result["prediction"]) return null;

    // Cek apakah nilai prediksi untuk Top-N adalah 0
    const IsZero = (rowIndex, colIndex) => dataOnly[rowIndex][colIndex] === 0;

    // Fungsi untuk mengambil Top-N prediksi berdasarkan user
    const getTopPredictions = (userIndex, result) => {
      if (!result || !result["prediction"]) {
        return [];
      }
      // Ambil prediksi dan urutkan berdasarkan nilai terbesar
      return result["prediction"][userIndex]
        ? result["prediction"][userIndex]
            .map((value, index) => ({ value, index })) // Membuat array objek untuk bisa disort
            .sort((a, b) => b.value - a.value) // Urutkan berdasarkan nilai terbesar
        : [];
    };

    const topNPredictions =
      selectedUserTopN !== null
        ? getTopPredictions(selectedUserTopN, result)
        : [];

    // const handleTopNChange = (e) => {
    //   const value = parseInt(e.target.value, 10);
    //   setTopNCount(Math.min(Math.max(1, value), topNPredictions.length));
    // };

    const handleTopNChange = (e) => {
      const value = parseInt(e.target.value, 10);

      if (selectedUserTopN !== null) {
        const maxAvailable =
          redCellsGroupedByUser[selectedUserTopN]?.length || 0;

        if (value > maxAvailable) {
          setMaxPrediksiKosong(maxAvailable); // simpan info untuk ditampilkan di modal
          setShowModal(true);
          return;
        }
      }

      setTopNCount(Math.max(1, value));
    };

    // Menyaring Top-N berdasarkan jumlah yang diinginkan
    const displayTopPredictions = topNPredictions.slice(0, topNCount);

    // Menangani klik pada sel yang memiliki nilai 0 (bg-red-200)
    const handleMeanClick = (value, rowIndex, colIndex) => {
      // Menyimpan informasi tentang sel yang memiliki bg-red-200
      setRedCells((prevCells) => [...prevCells, { rowIndex, colIndex, value }]);
    };

    // Fungsi untuk mengambil semua nilai yang memiliki bg-red-200, dikelompokkan berdasarkan user (rowIndex)
    const getRedCellsGroupedByUser = () => {
      const groupedCells = {};

      result["prediction"].forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (IsZero(rowIndex, colIndex)) {
            // Jika nilai prediksi adalah 0, masukkan ke dalam kelompok sesuai user (rowIndex)
            if (!groupedCells[rowIndex]) {
              groupedCells[rowIndex] = [];
            }
            groupedCells[rowIndex].push({
              colIndex,
              value,
            });
          }
        });
      });

      return groupedCells;
    };

    // Mengambil data sel-sel yang memiliki bg-red-200 dan dikelompokkan berdasarkan user
    const redCellsGroupedByUser = getRedCellsGroupedByUser();

    // Mengambil prediksi teratas dari pengguna yang dipilih
    const topNPredictionsRedUser =
      selectedUserTopN !== null && redCellsGroupedByUser[selectedUserTopN]
        ? redCellsGroupedByUser[selectedUserTopN]
        : [];

    // Mengurutkan prediksi berdasarkan nilai 'value' dari terbesar ke terkecil
    const sortedTopPredictionsRedUser = topNPredictionsRedUser.sort(
      (a, b) => b.value - a.value
    );

    // Menampilkan topN prediksi untuk pengguna yang dipilih, dengan batasan jumlah topNCount
    const displayTopPredictionsRedUser = sortedTopPredictionsRedUser.slice(
      0,
      topNCount
    );

    // Mengambil index item berdasarkan nilai yang diambil
    const itemIndexes = displayTopPredictionsRedUser.map(
      (pred) => pred.colIndex
    );

    // console.log(itemIndexes); // Menampilkan index item yang dipilih berdasarkan urutan nilai terbesar

    // Mengatur dropdown untuk memilih user
    const handleUserSelectionChange = (e) => {
      const selectedUser = parseInt(e.target.value, 10);
      setSelectedUserTopN(selectedUser);
    };

    return (
      <div>
        <div id="topN-section" className="flex items-center my-5">
          <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
          <h1 className="font-poppins text-start text-xl font-semibold text-black">
            Menghasilkan Top-N Rekomendasi
          </h1>
        </div>
        <div className="text-start">
          <p className="text-gray-700 font-medium ml-5 text-justify">
            Rekomendasi <span className="italic">Top-N</span> untuk <i>user</i>{" "}
            target dihasilkan dengan cara mengurutkan nilai prediksi{" "}
            <span className="italic">rating</span> dari <i>user</i> target
            terhadap daftar <i>item</i> yang belum diberikan <i>rating</i>.
            <br />
            Semakin tinggi nilai prediksi rating suatu <i>item</i>, maka semakin
            di rekomendasikan <i>item</i> tersebut untuk{" "}
            <i className="mr-1">user</i> target. sehingga pengguna akan tau item
            apa saja yang akan direkomendasikan.
          </p>
          {/* user bisa memilih berapa top-n yang ingin */}
          <p className="font-bold  mt-2 ml-5 text-justify">
            Pengguna dapat memilih berapa banyak rekomendasi <i>item</i>{" "}
            <span className="italic">Top-N</span> yang akan ditampilkan dari{" "}
            <i className="mr-1">user </i>target.
          </p>

          <MathJaxContext options={mathjaxConfig}>
            <div className="flex flex-col sm:flex-row my-5 pl-5">
              <div className="border-2 border-black rounded-lg w-full sm:w-fit overflow-x-auto overflow-y-hidden sm:overflow-visible px-2 py-2 sm:px-4 sm:py-3 mx-auto sm:mx-0">
                <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] text-center sm:text-left">
                  <MathJaxComponent>{formula.TopN}</MathJaxComponent>
                </div>
              </div>
              <p className="text-sm sm:text-sm md:text-base lg:text-lg  mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify">
                Dimana himpunan didapatkan berdasarkan urutan nilai similaritas
                (dari yang terbesar ke yang terkecil)
              </p>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown DetailRumus={formula.detailTopN_formula} />

          <div className="flex flex-col md:flex-row md:items-end justify-center gap-4 mt-4">
            {/* Dropdown untuk memilih user */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="user-dropdown"
                className="font-semibold text-base mb-1 block text-gray-800"
              >
                Lihat Top-N Prediksi
              </label>
              <select
                id="user-dropdown"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedUserTopN !== null ? selectedUserTopN : ""}
                onChange={handleUserSelectionChange}
              >
                <option value="" disabled>
                  Pilih User
                </option>
                {result["prediction"].map((_, index) => (
                  <option key={index} value={index}>
                    User{" "}
                    {!funnyMode
                      ? index + 1
                      : (opsional === "user-based" ? columns : headers)[index]}
                  </option>
                ))}
              </select>
            </div>

            {/* Input untuk jumlah Top-N */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="top-n-dropdown"
                className="font-semibold text-base mb-1 block text-gray-800"
              >
                Jumlah Top-N
              </label>
              <input
                type="number"
                id="top-n-dropdown"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={topNCount}
                onChange={handleTopNChange}
                min={1}
                max={topNPredictions.length}
                placeholder="Masukkan jumlah Top-N"
              />
            </div>
          </div>

          {selectedUserTopN !== null && (
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-4xl">
                <p className="ml-5 font-semibold text-lg sm:text-xl mt-5 ">
                  Hasil Prediksi <span className="italic">rating</span> untuk
                  <span className="italic">user </span> target{" "}
                  {selectedUserTopN + 1} :
                </p>
                <div className="overflow-x-auto">
                  <table className="border border-black mt-4 text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                          Rank
                        </th>
                        <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                          Nilai r
                        </th>
                        <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                          Prediksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayTopPredictionsRedUser.map((pred, index) => (
                        <tr
                          key={index}
                          className="border border-black bg-red-200"
                        >
                          <td className="border border-black px-4 py-2 bg-blue-200 text-xs sm:text-sm">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2 font-stix">
                            {!funnyMode ? (
                              <>
                                <span className="relative inline-block">
                                  <sup className="absolute top-0 left-0 text-xs">
                                    ^
                                  </sup>
                                  <span>r</span>
                                </span>
                                <sub>
                                  {selectedUserTopN + 1}
                                  {pred.colIndex + 1}
                                </sub>
                              </>
                            ) : (
                              headers[pred.colIndex]
                            )}
                          </td>
                          <td className="border border-black px-3 py-2">
                            {pred.value.toFixed(3)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <LegendTable
                    list={[
                      {
                        color: "bg-red-200",
                        description: (
                          <p>
                            Menunjukkan hasil prediksi nilai{" "}
                            <i className="mx-1">rating</i> yang belum diketahui
                            sebelumnya.
                          </p>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="flex flex-wrap items-center">
                  <p className="font-semibold text-md sm:text-lg ml-5 my-4 text-justify">
                    Oleh karena{" "}
                    {displayTopPredictionsRedUser
                      .map((pred, idx) => {
                        const rDataTopN = `\\[ {\\widehat{r}_{${
                          selectedUserTopN + 1
                        }${pred.colIndex + 1}}} \\] `;
                        return (
                          <span
                            key={idx}
                            className="inline-block p-0.5 rounded-lg font-bold mx-1 my-0.5"
                          >
                            <MathJaxContext option={mathjaxConfig}>
                              <MathJaxComponent>
                                {!funnyMode
                                  ? rDataTopN
                                  : headers[pred.colIndex]}
                              </MathJaxComponent>
                            </MathJaxContext>
                          </span>
                        );
                      })
                      .reduce((prev, curr, idx, array) => {
                        if (prev === null) {
                          return [curr];
                        }
                        return [
                          ...prev,
                          idx < array.length - 1 ? " > " : " > ",
                          curr,
                        ];
                      }, null)}
                    , maka daftar rekomendasi prediksi <i>ranking</i> Top-N
                    untuk <i>user</i> target{" "}
                    {!funnyMode
                      ? selectedUserTopN + 1
                      : columns[selectedUserTopN]}{" "}
                    adalah sebagai berikut:
                    {displayTopPredictionsRedUser.length > 1
                      ? displayTopPredictionsRedUser.map((pred, idx, array) => (
                          <span key={idx}>
                            <i>
                              Item{" "}
                              {!funnyMode
                                ? pred.colIndex + 1
                                : headers[pred.colIndex]}
                            </i>
                            {idx === array.length - 2
                              ? " dan "
                              : idx === array.length - 1
                              ? ""
                              : ", "}
                          </span>
                        ))
                      : displayTopPredictionsRedUser.map((pred, idx) => (
                          <i key={idx}>
                            Item{" "}
                            {!funnyMode
                              ? pred.colIndex + 1
                              : headers[pred.colIndex]}
                          </i>
                        ))}
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold text-red-600 mb-2">
                Peringatan
              </h2>
              <p className="text-gray-700">
                Jumlah Top-N yang Anda masukkan melebihi jumlah data rating yang
                belum diprediksi.
              </p>
              <p className="mt-2 font-medium">
                Data yang belum diprediksi untuk{" "}
                <i>User-{selectedUserTopN + 1}</i> ini hanya:{" "}
                <span className="font-bold">{maxPrediksiKosong}</span>{" "}
                <i>Item</i> yang belum diprediksi.
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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

          <h1 className="font-poppins text-start text-xl font-semibold text-black">
            Langkah-Langkah Prediksi{" "}
            <span className="italic">
              {opsional
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="text-start sm:ml-5 md:ml-10">
        <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
          1. Menentukan <span className="italic capitalize">{opsional}</span>{" "}
          target
        </h2>

        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          2.{" "}
          {opsional === "user-based" ? (
            <>
              Mencari daftar sistem yang belum diberi <i> rating </i>{" "}
              <i className="italic">user</i> pada target
            </>
          ) : (
            <>
              Mencari daftar <i className="italic">user</i> yang belum memberi{" "}
              <i> rating </i> <i> user </i>
              target
            </>
          )}
        </h2>

        <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
          3. Menentukan tetangga terdekat{" "}
          <span className="italic capitalize">{opsional}</span> target
        </h2>

        <p className="text-gray-700 font-medium ml-5 text-justify text-xs sm:text-sm md:text-base">
          Tetangga terdekat X<sub>u</sub>(j) merupakan himpunan sejumlah k{" "}
          <i>user</i> yang merupakan tetangga terdekat (atau similar dengan){" "}
          <i>user target</i> u, yang telah memberikan <i> rating </i> pada{" "}
          <i>item</i> j
        </p>

        <p className="ml-5 font-semibold text-xs sm:text-sm md:text-base">
          Catatan : | X<sub>u</sub>(j) | ≤ k
        </p>

        <MathJaxContext options={mathjaxConfig}>
          <div className="flex flex-col sm:flex-row my-5 pl-5">
            {/* MathJax Container */}
            <div className="border-2 border-black rounded-lg w-full sm:w-fit overflow-x-auto overflow-y-hidden sm:overflow-visible px-2 py-2 sm:px-4 sm:py-3 mx-auto sm:mx-0">
              <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] text-center sm:text-left">
                <MathJaxComponent>{formula.arg_max}</MathJaxComponent>
              </div>
            </div>

            {/* Deskripsi */}
            <p className="text-sm sm:text-sm md:text-base lg:text-lg  mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify">
              Di mana himpunan didapatkan berdasarkan urutan nilai similaritas
              (dari yang terbesar ke yang terkecil)
            </p>
          </div>
        </MathJaxContext>
        <FunctionMeasureDropdown DetailRumus={formula.detail_ArgMax} />
        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          4. Menentukan prediksi <i> rating </i>
        </h2>
        <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
          5. Menentukan Top-K{" "}
          <span className="italic capitalize">{opsional}</span> target
        </h2>
        <p className="text-gray-700 font-medium ml-5 text-justify text-xs sm:text-sm md:text-base">
          Pengguna dapat menentukan Top-K. Top-K yaitu tetangga terdekat yang
          akan digunakan untuk melihat seberapa mirip{" "}
          <i className="mr-1">user</i> target dari user yang lain.
        </p>
      </div>

      <div className="flex items-center  mt-5">
        <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
        {/* Vertical Line */}
        <h1 className="font-poppins capitalize text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-black text-start">
          Mencari Prediksi{" "}
          <span className="italic">
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>{" "}
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
        <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Hasil Prediksi{" "}
          <span className="italic">
            {opsional
              .toLowerCase()
              .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}
          </span>{" "}
        </h1>

        {/* Tombol dengan ikon */}
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

        <div className="my-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label htmlFor="k" className="font-bold text-gray-800 md:mb-0 mb-1">
            Tentukan nilai TopK:
          </label>

          <div className="inline-flex items-center rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-black w-full md:w-40">
            <Input
              id="itemInput"
              name="k"
              placeholder={kValue}
              type="text"
              className="w-full border-none bg-transparent font-poppins focus:outline-none text-black text-sm"
              onChange={(e) => setKValue(e.target.value)}
            />
          </div>
        </div>

        {/* <button className="bg-purple-btn-primary p-2 text-white rounded-lg " onClick={(e) => setK(kValue)}>Submit</button> */}

        {/*    call api */}

        {kValue !== null && <RenderTabelPrediksi k={kValue} />}
        {/* Modal pop-up */}
        {showModalTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Tutorial Prediksi
              </h2>

              <img
                src={PrediksiGif}
                alt="Video Tutorial Cover"
                className="w-full rounded-md mb-4 object-cover"
              />

              <p className="text-gray-700 text-justify font-medium">
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
        {kValue !== null && <TopNPrediction k={kValue} />}
      </div>
    </div>
  );
}
