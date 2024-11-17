import React, { useState } from "react";
import ModalMeanCenteredMeasure from "./ModalMeanCenteredMeasure";
import { getFormulaMeanCentered } from "../Formula/FormulaMeanCentered";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { AllSimilaritas } from "../../../../api/getDataSet";
import { transposeMatrix } from "../../../../helper/helper";

const MeanCenteredMeasure = ({ opsional, similarity, initialData }) => {

    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedIndex, setSelectedIndex] = useState(null)



    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedValue(value); // Simpan nilai mean yang ditekan
        setSelectedIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setSelectedValue(null); // Reset nilai mean yang dipilih
        setShowModal(false); // Sembunyikan modal
    };



    const [data] = useState(initialData);
    // get only data
    const [dataOnly] = useState(initialData.data);

    const { result } = AllSimilaritas(data, similarity);

    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? transposeMatrix(dataOnly) : transposeMatrix(dataOnly)) : (opsional === "user-based" ? dataOnly : transposeMatrix(dataOnly))
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "item-based" ? "user-based" : "item-based") : opsional
    const FormulaMeanCentered = getFormulaMeanCentered(opsionalModify)

    const RenderTabelMeanCentered = () => {
        if (!result || !result['mean-centered']) return null;

        const resultModify = similarity === "Adjusted Vector Cosine"
            ? transposeMatrix(result['mean-centered'])
            : (opsional === "user-based" ? result['mean-centered'] : transposeMatrix(result['mean-centered']));

        const numberOfColumns = resultModify[0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                {/* Wrapper dengan overflow-x-auto untuk scroll horizontal */}
                <div className="overflow-x-auto w-full">
                    <table className="border border-black mt-4 min-w-full">
                        <thead>
                        <tr className="bg-gray-200">
                            {/* Kolom pertama (U/I) dengan lebar yang responsif */}
                            <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">U/I</th>

                            {Array.from({ length: numberOfColumns }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base">
                                    {index + 1}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {resultModify.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {/* Kolom pertama (U/I) dengan padding dan lebar responsif */}
                                <td className="border border-black px-4 py-2 bg-gray-200 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                                    {rowIndex + 1}
                                </td>

                                {row.map((value, colIndex) => {
                                    const OriginalValue = similarity === "Adjusted Vector Cosine"
                                        ? (opsional === "user-based" ? dataModify[colIndex][rowIndex] : dataModify[colIndex][rowIndex])
                                        : (opsional === "user-based" ? dataModify[rowIndex][colIndex] : dataModify[colIndex][rowIndex]);

                                    const IsZero = OriginalValue === 0;

                                    return (
                                        <td
                                            key={colIndex}
                                            className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary text-xs sm:text-sm md:text-base ${IsZero ? 'bg-red-200' : ''}`}
                                            onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                                        >
                                            {value.toFixed(2)}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal jika ada interaksi */}
                {showModal && (
                    <ModalMeanCenteredMeasure
                        similarity={similarity}
                        selectedIndex={selectedIndex}
                        selectedValue={selectedValue}
                        dataOnly={dataOnly}
                        result={result}
                        opsional={opsionalModify}
                        close={closeModal}
                    />
                )}
            </div>
        );
    };


    return (
        <div>
            <div className="flex items-center">
                <div id="mean-cen-section"
                     className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins text-xl text-start font-semibold text-black'>Mencari
                    Mean-Centered <i> Rating </i> <span
                        className='italic'>{opsional.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</span>
                </h1>
            </div>

            <MathJaxContext options={mathjaxConfig}>
                <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
                    {/* Membungkus MathJax dengan overflow dan responsif */}
                    <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                        <MathJax className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                            {FormulaMeanCentered.formula}
                        </MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={FormulaMeanCentered.detail_formula}/>
            <div className=' px-5 py-5'>
                <h1 className='text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centered <span
                        className='italic'>{opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</span>
                </h1>
                <RenderTabelMeanCentered/>
            </div>
        </div>
    )
}

export default MeanCenteredMeasure