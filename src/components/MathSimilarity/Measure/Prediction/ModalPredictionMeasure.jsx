import { getFormulaArgMax, getFormulaPredictionIndex, getFormulaPredictionValue } from "../Formula/FormulaPrediction"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import mathjaxConfig from "../../../../mathjax-config"
import { transposeMatrix } from "../../../../helper/helper"
import LegendTable from "../../../tabelData/LegendTable"
import { useState } from "react"
import SwitchToggle from "../../../Toggle/SwitchToggle"
import {ScatterPlotDataFilter} from "../../../Graph/SccaterPlotVisual";


const ModalPredictionMeasure = ({ opsional, similarity, topSimilarities, selectedValue, selectedIndex, data, result, close }) => {
    const resultMean = similarity === "Adjusted Vector Cosine" ? (result["mean-list-brother"]) : result["mean-list"]
    const resultMeanCentered = similarity === "Adjusted Vector Cosine" ? transposeMatrix(result["mean-centered-brother"]) : result["mean-centered"]
    const [isNotation, setIsNotation] = useState(false)

    const handleIsNotation = () => {
        setIsNotation(!isNotation)
    }
    const PredictionIndex = ({ rowIndex, colIndex, similarity, opsional }) => {
        const expression = getFormulaPredictionIndex(rowIndex, colIndex, similarity, opsional)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    const PredictionValue = ({ rowIndex, colIndex, similarValues, result, similarity, opsional, isNotation }) => {
        const expression = getFormulaPredictionValue(rowIndex, colIndex, similarValues, result, similarity, opsional, isNotation)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    const ArgMaxNeighbor = ({ rowIndex, colIndex, opsional, similarity, topSimilarity }) => {
        const expression = getFormulaArgMax(rowIndex, colIndex, opsional, similarity, topSimilarity)
        return (
            <MathJax>
                {expression}
            </MathJax>)
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Prediksi </h2>
                <SwitchToggle
                    title={"Tampilkan Notasi"}
                    changeToggle={handleIsNotation}
                />
                <div className="overflow-x-auto">
                    <div className="flex gap-5">
                        <div>
                            <h2 className='font-semibold'>Matrik Rating</h2>
                            <table className="border border-black mt-4 mx-auto text-center">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">{opsional === "item-based" ? "Item" : "User"}</th>
                                    <th className="border border-black px-4 py-2 italic font-serif">r<sub>{opsional === "item-based" ? (`${selectedIndex[opsional === "item-based" ? 1 : 0] + 1}*`) : (`*${selectedIndex[opsional === "item-based" ? 1 : 0] + 1}`)}</sub>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((row, rowIndex) => {
                                    const IsZero = opsional === "item-based" ? data[rowIndex][selectedIndex[0]] === 0 : data[rowIndex][selectedIndex[1]] === 0
                                    console.log(opsional === "user-based");


                                    return (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                            <td
                                                className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200' : ''}`}
                                            >
                                                {!isNotation ? row[selectedIndex[opsional === "item-based" ? 0 : 1]]?.toFixed(1) : <>
                                                    <span
                                                        className="italic font-serif">r<sub>{opsional === "user-based" ? `${rowIndex + 1}${selectedIndex[0] + 1}` : `${selectedIndex[1] + 1}${rowIndex + 1}`}</sub></span></>} {/* Tampilkan nilai mean-centered untuk item yang dipilih */}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2 className='font-semibold'>Matrik <span className='italic'>Mean-Centered</span>  Rating</h2>
                            <table className="border border-black mt-4 mx-auto text-center">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">U</th>
                                    <th className="border border-black italic px-4 py-2">μ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {resultMean.map((mean, index) => {
                                    const isActiveUser = index === selectedIndex[opsional === "user-based" ? 0 : 1]; // Highlight the active user in the mean rating table

                                    return (
                                        <tr key={index}
                                            className={isActiveUser ? 'bg-green-200' : ''}> {/* Highlight active user */}
                                            <td className="border border-black px-4 py-2">{index + 1}</td>
                                            <td className="border border-black px-4 py-2">
                                                <div className="text-center">
                                                    {!isNotation ? mean.toFixed(2) : <span
                                                        className="italic font-serif">μ<sub>{index + 1}</sub></span>}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2 className='font-semibold'>Nilai Similarity</h2>
                            <table className="border border-black mt-4 mx-auto text-center ">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">{opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()).split(" ")[0]}</th>
                                    <th className="border border-black px-4 py-2 italic font-serif">S<sub>{opsional === "item-based" ? (`${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}*`) : (`*${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}`)}</sub>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {resultMeanCentered.map((row, rowIndex) => {
                                    const IsZero = opsional === "item-based" ? data[rowIndex][selectedIndex[0]] === 0 : data[rowIndex][selectedIndex[1]] === 0 === 0
                                    const isTopSimilarity = topSimilarities.some(top => top.index === rowIndex && !IsZero)

                                    return (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                            <td className={`border border-black px-4 py-2 text-center w-20 ${IsZero ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                {!isNotation ? (row[selectedIndex[opsional === "item-based" ? 0 : 1]]?.toFixed(2) || 'N/A') :
                                                    <span
                                                        className="italic font-serif">S<sub>{opsional === "item-based" ? (`${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}${rowIndex + 1}`) : (`${rowIndex + 1}${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}`)}</sub></span>} {/* Display mean-centered value */}
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        </div>

                        {selectedIndex[opsional === "user-based" ? 0 : 1] < result['similarity'].length ? (

                            <div>
                                <h2 className='font-semibold'>Nilai Top-K</h2>
                                <table className="border border-black mt-4 mx-auto text-center">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">{opsional === "item-based" ? "Item" : "User"}</th>
                                        <th className="border border-black px-4 py-2 italic font-serif">Sim{
                                            <sub>{(`${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}*`)}</sub>}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result['similarity'].map((row, colIndex) => {
                                        const isTopSimilarity = topSimilarities.some(top => top.index === colIndex); // Check if this row is in the top similarities

                                        return (
                                            <tr key={colIndex}>
                                                <td className="border border-black px-4 py-2 bg-gray-200">{colIndex + 1}</td>
                                                <td className={`border border-black px-4 py-2 text-center  ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                    {!isNotation ? (row[selectedIndex[opsional === "user-based" ? 0 : 1]]?.toFixed(4) || 'N/A') :
                                                        <span
                                                            className="italic font-serif">Sim<sub>{opsional === "item-based" ? (`${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}${colIndex + 1}`) : (`${colIndex + 1}${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}`)}</sub></span>} {/* Display similarity value */}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Data for this user is not available.</p>
                        )}
                    </div>

                </div>

                <div>
                    <LegendTable
                        list={[
                            {
                                color: "bg-green-200",
                                description: "Menandakan Data Rating yang akan dihitung",
                            },
                            {
                                color: "bg-yellow-200",
                                description: <>
                                    Menandakan Data <span className="font-serif ml-1 mr-1">Mean</span> Rating yang akan
                                    dihitung
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

                {/* Menampilkan perhitungan manual */}

                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {selectedIndex ? (
                            <ArgMaxNeighbor
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                opsional={opsional}
                                similarity={similarity}
                                topSimilarity={topSimilarities}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )}
                    </div>
                </MathJaxContext>

                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {selectedIndex ? (
                            <PredictionIndex
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                opsional={opsional}
                                similarity={similarity}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )}
                    </div>
                </MathJaxContext>

                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {selectedIndex ? (
                            <PredictionValue
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                similarValues={topSimilarities}
                                result={result}
                                opsional={opsional}
                                similarity={similarity}
                                isNotation={isNotation}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )}
                    </div>
                </MathJaxContext>


                <p className="text-xl font-bold text-gray-700">Hasil prediksi rating <span className='italic'>Item </span>
                    target {selectedIndex[1] + 1} terhadap
                    <span className='italic'> item </span>  {selectedIndex[1] + 1} adalah = {selectedValue.toFixed(3)}</p>

                <h1 className='font-semibold text-xl my-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary'>
                    Grafik Prediksi Top-K</h1>
                <div className='flex flex-center my-3'>
                        <ScatterPlotDataFilter result={result}/>
                </div>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalPredictionMeasure