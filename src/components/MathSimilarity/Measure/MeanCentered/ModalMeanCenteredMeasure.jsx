import { getFormulaMeanCenteredIndex, getFormulaMeanCenteredValue } from "../Formula/FormulaMeanCentered";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SwitchToggle from "../../../Toggle/SwitchToggle";
import { useState } from "react";
import LegendTable from "../../../tabelData/LegendTable";
import MathJaxComponent from "../../../../MathJaxComponent";

const ModalMeanCenteredMeasure = ({ similarity, selectedIndex, selectedValue, dataOnly, result, opsional, close }) => {

    const [isNotation, setIsNotation] = useState(false)
    const dataModify = dataOnly
    const currentValue = dataModify[selectedIndex[0]][selectedIndex[1]]


    const toggleIsNotation = () => {
        setIsNotation(!isNotation)
    }

    const MeanCenteredIndex = ({ rowIndex, colIndex }) => {
        const expression = getFormulaMeanCenteredIndex(rowIndex, colIndex, opsional)
        return (
            <MathJaxComponent>
                {expression}
            </MathJaxComponent>
        )
    }

    const MeanCenteredValue = ({ rowIndex, colIndex, data, result }) => {
        const expression = getFormulaMeanCenteredValue(rowIndex, colIndex, data, result, opsional, similarity)
        return (
            <MathJaxComponent>
                {expression}
            </MathJaxComponent>
        )
    }

    return (<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
            <h1 className='text-lg font-semibold mb-4'>Detail Menghitung <span
                className='italic'>Mean-Centered</span> untuk setiap Data rating yang diketahui </h1>

            {/* Menampilkan rumus mean menggunakan MathJax */}

            <SwitchToggle
                changeToggle={toggleIsNotation}
                title={"Tampilkan Notasi"}
            />

            <div className='flex flex-row justify-center m-3 overflow-x-auto'>
                {/*tabel data rating */}
                <div className="overflow-x-auto">
                    <h2 className='font-semibold'>Data Rating (R)</h2>
                    <table className="border border-black mt-4 mr-3">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">U/I</th>
                                {Array.from({ length: dataModify[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                    <th key={index}
                                        className="border border-black px-4 py-2 w-14">{!isNotation ? (index + 1) : <span className="font-serif">i<sub>{index + 1}</sub></span>}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataModify.map((row, rowIndex) => (
                                <tr key={rowIndex + "data-body"}>
                                    <td className="border border-black px-4 py-2 w-14 bg-gray-200">{!isNotation ? (rowIndex + 1) : <span className="font-serif">u<sub>{rowIndex + 1}</sub></span>}</td>
                                    {row.map((value, colIndex) => {

                                        const isSelected = (opsional === "item-based" ? (selectedIndex[1] === colIndex && selectedIndex[0] === rowIndex) : (selectedIndex[0] === rowIndex && selectedIndex[1] === colIndex));
                                        const cellClass = value === 0
                                            ? 'border border-black px-4 py-2 text-center w-14' +
                                            ' bg-red-200'
                                            : 'border border-black px-4 py-2 text-center w-14';
                                        if (isSelected) {
                                        }
                                        return (
                                            <td key={rowIndex}
                                                // className="border border-black px-4 py-2 text-center"
                                                className={`${cellClass} ${isSelected ? 'bg-card_green_primary' : ''}`}
                                                title={isNotation ? (value.toFixed ? value.toFixed(0) : value) : `r${colIndex + 1}${rowIndex + 1}`}
                                            >
                                                {!isNotation ? (value.toFixed ? value.toFixed(0) : value) : <span className="font-serif">r<sub>{colIndex + 1}{rowIndex + 1}</sub></span>} {/* Format desimal hanya jika diperlukan */}
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
                                <th className="border border-black px-4 py-2 w-10">{opsional === "user-based" ? "U" : "I"}</th>
                                <th className="border border-black italic px-4 py-2 w-14 font-serif">μ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result['mean-list'].map((mean, index) => (
                                <tr key={index + "mean-body"}>
                                    <td key={index} className="border border-black px-4 py-2 w-14 ">{index + 1}</td>
                                    <td key={index} className={`border border-black px-4 py-2 w-20 text-center
                                         ${selectedIndex[opsional === "user-based" ? 0 : 1] === index ? 'bg-yellow-200' : ''}`}>
                                        <span className='text-center'
                                            title={isNotation ? (mean.toFixed ? mean.toFixed(0) : mean) : `µ${index + 1}`}
                                        >
                                            {!isNotation ? (mean.toFixed ? mean.toFixed(2) : mean) : <span className="font-serif">μ<sub>{index + 1}</sub></span>}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <LegendTable
                    list={[
                        {
                            color: "bg-card_green_primary",
                            description: "Menandakan Data Rating yang akan dihitung",
                        },
                        {
                            color: "bg-yellow-200",
                            description: <>
                                Menandakan Data <span className="font-serif ml-1 mr-1">Mean</span> Rating yang akan dihitung
                            </>,
                        },
                        {
                            color: "bg-red-200",
                            description: <>
                                Menandakan Data Rating yang tidak diketahui
                            </>,
                        },
                    ]}
                />
            </div>
            {currentValue === 0 ?
                <div className="flex items-center justify-center my-4">
                    <WarningAmberIcon className="text-yellow-500 mr-2"/>
                    <h2 className="text-md font-semibold text-center">
                        Catatan jika ada <span className='text-red-600 '>data rating adalah 0 </span> akan
                        menghasilkan <span className='text-red-600 '>nilai 0</span> atau diabaikan.
                    </h2>
                </div> : ""}

            {currentValue !== 0 ? (
                <>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {isNotation ?
                            <MeanCenteredIndex
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                opsional={opsional}
                            />
                            : ""}
                        {!isNotation ? (selectedIndex ? (
                            <MeanCenteredValue
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                data={dataModify}
                                result={result}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )) : ""}
                    </div>
                </>) : ""}

            <h2 className='font-semibold text-xl text-gray-700'>Hasil dari <span className='italic'>Mean-Centered  </span>
                 adalah dari user {opsional.split("-")[0]}{" "}
                {selectedIndex[0] + 1} dan item {selectedIndex[1] + 1} ={" "}  {selectedValue.toFixed(2)} </h2>


            {/* Menampilkan perhitungan manual */}

            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={close} // Menutup modal saat tombol ditekan
            >
                Tutup
            </button>
        </div>
    </div>)
}

export default ModalMeanCenteredMeasure