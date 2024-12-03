import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import React, { useState } from "react"
import { getFormulaMeanIndex, getFormulaMeanExpression, getFormulaMeanValue } from "../Formula/FormulaMean";
import { transposeMatrix } from "../../../../helper/helper";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import LegendTable from "../../../tabelData/LegendTable";
import MathJaxComponent from "../../../../MathJaxComponent";


const ModalMean = ({ opsional, similarity, data, selectedIndex, selectedMean, close }) => {

    const [isNotation, setIsNotation] = useState(false)

    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? (data) : transposeMatrix(data)) : (opsional === "user-based" ? (data) : transposeMatrix(data))


    const MeanRatingRumusIdx = ({ opsional, data, selectedIndex }) => {
        const meanRumusIdx = getFormulaMeanIndex(opsional, data, selectedIndex)

        return <MathJaxComponent>{meanRumusIdx}</MathJaxComponent>

    }

    const MeanRatingIndexExp = ({ opsional, data, selectedIndex, isNotation }) => {
        const dataMean = data[selectedIndex]

        const nonZeroIndices = dataMean
            .map((val, idx) => (val !== 0 ? idx + 1 : null))
            .filter((idx) => idx !== null)
        const ValueData = dataMean.filter(val => val !== 0)
        const meanIndexExp = getFormulaMeanExpression(opsional, isNotation, nonZeroIndices, ValueData, selectedIndex)

        return <MathJaxComponent>
            {meanIndexExp}
        </MathJaxComponent>
    }

    const MeanRatingExpressionsValues = ({ opsional, data, selectedIndex, isNotation, selectedMean }) => {
        const dataMean = data[selectedIndex]
        const nonZeroIndices = dataMean
            .map((val, idx) => (val !== 0 ? idx + 1 : null))
            .filter((idx) => idx !== null)

        const ValueData = dataMean.filter((val) => val !== 0)

        const meanExpressionsValues = getFormulaMeanValue(opsional, isNotation, nonZeroIndices, ValueData, selectedIndex, selectedMean)
        console.log(meanExpressionsValues);

        return <MathJaxComponent>
            {meanExpressionsValues.formula}
            {meanExpressionsValues.process_formal}
            {meanExpressionsValues.result}
        </MathJaxComponent>
    }


    // const meanExpressionsValues = getFormulaMeanValue(opsional, data, isNotation)

    const toggleIsNotation = () => {
        setIsNotation(!isNotation)
    }

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-h-[80%] overflow-y-auto m-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Detail Perhitungan Mean nilai <i> Rating </i> <span
                        className="italic">(μ)</span>
                    <i>{opsional.split("-")[0]}</i> ke-{Number(selectedIndex) + 1}
                </h2>

                <SwitchToggle
                    changeToggle={toggleIsNotation}
                    title={"Tampilkan Notasi"}
                />

                <div className="flex flex-col justify-center m-3 overflow-x-auto">
                    <div className="overflow-x-auto">
                        <h2 className="font-semibold">Data <i> Rating </i> (R)</h2>
                        <table className="border border-black mt-4 mx-auto text-center w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">U/I</th>
                                    {Array.from({ length: dataModify[0].length }, (_, index) => (
                                        <th key={index}
                                            className="border border-black px-4 py-2">{!isNotation ? (index + 1) :
                                                <span
                                                    className="font-serif">i<sub>{index + 1}</sub></span>}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataModify.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-black px-4 py-2 w-14 bg-gray-200">{!isNotation ? (rowIndex + 1) :
                                            <span
                                                className="font-serif">u<sub>{rowIndex + 1}</sub></span>}</td>
                                        {row.map((value, colIndex) => {
                                            const cellClass = value === 0
                                                ? 'border border-black px-4 py-2 text-center w-14 bg-red-200'
                                                : 'border border-black px-4 py-2 text-center w-14';
                                            const indicator = selectedIndex.includes(opsional === "user-based" ? rowIndex : colIndex)
                                                ? "bg-green-200" : ""

                                            return (
                                                <td key={colIndex}
                                                    className={`${indicator} ${cellClass}`}
                                                    title={isNotation ? (value.toFixed ? value.toFixed(0) : value) : `r${colIndex + 1}${rowIndex + 1}`}
                                                >
                                                    {!isNotation ? (value.toFixed ? value.toFixed(0) : value) :
                                                        <span
                                                            className="font-serif">r<sub>{colIndex + 1}{rowIndex + 1}</sub></span>}
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
                                description: <>
                                    Menandakan Data <i className='mx-1'> Rating </i> yang akan dihitung
                                </>
                            },
                            {
                                color: "bg-red-200",
                                description: <>
                                    Menandakan Data <i className='mx-1'> Rating </i> yang tidak diketahui
                                </>
                            },
                        ]}
                    />
                </div>

                {/* Menampilkan rumus mean menggunakan MathJax */}
                <MathJaxContext options={mathjaxConfig}>
                    <div className="flex justify-center items-center flex-col px-4 sm:px-10">
                        {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
                        {<MeanRatingRumusIdx
                            opsional={opsional}
                            data={data}
                            selectedIndex={selectedIndex}
                        />}

                        {(
                            <div className="text-center">
                                <MeanRatingIndexExp
                                    opsional={opsional}
                                    data={data}
                                    selectedIndex={selectedIndex}
                                    isNotation={isNotation}
                                />
                            </div>
                        )}

                        {(
                            <div className="text-center">
                                <MeanRatingExpressionsValues
                                    opsional={opsional}
                                    data={data}
                                    selectedIndex={selectedIndex}
                                    isNotation={isNotation}
                                    selectedMean={selectedMean}
                                />
                            </div>
                        )}
                    </div>
                </MathJaxContext>

                {/* Menampilkan perhitungan manual */}
                <p className="text-xl font-bold text-gray-700 mt-5 sm:text-md md:text-lg lg:text-xl xl:text-2xl">Hasil <i>mean</i> nilai
                    <i> rating </i> dari
                    <span className="italic"> user</span> {selectedIndex[0] + 1} adalah
                    = {selectedMean.toFixed(2)}
                </p>

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