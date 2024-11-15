import React, { useState } from "react";
import {getInitialData} from "../../api/getDataSet";

function InputList({ children, change }) {
    const handleInputChange = (e) => {
        const value = e.target.value;

        if (/^\d*\.?\d*$/.test(value) && Number(value) <= 5) {
            change(e)
        }
    };
    return (
        <input
            type="text"
            placeholder={children}
            onChange={handleInputChange}
            value={children === "?" ? "" : children}
            className={`w-full px-4 py-2 text-center ${children === "?" ? 'bg-red-200 text-black' : 'bg-transparent text-black'}`}
        />
    );
}

export default function TableMatrix({ Data, onDataChange, onDescriptionChange, opsional }) {
    const [data, setData] = useState(Data)
    const initialData = getInitialData(data, opsional);
    const [dataOnly] = useState(initialData.data);


    const user = dataOnly.length; // Number of items (rows)
    const item = dataOnly.length > 0 ? dataOnly[0].length : 0; // Number of users (columns)

    const changeData = (i, j, value) => {
        let currentData = [...data];
        if (!currentData[i]) {
            currentData[i] = [];
        }
        currentData[i][j] = value;

        setData(currentData);
        onDataChange(currentData);
        onDescriptionChange(false);
    };

    return (
        <div className="flex flex-col justify-center">
            <h1 className='text-2xl font-bold font-poppins py-5 mb-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary'>
                Hasil Tabel Data Matrik Yang Digunakan
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

            <div className="mt-6 text-left w-full">
                <p className="font-bold text-xl ">Keterangan:</p>
                <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
                            ?
                        </div>
                        Data rating yang tidak diketahui
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
                        Index User
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-yellow-btn-primary border border-1 border-black mr-2"></div>
                        Index Item
                    </li>
                </ul>
            </div>
        </div>
    );
}
