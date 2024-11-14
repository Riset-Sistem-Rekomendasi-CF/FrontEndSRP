import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { useState } from "react"
import MathJaxComponent from "../../../../MathJaxComponent"
import { getFormulaMeanIndex, getFormulaMeanExpression, getFormulaMeanValue } from "../Formula/FormulaMean";
import { transposeMatrix } from "../../../../helper/helper";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import LegendTable from "../../../tabelData/LegendTable";


const ModalMean = ({ opsional, similarity, data, selectedIndex, selectedMean, close }) => {

    const [isNotation, setIsNotation] = useState(false)

    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? (data) : transposeMatrix(data)) : (opsional === "user-based" ? (data) : transposeMatrix(data))



    const meanRumusIdx = getFormulaMeanIndex(opsional, data, similarity)

    const meanIndexExp = getFormulaMeanExpression(opsional, data, selectedIndex[0], isNotation)

    const meanExpressionsValues = getFormulaMeanValue(opsional, data, isNotation)

    const toggleIsNotation = () => {
        setIsNotation(!isNotation)
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Mean nilai rating<span
                    className='italic'>(μ)</span> <i>{opsional.split("-")[0]}</i> ke-{Number(selectedIndex) + 1}</h2>

                <SwitchToggle
                    changeToggle={toggleIsNotation}
                    title={"Tampilkan Notasi"}
                />

                <div className='flex flex-col justify-center m-3 overflow-x-auto'>
                    <div className='overflow-x-auto'>
                        <h2 className='font-semibold'>Data Rating (R)</h2>
                        <table className="border border-black mt-4 mx-auto text-center">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">U/I</th>
                                    {Array.from({ length: dataModify[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                        <th key={index}
                                            className="border border-black px-4 py-2">{!isNotation ? (index + 1) : <span className="font-serif">i<sub>{index + 1}</sub></span>}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataModify.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-black px-4 py-2 w-14 bg-gray-200">{!isNotation ? (rowIndex + 1) : <span className="font-serif">u<sub>{rowIndex + 1}</sub></span>}</td>
                                        {row.map((value, colIndex) => {
                                            const cellClass = value === 0
                                                ? 'border border-black px-4 py-2 text-center w-14 bg-red-200'
                                                : 'border border-black px-4 py-2 text-center w-14';
                                            const indicator = selectedIndex.includes(opsional === "user-based" ? rowIndex : colIndex)
                                                ? "bg-green-200" : ""

                                            return (
                                                <td key={colIndex}
                                                    // className="border border-black px-4 py-2 text-center"
                                                    className={`${indicator} ${cellClass}`}
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
                    <LegendTable
                        list={[
                            {
                                color: "bg-green-200",
                                description: "Menandakan Data Rating yang akan dihitung",
                            },
                            {
                                color: "bg-red-200",
                                description: "Menandakan Data Rating yang tidak diketahui",
                            },
                        ]}
                    />
                </div>
                {/* Menampilkan rumus mean menggunakan MathJax */}
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
                        {meanRumusIdx[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {/* {meanRumusIdx[selectedIndex]} */}
                                    {meanRumusIdx[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanIndexExp[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanIndexExp[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanExpressionsValues[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanExpressionsValues[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}
                    </div>
                </MathJaxContext>

                {/* Menampilkan perhitungan manual */}
                <p className="text-xl font-bold text-gray-700 text-center">Hasil <i>mean</i> nilai rating dari
                   <span className='italic'> user</span>  {selectedIndex[0] + 1} adalah = {selectedMean}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={close} // Menutup modal saat tombol ditekan
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalMean