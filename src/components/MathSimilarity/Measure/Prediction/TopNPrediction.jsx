import { useEffect, useState } from "react";
import { AllSimilaritas, getInitialData } from "../../../../api/getDataSet";
import LegendTable from "../../../tabelData/LegendTable";
import { MathJaxContext } from "better-react-mathjax";
import MathJaxComponent from "../../../../MathJaxComponent";
import warningSvg from "../../../../assets/icons/warning.svg";
import mathjaxConfig from "../../../../mathjax-config";
import { getFormulaPrediction } from "../Formula/FormulaPrediction";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import CloseIcon from "@mui/icons-material/Close";
import { DividerHeading, OnlyDivider } from "../../../tabelData/DividerHeading";

export const TopNPrediction = ({
  k,
  dataRating,
  similarity,
  funnyMode,
  opsional,
  columns,
  headers,
}) => {
  const initialData = getInitialData(dataRating, opsional, k !== "" ? k : 2);
  const [data] = useState(initialData);
  const [dataOnly] = useState(initialData.data);
  const { result } = AllSimilaritas(data, similarity);
  const [selectedUserTopN, setSelectedUserTopN] = useState(null);
  const [topNCount, setTopNCount] = useState(1); // Nilai default untuk Top-N
  const [redCells, setRedCells] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [maxPrediksiKosong, setMaxPrediksiKosong] = useState(0);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000); // 4 detik

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!result || !result["prediction"]) return null;

  // Cek apakah nilai prediksi untuk Top-N adalah 0
  const IsZero = (rowIndex, colIndex) => dataOnly[rowIndex][colIndex] === 0;
  const formula = getFormulaPrediction(similarity, opsional);

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
      const maxAvailable = redCellsGroupedByUser[selectedUserTopN]?.length || 0;

      if (value > maxAvailable) {
        setMaxPrediksiKosong(maxAvailable); // simpan info untuk ditampilkan di modal
        setShowToast(true);
        return;
      }
    }

    setTopNCount(Math.max(1, value));
  };

  // Menyaring Top-N berdasarkan jumlah yang diinginkan
  // const displayTopPredictions = topNPredictions.slice(0, topNCount);

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
  const itemIndexes = displayTopPredictionsRedUser.map((pred) => pred.colIndex);

  // console.log(itemIndexes); // Menampilkan index item yang dipilih berdasarkan urutan nilai terbesar

  // Mengatur dropdown untuk memilih user
  const handleUserSelectionChange = (e) => {
    const selectedUser = parseInt(e.target.value, 10);
    setSelectedUserTopN(selectedUser);
  };

  return (
    <div>
      <div id="topN-section" className="flex items-center my-4 md:my-5">
        <div className="border-l-4 border-card_blue_primary h-8 sm:h-10 mr-2 sm:mr-4" />
        <h1 className="font-poppins text-start text-lg sm:text-xl font-semibold text-black">
          Menghasilkan Top-N Rekomendasi
        </h1>
      </div>
      <div className="text-start px-4 sm:px-5">
        <p className="text-gray-700 font-medium text-justify font-poppins">
          Rekomendasi Top-N untuk user target dihasilkan dengan cara mengurutkan
          nilai prediksi Rating dari user target terhadap daftar item yang belum
          diberikan rating.
          <br />
          Semakin tinggi nilai prediksi rating suatu item, maka semakin di
          rekomendasikan item tersebut untuk user target. sehingga pengguna akan
          tau item apa saja yang akan direkomendasikan.
        </p>
        {/* user bisa memilih berapa top-n yang ingin */}
        <p className="font-bold mt-2 text-justify font-poppins">
          Pengguna dapat memilih berapa banyak rekomendasi item Top-N yang akan
          ditampilkan dari user target. Tetapi tidak boleh melebihi dari user
          yang belum memberikan rating
        </p>

        <MathJaxContext options={mathjaxConfig}>
          <div className="flex flex-col sm:flex-row my-5 sm:pl-5">
            <div className="border-2 border-black rounded-lg w-full sm:w-fit overflow-x-auto overflow-y-hidden sm:overflow-visible px-2 py-2 sm:px-4 sm:py-3 mx-auto sm:mx-0">
              <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] text-center sm:text-left">
                <MathJaxComponent>{formula.TopN}</MathJaxComponent>
              </div>
            </div>
            <p className="text-sm sm:text-sm md:text-base lg:text-lg  mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify font-poppins">
              Dimana himpunan didapatkan berdasarkan urutan nilai similaritas
              (dari yang terbesar ke yang terkecil)
            </p>
          </div>
        </MathJaxContext>

        <FunctionMeasureDropdown DetailRumus={formula.detailTopN_formula} />

        <div className="my-5 mx-2 sm:mx-5 bg-green-200 rounded-md shadow-sm border border-black p-3 sm:p-4">
          <div className="flex flex-col md:flex-row md:items-end justify-center gap-4 ">
            {/* Dropdown untuk memilih user */}
            <div className="w-full md:max-w-xs">
              <label
                htmlFor="user-dropdown"
                className="font-semibold text-base mb-1 block text-gray-800 font-poppins"
              >
                Lihat Top-N Prediksi
              </label>
              <select
                id="user-dropdown"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-poppins"
                value={selectedUserTopN !== null ? selectedUserTopN : ""}
                onChange={handleUserSelectionChange}
              >
                <option value="" disabled className="font-poppins">
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
            <div className="w-full md:max-w-xs">
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
                <p className="font-semibold text-base sm:text-lg md:text-xl mt-5 font-poppins text-center">
                  Hasil Prediksi rating untuk user target {selectedUserTopN + 1}{" "}
                  :
                </p>
                <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
                  <table className="min-w-full text-sm border-separate border-spacing-0 rounded-md shadow overflow-hidden">
                    <thead>
                      <tr className="bg-purple-600 text-white font-poppins">
                        <th className="px-2 sm:px-4 py-2 border border-purple-500">
                          Rank
                        </th>
                        <th className="px-2 sm:px-4 py-2 border border-purple-500">
                          Nilai r
                        </th>
                        <th className="px-2 sm:px-4 py-2 border border-purple-500">
                          Prediksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayTopPredictionsRedUser.map((pred, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-pink-100" : "bg-pink-200"
                          } text-gray-800`}
                        >
                          <td className="px-2 sm:px-4 py-2 text-sm font-poppins font-medium bg-yellow-200 border border-gray-300 text-center">
                            {index + 1}
                          </td>
                          <td className="px-2 sm:px-4 py-2 font-stix border border-gray-300 text-center">
                            {!funnyMode ? (
                              <>
                                <span className="relative inline-block align-top">
                                  <sup className="text-xs">^</sup>
                                </span>
                                <span>r</span>
                                <sub>
                                  {selectedUserTopN + 1}
                                  {pred.colIndex + 1}
                                </sub>
                              </>
                            ) : (
                              headers[pred.colIndex]
                            )}
                          </td>
                          <td className="px-4 py-2 font-semibold border border-gray-300 text-center">
                            {pred.value.toFixed(3)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="m-5">
          <LegendTable
            list={[
              {
                color: "bg-red-200",
                description: (
                  <p>
                    Menunjukkan hasil prediksi nilai rating yang belum diketahui
                    sebelumnya.
                  </p>
                ),
              },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center my-5 mx-2 sm:mx-5">
          <DividerHeading text={"Hasil Rangking Top-N Rekomendasi"} />
          <div className="bg-blue-200 rounded-md shadow-sm p-3 sm:p-4 border border-black w-full">
            <div className="font-semibold text-base sm:text-lg text-justify">
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
                          {!funnyMode ? rDataTopN : headers[pred.colIndex]}
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
              , maka daftar rekomendasi prediksi rangking Top-N untuk user
              target{" "}
              {!funnyMode ? selectedUserTopN + 1 : columns[selectedUserTopN]}{" "}
              adalah sebagai berikut:
              {displayTopPredictionsRedUser.length > 1
                ? displayTopPredictionsRedUser.map((pred, idx, array) => (
                    <span key={idx}>
                      Item{" "}
                      {!funnyMode ? pred.colIndex + 1 : headers[pred.colIndex]}
                      {idx === array.length - 2
                        ? " dan "
                        : idx === array.length - 1
                        ? ""
                        : ", "}
                    </span>
                  ))
                : displayTopPredictionsRedUser.map((pred, idx) => (
                    <p key={idx}>
                      Item{" "}
                      {!funnyMode ? pred.colIndex + 1 : headers[pred.colIndex]}
                    </p>
                  ))}
              .
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="bg-yellow-100 border border-yellow-400 text-red-700 px-4 py-3 rounded relative mt-2 w-11/12 max-w-xl mx-auto shadow-sm transition-all duration-300 font-poppins text-sm sm:text-base">
          <strong className="font-bold">Peringatan: </strong>
          <span className="block sm:inline">
            Jumlah Top-N tidak boleh melebihi jumlah item yang belum diberi
            rating ({maxPrediksiKosong} item tersedia).
          </span>
          <button
            onClick={() => setShowToast(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <title>Tutup</title>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
};
