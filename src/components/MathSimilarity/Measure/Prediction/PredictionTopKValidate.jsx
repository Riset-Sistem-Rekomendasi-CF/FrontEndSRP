import { useState } from "react";
import { RenderTabelPrediksi } from "./RenderTabelPrediksi";
import SearchIcon from "@mui/icons-material/Search";

export const PredictionTopKValidate = ({
  kValue,
  setKValue,
  setFinalK,
  finalK,
  dataRating,
  opsional,
  similarity,
  funnyMode,
  headers,
  columns,
  result,
  dataModify,
  showModal,
  selectedIndex,
  selectedValue,
  topSimilarities,
  closeModal,
  handleMeanClick,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setFinalK(null); // ✅ Reset saat input berubah

    if (!/^\d*$/.test(value)) {
      setError("Hanya angka tanpa huruf atau simbol.");
      setKValue(value);
      return;
    }

    if (value.length > 1 && value.startsWith("0")) {
      setError("Angka tidak boleh diawali 0.");
      setKValue(value);
      return;
    }

    const numericValue = parseInt(value, 10);
    if (value === "") {
      setError("Input tidak boleh kosong.");
    } else if (numericValue < 1 || numericValue > 16) {
      setError("Hanya boleh angka 1 sampai 16.");
    } else {
      setError("");
    }

    setKValue(value);
  };

  const handleSubmit = () => {
    if (error === "" && kValue !== "") {
      setFinalK(Number(kValue)); // Set nilai final saat valid
    }
  };
  return (
    <>
      <div className="my-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 ">
        <label
          htmlFor="k"
          className="font-bold text-gray-800 md:mb-0 mb-1 font-poppins"
        >
          Tentukan nilai TopK:
        </label>

        <div className="w-full md:w-40">
          <div
            className={`inline-flex items-center rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ${
              error
                ? "ring-red-500"
                : "border-gray-700 focus-within:ring-blue-500"
            }`}
          >
            <input
              id="itemInput"
              name="k"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={2}
              placeholder="1-16"
              className="w-full border-none bg-transparent font-poppins focus:outline-none text-black text-sm "
              value={kValue}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="mt-2 inline-block rounded bg-red-100 px-2 py-1 text-xs text-red-700">
              {error}
            </div>
          )}
        </div>
        <div className="p-2 rounded-lg shadow-sm bg-sky-500 hover:bg-sky-700">
          <button
            className="text-white"
            onClick={handleSubmit}
            disabled={!!error || kValue === ""}
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>

      {finalK && (
        <RenderTabelPrediksi
          kValue={finalK}
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
      )}
    </>
  );
};
