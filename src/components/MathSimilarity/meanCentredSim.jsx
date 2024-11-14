import React, { useEffect, useState } from 'react'
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import { FunctionMeasureDropdown } from "./DropdownFunction/FunctionMeasureDropdown";
import { AllSimilaritas, getInitialData } from "../../api/getDataSet";

import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const meanCenterdRatingUserBased = [
    `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
];

//keterangan rumus mean-CENTERD

const DetailRumusMeanCenUserBased = [
    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
]

export function MeanCenteredSimUserBased({ opsional, similaritas }) {

    const [selectedMeanCell, setSelectedMeanCell] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null }); // State untuk melacak sel yang dipilih
    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [centeredValue, setCenteredValue] = useState('');

    const [selectedExpression, setSelectedExpression] = useState(null);
    const [selectedIndices, setSelectedIndices] = useState(null);


    const handleMeanClick = (value, rowIndex, colIndex) => {
        const expression = MeanCenIndex(rowIndex, colIndex); // Generate LaTeX expression
        // const MeanExp = CenterdValue(rowIndex, colIndex);
        setSelectedExpression([expression]); //
        setSelectedIndices({ row: rowIndex + 1, col: colIndex + 1 })
        setSelectedValue(value); // Simpan nilai mean yang ditekan
        setSelectedCell({ row: rowIndex, col: colIndex });
        // console.log(`Value: ${value}, User: ${rowIndex + 1}, Item: ${colIndex + 1}`);
        setSelectedMeanCell(rowIndex);
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedValue(null); // Reset nilai mean yang dipilih
    };






    const initialData = getInitialData(opsional);
    const [data] = useState(initialData);
    // get only data
    const [dataOnly] = useState(initialData.data);

    const { result } = AllSimilaritas(data, similaritas);



    // index cen
    const MeanCenIndex = (rowIndex, colIndex) => {
        return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = r_{${rowIndex + 1}${colIndex + 1}} -\\mu_{${rowIndex + 1}} \\]`;
    };



    useEffect(() => {
        const selectedValue = selectedCell.row !== null && selectedCell.col !== null ? dataOnly[selectedCell.row][selectedCell.col] : null;
        const selectedMeanValue = selectedMeanCell !== null ? result['mean-list'][selectedMeanCell] : null;

        if (selectedValue !== null && selectedMeanValue !== null) {
            setCenteredValue(`\\[ S_{${selectedCell.row + 1}${selectedCell.col + 1}} = ${selectedValue} - ${selectedMeanValue} \\]`);
        } else {
            setCenteredValue('');
        }
    }, [selectedCell, selectedMeanCell, dataOnly, result]);


    // const MeanCenIdx = MeanCenIndex();
    const RenderUserTabelMeanCenterdPCC = () => {
        if (!result || !result['mean-centered']) return null;

        const numberOfColumns = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4 ">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">U/I</th>
                            {Array.from({ length: numberOfColumns }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result['mean-centered'].map((row, rowIndex) => (
                            <tr key={rowIndex} >
                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                {row.map((value, colIndex) => {
                                    const OriginalValue = dataOnly[rowIndex][colIndex];
                                    const IsZero = OriginalValue === 0;
                                    return (
                                        <td key={colIndex}
                                            className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${IsZero ? 'bg-red-200' : ''}`}
                                            onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                                        >
                                            {value.toFixed(1)} {/* Format desimal */}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg ">
                            <h1 className='text-lg font-semibold mb-4'>Detail Menghitung <span
                                className='italic'>Mean-Centerd</span> untuk setiap Data rating yang diketahui </h1>

                            {/* Menampilkan rumus mean menggunakan MathJax */}

                            <div className='flex flex-row justify-center m-3'>
                                {/*tabel data rating */}
                                <div>
                                    <h2 className='font-semibold'>Data Rating (r)</h2>
                                    <table className="border border-black mt-4 mr-3">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-black px-4 py-2">U/I</th>
                                                {Array.from({ length: dataOnly[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                                    <th key={index}
                                                        className="border border-black px-4 py-2">{index + 1}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataOnly.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                                    {row.map((value, colIndex) => {
                                                        const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;
                                                        const cellClass = value === 0
                                                            ? 'border border-black px-4 py-2 text-center text-red-500'
                                                            : 'border border-black px-4 py-2 text-center';
                                                        return (
                                                            <td key={colIndex}
                                                                // className="border border-black px-4 py-2 text-center"
                                                                className={`${cellClass} ${isSelected ? 'bg-card_green_primary' : ''}`}
                                                            >
                                                                {value.toFixed ? value.toFixed(0) : value} {/* Format desimal hanya jika diperlukan */}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <h2 className='font-semibold'>Hasil Mean Rating (μ)</h2>
                                    <table className="borDder border-black mt-4 ml-3">
                                        <thead>
                                            <tr className=" bg-gray-200">
                                                <th className="border border-black px-4 py-2">U</th>
                                                <th className="border border-black italic px-4 py-2">μ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result['mean-list'].map((mean, index) => (
                                                <tr key={index}>
                                                    <td className="border border-black px-4 py-2 ">{index + 1}</td>
                                                    <td className={`border border-black px-4 py-2 text-center 
                                                            ${selectedMeanCell === index ? 'bg-yellow-200' : ''}`}
                                                    >
                                                        <div className='text-center'
                                                        >
                                                            {mean}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex items-center my-4">
                                <WarningAmberIcon className="text-yellow-500 mr-2" />
                                <h2 className="text-md font-semibold">
                                    Catatan jika ada <span className='text-red-600 underline'>data rating adalah 0</span>  kemudian dikurangi dengan mean (μ) akan
                                    menghasilkan <span className='text-red-600 underline'>nilai 0</span> atau diabaikan.
                                </h2>
                            </div>

                            <h2 className='font-semibold text-xl'>Rumus Mean-Centerd </h2>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression} />
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {centeredValue ? (
                                        <MathJaxComponent math={centeredValue} />
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <h2 className='font-semibold text-xl text-gray-700'>Hasil dari Mean-Centerd
                                adalah {selectedValue.toFixed(2)} </h2>


                            {/* Menampilkan perhitungan manual */}

                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={closeModal} // Menutup modal saat tombol ditekan
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                )}
            </div>
        );
    };
    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean-Centered Rating
                    User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math} />
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusMeanCenUserBased} />

            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centerd User-Based</h1>
                {/*    call api */}
                <RenderUserTabelMeanCenterdPCC />
            </div>
        </div>
    )
}


//ITEM-BASED

const meanCenterdRatingItemBased = [
    `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`
]

const DetailRumusMeanCenItemBased = [
    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function MeanCenteredSimItemBased({ opsional, similaritas }) {

    const [selectedMeanCell, setSelectedMeanCell] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null }); // State untuk melacak sel yang dipilih
    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [centeredValue, setCenteredValue] = useState('');

    const [selectedExpression, setSelectedExpression] = useState(null);
    const [selectedIndices, setSelectedIndices] = useState(null);


    const handleMeanClick = (value, rowIndex, colIndex) => {
        const expression = MeanCenIndex(rowIndex, colIndex); // Generate LaTeX expression
        // const MeanExp = CenterdValue(rowIndex, colIndex);
        setSelectedExpression([expression]); //
        setSelectedIndices({ row: rowIndex + 1, col: colIndex + 1 })
        setSelectedValue(value); // Simpan nilai mean yang ditekan
        setSelectedCell({ row: rowIndex, col: colIndex });
        // console.log(`Value: ${value}, User: ${rowIndex + 1}, Item: ${colIndex + 1}`);
        setSelectedMeanCell(colIndex);
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedValue(null); // Reset nilai mean yang dipilih
    };



    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    // get only data
    const [dataOnly, setDataOnly] = useState(initialData.data);
    const transposedData = dataOnly[0].map((_, colIndex) =>
        dataOnly.map(row => row[colIndex])
    );

    const { result, error } = AllSimilaritas(data, similaritas);


    const MeanCenIndex = (rowIndex, colIndex) => {
        return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = r_{${rowIndex + 1}${colIndex + 1}} -\\mu_{${rowIndex + 1}} \\]`;
    };


    useEffect(() => {
        const selectedValue = selectedCell.row !== null && selectedCell.col !== null ? dataOnly[selectedCell.row][selectedCell.col] : null;
        const selectedMeanValue = selectedMeanCell !== null ? result['mean-list'][selectedMeanCell] : null;

        if (selectedValue !== null && selectedMeanValue !== null) {
            setCenteredValue(`\\[ S_{${selectedCell.row + 1}${selectedCell.col + 1}} = ${selectedValue} - ${selectedMeanValue} \\]`);
        } else {
            setCenteredValue('');
        }
    }, [selectedCell, selectedMeanCell, dataOnly, result]);


    const RenderItemTabelMeanCenterdPCC = () => {
        if (!result || !result['mean-centered']) return null;

        const numberOfColumns = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">I/U</th>
                            {Array.from({ length: numberOfColumns }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result['mean-centered'].map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                {row.map((value, colIndex) => {
                                    const OriginalValue = dataOnly[colIndex][rowIndex];
                                    const IsZero = OriginalValue === 0;
                                    return (
                                        <td key={colIndex}
                                            className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${IsZero ? 'bg-red-200' : ''}`}
                                            onClick={() => handleMeanClick(value, colIndex, rowIndex)}
                                        >
                                            {value.toFixed(1)} {/* Format desimal */}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h1 className='text-lg font-semibold mb-4'>Detail Menghitung <span
                                className='italic'>Mean-Centerd</span> untuk setiap Data rating yang diketahui </h1>

                            {/* Menampilkan rumus mean menggunakan MathJax */}

                            <div className='flex flex-row justify-center m-3'>
                                {/*tabel data rating */}
                                <div>
                                    <h2 className='font-semibold'>Data Rating (r)</h2>
                                    <table className="border border-black mt-4 mr-3">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-black px-4 py-2">I/U</th>
                                                {Array.from({ length: transposedData[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                                    <th key={index}
                                                        className="border border-black px-4 py-2">{index + 1}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transposedData.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                                    {row.map((value, colIndex) => {
                                                        const isSelected = selectedCell.row === colIndex && selectedCell.col === rowIndex;
                                                        const cellClass = value === 0
                                                            ? 'border border-black px-4 py-2 text-center text-red-500'
                                                            : 'border border-black px-4 py-2 text-center';
                                                        return (
                                                            <td key={rowIndex}
                                                                // className="border border-black px-4 py-2 text-center"
                                                                className={`${cellClass} ${isSelected ? 'bg-card_green_primary' : ''}`}
                                                            >
                                                                {value.toFixed ? value.toFixed(0) : value} {/* Format desimal hanya jika diperlukan */}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <h2 className='font-semibold'>Hasil Mean Rating (μ)</h2>
                                    <table className="borDder border-black mt-4 ml-3">
                                        <thead>
                                            <tr className=" bg-gray-200">
                                                <th className="border border-black px-4 py-2">U</th>
                                                <th className="border border-black italic px-4 py-2">μ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result['mean-list'].map((mean, index) => (
                                                <tr key={index}>
                                                    <td className="border border-black px-4 py-2 ">{index + 1}</td>
                                                    <td className={`border border-black px-4 py-2 text-center 
                                                            ${selectedMeanCell === index ? 'bg-yellow-200' : ''}`}
                                                    >
                                                        <div className='text-center'
                                                        >
                                                            {mean}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex items-center my-4">
                                <WarningAmberIcon className="text-yellow-500 mr-2" />
                                <h2 className="text-md font-semibold">
                                    Catatan jika ada <span className='text-red-600 underline'>data rating adalah 0</span>  kemudian dikurangi dengan mean (μ) akan
                                    menghasilkan <span className='text-red-600 underline'>nilai 0</span> atau diabaikan.
                                </h2>
                            </div>

                            <h2 className='font-semibold text-xl'>Rumus Mean-Centerd </h2>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression} />
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {centeredValue ? (
                                        <MathJaxComponent math={centeredValue} />
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <h2 className='font-semibold text-xl text-gray-700'>Hasil dari Mean-Centerd
                                adalah {selectedValue.toFixed(2)} </h2>


                            {/* Menampilkan perhitungan manual */}

                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={closeModal} // Menutup modal saat tombol ditekan
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                )}
            </div>
        );
    };
    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean-Centered Rating Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math} />
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusMeanCenItemBased} />
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centerd Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelMeanCenterdPCC />
            </div>
        </div>
    )
}