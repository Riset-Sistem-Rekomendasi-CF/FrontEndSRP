import React, { useState } from "react";
import { checkEmptyRowOrColumn } from "../../helper/helper";
import EditNoteIcon from "@mui/icons-material/EditNote";

function InputList({
  children,
  rowIndex,
  colIndex,
  change,
  disabled,
  onDeleteAttempt,
  data,
}) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    let dataOnly = data;
    dataOnly[colIndex][rowIndex] = value;

    // If it's the last value in a row or column, prevent deletion (only allow changing the value)
    if (checkEmptyRowOrColumn(data) && checkEmptyRowOrColumn(dataOnly)) {
      onDeleteAttempt("Mohon perbaiki data"); // Trigger alert to prevent deletion
    } else if (
      /^\d*\.?\d*$/.test(value) &&
      (value === "" || Number(value) <= 5)
    ) {
      if (checkEmptyRowOrColumn(dataOnly)) {
        onDeleteAttempt(); // Trigger alert to prevent deletion
      }
      change(e); // Allow value change
    }
  };

  return (
    <input
      type="text"
      placeholder={children}
      onChange={handleInputChange}
      value={children === "?" ? "" : children}
      className={`w-full px-4 py-2 text-center ${children === "?" ? "bg-red-200 text-black" : "bg-transparent text-black"
        }`}
      disabled={disabled}
    />
  );
}

export default function TableMatrix({
  Data,
  onDataChange,
  onDescriptionChange,
  headers,
  columns,
  funnyMode
}) {
  const [data, setData] = useState(Data);
  const [showAlert, setShowAlert] = useState(false); // State to manage modal visibility
  const [alertMessage, setAlertMessage] = useState("");

  const changeData = (i, j, value) => {
    let currentData = [...data];
    if (!currentData[i]) {
      currentData[i] = [];
    }
    currentData[i][j] = value;

    // Check if any row or column is empty after the change
    if (checkEmptyRowOrColumn(currentData)) {
      setShowAlert(true); // Show the alert modal if there are empty rows or columns
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
    setShowAlert(true); // Show alert when the user tries to delete a valid value
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold font-poppins py-5 mb-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
        Hasil Tabel Data Matrik <i>Rating</i> Yang Digunakan
      </h1>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="overflow-x-auto w-full">
          {" "}
          {/* Pastikan tabel bisa digulir secara horizontal */}
          <table className="min-w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2 text-center bg-card_green_primary">
                  U/I
                </th>
                {Data[0].map((_, index) => (
                  <th
                    key={index}
                    className="border border-black px-4 py-2 bg-blue-home text-sm sm:text-base text-white"
                  >
                    {!funnyMode ? (index + 1) : (headers)[index]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Data.map((value, i) => (
                <tr key={i}>
                  <td className="border border-black px-4 py-2 text-center bg-blue-200 text-sm sm:text-base">
                    {!funnyMode ? (i + 1) : (columns)[i]}
                  </td>
                  {value.map((value1, j) => (
                    <td
                      key={j}
                      className="border border-black text-center text-black bg-transparent"
                    >
                      <InputList
                        change={(e) => changeData(i, j, Number(e.target.value))}
                        onDeleteAttempt={handleDeleteAttempt} // Pass the delete attempt handler
                        data={data}
                        rowIndex={j}
                        colIndex={i}
                      >
                        {value1 === 0 ? "?" : value1}
                      </InputList>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="p-2 font-poppins font-semibold text-black bg-blue-200 w-1/1.5 rounded-md shadow-md mx-auto text-center">
        <EditNoteIcon className="mr-2 flex items-center justify-center" />
        Semua Nilai Rating Di atas bisa diedit dan diganti dengan rentang nilai
        rating 1-5.
      </h1>

      <div className="mt-6 ml-5 text-left w-full font-poppins">
        <p className="font-bold text-xl mb-3 ">Keterangan:</p>
        <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
          <li className="flex items-center">
            <div className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
              ?
            </div>
            <p>
              Data <i>sparsity</i>{" "}
            </p>
          </li>
          <li className="flex items-center">
            <div className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
            Index <i className="ml-1">User</i>
          </li>
          <li className="flex items-center">
            <div className="w-10 h-5 bg-blue-home border border-1 border-black mr-2"></div>
            Index <i className="ml-1">Item</i>
          </li>
          <li className="flex items-center">
            <div className="w-10 h-5 flex items-center justify-center border border-1 border-black mr-2">
              1-5
            </div>
            Nilai Rating : 1-5
          </li>
        </ul>
      </div>

      {/* Modal Alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-500">Peringatan!</h2>
            <p className="mt-4">{alertMessage}</p>
            <button
              onClick={closeAlert}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
