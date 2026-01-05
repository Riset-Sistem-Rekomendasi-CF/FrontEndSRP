import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import InputCell from "./InputCell";
import TableInfo from "./TableInfo";
import TableLegend from "./TableLegend";
import AlertModal from "./AlertModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import WarningLimitModal from "./WarningLimitModal";
import { checkEmptyRowOrColumn } from "../../../helper/helper";

// Batas maksimum yang disarankan
const MAX_USERS = 15;
const MAX_ITEMS = 17;

// Generate random value (1-5 atau 0 untuk sparsity)
const generateRandomValue = (sparsityChance = 0.3) => {
  // sparsityChance = kemungkinan nilai 0 (sparsity)
  if (Math.random() < sparsityChance) {
    return 0; // Data kosong (sparsity)
  }
  return Math.floor(Math.random() * 5) + 1; // Rating 1-5
};

export default function TableMatrix({
  Data,
  onDataChange,
  onDescriptionChange,
  headers,
  columns,
  funnyMode,
}) {
  const [data, setData] = useState(Data);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // State untuk konfirmasi delete
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // 'row' atau 'column'
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // State untuk warning limit
  const [showWarningLimit, setShowWarningLimit] = useState(false);
  const [warningLimitType, setWarningLimitType] = useState(null); // 'row' atau 'column'

  const changeData = (i, j, value) => {
    let currentData = [...data];
    if (!currentData[i]) {
      currentData[i] = [];
    }
    currentData[i][j] = value;

    if (checkEmptyRowOrColumn(currentData)) {
      setShowAlert(true);
      setAlertMessage("Tidak boleh ada kolom atau baris yang kosong!");
    } else {
      setData(currentData);
      onDataChange(currentData);
      onDescriptionChange(false);
    }
  };

  const handleDeleteAttempt = (
    msg = "Anda tidak dapat menghapus nilai terakhir dalam baris atau kolom."
  ) => {
    setAlertMessage(msg);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  // Request delete row dengan konfirmasi
  const requestDeleteRow = (rowIndex) => {
    if (data.length <= 2) {
      setAlertMessage("Minimal harus ada 2 User dalam tabel!");
      setShowAlert(true);
      return;
    }
    setDeleteType("row");
    setDeleteIndex(rowIndex);
    setDeleteName(funnyMode ? columns[rowIndex] : "");
    setShowConfirmDelete(true);
  };

  // Request delete column dengan konfirmasi
  const requestDeleteColumn = (colIndex) => {
    if (data[0].length <= 2) {
      setAlertMessage("Minimal harus ada 2 Item dalam tabel!");
      setShowAlert(true);
      return;
    }
    setDeleteType("column");
    setDeleteIndex(colIndex);
    setDeleteName(funnyMode ? headers[colIndex] : "");
    setShowConfirmDelete(true);
  };

  // Konfirmasi delete
  const confirmDelete = () => {
    let newData;
    if (deleteType === "row") {
      newData = data.filter((_, i) => i !== deleteIndex);
    } else {
      newData = data.map((row) => row.filter((_, j) => j !== deleteIndex));
    }
    setData(newData);
    onDataChange(newData);
    onDescriptionChange(false);
    setShowConfirmDelete(false);
    setDeleteType(null);
    setDeleteIndex(null);
    setDeleteName("");
  };

  // Batal delete
  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeleteType(null);
    setDeleteIndex(null);
    setDeleteName("");
  };

  // Request add row - cek limit dulu
  const requestAddRow = () => {
    if (data.length >= MAX_USERS) {
      setWarningLimitType("row");
      setShowWarningLimit(true);
    } else {
      executeAddRow();
    }
  };

  // Request add column - cek limit dulu
  const requestAddColumn = () => {
    if (data[0].length >= MAX_ITEMS) {
      setWarningLimitType("column");
      setShowWarningLimit(true);
    } else {
      executeAddColumn();
    }
  };

  // Execute add row
  const executeAddRow = () => {
    const colCount = data[0].length;
    const newRow = Array.from({ length: colCount }, () =>
      generateRandomValue()
    );
    if (newRow.every((v) => v === 0)) {
      newRow[Math.floor(Math.random() * colCount)] =
        Math.floor(Math.random() * 5) + 1;
    }
    const newData = [...data, newRow];
    setData(newData);
    onDataChange(newData);
    onDescriptionChange(false);
    setShowWarningLimit(false);
    setWarningLimitType(null);
  };

  // Execute add column
  const executeAddColumn = () => {
    const newData = data.map((row) => {
      const newValue = generateRandomValue();
      return [...row, newValue];
    });
    const lastColIndex = newData[0].length - 1;
    if (newData.every((row) => row[lastColIndex] === 0)) {
      const randomRowIndex = Math.floor(Math.random() * newData.length);
      newData[randomRowIndex][lastColIndex] = Math.floor(Math.random() * 5) + 1;
    }
    setData(newData);
    onDataChange(newData);
    onDescriptionChange(false);
    setShowWarningLimit(false);
    setWarningLimitType(null);
  };

  // Confirm add meskipun melebihi limit
  const confirmAddOverLimit = () => {
    if (warningLimitType === "row") {
      executeAddRow();
    } else {
      executeAddColumn();
    }
  };

  // Cancel warning
  const cancelWarning = () => {
    setShowWarningLimit(false);
    setWarningLimitType(null);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold font-poppins py-5 mb-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
        Hasil Tabel Data Matrik Rating Yang Digunakan
      </h1>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="overflow-x-auto w-full">
          <div className="rounded-xl inline-block min-w-full">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="px-2 py-2 text-center font-bold text-xs sm:text-sm border-r border-blue-400 rounded-tl-xl min-w-[50px]">
                    U/I
                  </th>
                  {data[0].map((_, index) => (
                    <th
                      key={index}
                      className="px-1 py-1 font-semibold text-xs sm:text-sm border-r border-blue-400 min-w-[45px]"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => requestDeleteColumn(index)}
                          className="w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 opacity-70 hover:opacity-100"
                          title={`Hapus Item ${
                            !funnyMode ? index + 1 : headers[index]
                          }`}
                        >
                          <CloseIcon style={{ fontSize: 12 }} />
                        </button>
                        <span className="font-bold">
                          {!funnyMode ? index + 1 : headers[index]}
                        </span>
                      </div>
                    </th>
                  ))}
                  {/* Tombol Add Column */}
                  <th className="px-1 py-1 rounded-tr-xl">
                    <button
                      onClick={requestAddColumn}
                      className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 text-white shadow-md hover:shadow-lg"
                      title={`Tambah Item (Kolom) Baru ${
                        data[0].length >= MAX_ITEMS ? "⚠️" : ""
                      }`}
                    >
                      <AddIcon style={{ fontSize: 14 }} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-all duration-200 hover:bg-blue-50 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-1 py-1 text-center bg-gray-100 font-medium text-gray-700 text-xs sm:text-sm border-r border-gray-200 min-w-[50px]">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => requestDeleteRow(i)}
                          className="w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 opacity-70 hover:opacity-100 text-white flex-shrink-0"
                          title={`Hapus User ${
                            !funnyMode ? i + 1 : columns[i]
                          }`}
                        >
                          <CloseIcon style={{ fontSize: 12 }} />
                        </button>
                        <span className="font-bold">
                          {!funnyMode ? i + 1 : columns[i]}
                        </span>
                      </div>
                    </td>
                    {row.map((value, j) => (
                      <td
                        key={j}
                        className={`text-center transition-all duration-200 border-r border-gray-100 min-w-[40px] ${
                          value === 0 ? "bg-red-100" : ""
                        }`}
                      >
                        <InputCell
                          change={(e) =>
                            changeData(i, j, Number(e.target.value))
                          }
                          onDeleteAttempt={handleDeleteAttempt}
                          data={data}
                          rowIndex={j}
                          colIndex={i}
                        >
                          {value === 0 ? "?" : value}
                        </InputCell>
                      </td>
                    ))}
                    {/* Sel kosong untuk align dengan tombol add column */}
                    <td className="bg-transparent"></td>
                  </tr>
                ))}
                {/* Row untuk tombol Add Row */}
                <tr className="bg-gray-50">
                  <td
                    className="px-2 py-3 text-center"
                    colSpan={data[0].length + 2}
                  >
                    <button
                      onClick={requestAddRow}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-white shadow-md hover:shadow-lg mx-auto font-medium"
                      title={`Tambah User (Baris) Baru ${
                        data.length >= MAX_USERS ? "⚠️" : ""
                      }`}
                    >
                      <AddIcon style={{ fontSize: 18 }} />
                      <span>
                        Tambah User {data.length >= MAX_USERS && "⚠️"}
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h1 className="p-2 font-poppins font-semibold text-black bg-blue-200 w-1/1.5 rounded-md shadow-md mx-auto text-center">
          <EditNoteIcon className="mr-2 flex items-center justify-center" />
          Semua Nilai Rating Di atas bisa diedit dan diganti dengan rentang
          nilai rating 1-5.
        </h1>
      </div>

      <TableInfo data={data} />
      <TableLegend />

      <AlertModal
        isOpen={showAlert}
        message={alertMessage}
        onClose={closeAlert}
      />

      <ConfirmDeleteModal
        isOpen={showConfirmDelete}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        deleteType={deleteType}
        deleteIndex={deleteIndex}
        deleteName={deleteName}
      />

      <WarningLimitModal
        isOpen={showWarningLimit}
        onClose={cancelWarning}
        onConfirm={confirmAddOverLimit}
        limitType={warningLimitType}
        currentCount={
          warningLimitType === "row" ? data.length : data[0]?.length || 0
        }
        maxLimit={warningLimitType === "row" ? MAX_USERS : MAX_ITEMS}
      />
    </div>
  );
}
