import React, { useState } from "react";
import {getInitialData} from "../../api/getDataSet";

function InputList({ children, change, disabled, onDeleteAttempt, isLastInRow, isLastInColumn }) {
    const handleInputChange = (e) => {
        const value = e.target.value;

        // If it's the last value in a row or column, prevent deletion (only allow changing the value)
        if ((isLastInRow || isLastInColumn) && value === "") {
            onDeleteAttempt(); // Trigger alert to prevent deletion
        } else if (/^\d*\.?\d*$/.test(value) && (value === "" || Number(value) <= 5)) {
            change(e); // Allow value change
        }
    };

    return (
        <input
            type="text"
            placeholder={children}
            onChange={handleInputChange}
            value={children === "?" ? "" : children}
            className={`w-full px-4 py-2 text-center ${children === "?" ? 'bg-red-200 text-black' : 'bg-transparent text-black'}`}
            disabled={disabled}
        />
    );
}

export default function TableMatrix({ Data, onDataChange, onDescriptionChange, opsional }) {
    const [data, setData] = useState(Data);
    const initialData = getInitialData(data, opsional);
    const [dataOnly] = useState(initialData.data);
    const [showAlert, setShowAlert] = useState(false); // State to manage modal visibility
    const [alertMessage, setAlertMessage] = useState("");

    const user = dataOnly.length; // Number of items (rows)
    const item = dataOnly.length > 0 ? dataOnly[0].length : 0; // Number of users (columns)

    // Function to check if there are empty values in any row or column
    const checkEmptyRowOrColumn = (data) => {
        // Check for any empty row
        for (let i = 0; i < data.length; i++) {
            if (data[i].every(value => value === 0 || value === "")) {
                return true; // There is an empty row
            }
        }
        // Check for any empty column
        for (let j = 0; j < item; j++) {
            let isColumnEmpty = true;
            for (let i = 0; i < user; i++) {
                if (data[i][j] !== 0 && data[i][j] !== "") {
                    isColumnEmpty = false;
                    break;
                }
            }
            if (isColumnEmpty) return true; // There is an empty column
        }
        return false;
    };

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

    const handleDeleteAttempt = () => {
        setAlertMessage("Anda tidak dapat menghapus nilai terakhir dalam baris atau kolom.");
        setShowAlert(true); // Show alert when the user tries to delete a valid value
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage("");
    };

    const handleSubmit = () => {
        if (checkEmptyRowOrColumn(data)) {
            setShowAlert(true); // Show the alert modal if there are empty rows or columns
            setAlertMessage("Tidak boleh ada kolom atau baris yang kosong!");
        } else {
            console.log("Data is valid. Proceeding with submission.");
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <h1 className='text-2xl font-bold font-poppins py-5 mb-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary'>
                Hasil Tabel Data Matrik <i>Rating</i> Yang Digunakan
            </h1>
            <div className="flex flex-col items-center justify-center p-4">
                <div className="overflow-x-auto w-full"> {/* Pastikan tabel bisa digulir secara horizontal */}
                    <table className="min-w-full border-collapse border border-black">
                        <thead>
                        <tr>
                            <th className="border border-black px-4 py-2 text-center bg-card_green_primary">U/I</th>
                            {Data[0].map((_, index) => (
                                <th key={index}
                                    className="border border-black px-4 py-2 bg-yellow-btn-primary text-sm sm:text-base">
                                    {index + 1}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {Data.map((value, i) => (
                            <tr key={i}>
                                <td className="border border-black px-4 py-2 text-center bg-blue-200 text-sm sm:text-base">{i + 1}</td>
                                {value.map((value1, j) => (
                                    <td key={j} className="border border-black text-center text-black bg-transparent">
                                        <InputList
                                            change={e => changeData(i, j, Number(e.target.value))}
                                            onDeleteAttempt={handleDeleteAttempt} // Pass the delete attempt handler
                                            isLastInRow={j === value.length - 1} // Check if it's the last value in the row
                                            isLastInColumn={i === data.length - 1} // Check if it's the last value in the column
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

            <div className="mt-6 ml-5 text-left w-full">
                <p className="font-bold text-xl ">Keterangan:</p>
                <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
                            ?
                        </div>
                        Data <span className='italic mx-1 '>Rating </span> yang tidak diketahui
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
                        Index <i className="ml-1">User</i>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-yellow-btn-primary border border-1 border-black mr-2"></div>
                        Index <i className="ml-1">Item</i>
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
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                            Tutup
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}