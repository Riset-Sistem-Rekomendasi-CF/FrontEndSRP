// src/App.js

import React from "react";

function TabelView() {
    const data = [
        ['1', '5', '?', '4', '3', '5', '4'],
        ['2', '4', '5', '?', '3', '2', '3'],
        ['3', '?', '3', '?', '2', '1', '?'],
        ['4', '1', '2', '2', '?', '3', '4'],
        ['5', '1', '?', '1', '2', '3', '3'],
    ];

    const headers = ['U/I', '1', '2', '3', '4', '5', '6'];

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Contain the table in a scrollable wrapper */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-black">
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border border-black px-4 py-2 bg-yellow-btn-primary">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => {
                                // Menentukan kelas berdasarkan nilai sel
                                const isFirstColumn = colIndex === 0; // Mengecek apakah kolom pertama
                                const cellClass = cell === '?' || cell === ''
                                    ? 'border border-black px-4 py-2 text-center bg-red-300'
                                    : `border border-black px-4 py-2 text-center ${isFirstColumn ? 'bg-blue-200' : ''}`; // Warnai kolom pertama

                                return (
                                    <td key={colIndex} className={cellClass}>
                                        {cell}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Keterangan Section */}
            <div className="mt-6 text-left w-full">
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
        </div>
    );
}

export default TabelView;
