import { transposeMatrix } from "../../../../helper/helper"
import { getFormulaMean, getFormulaMeanIndex, getFormulaMeanExpression, getFormulaMeanValue } from "../Formula/FormulaMean";
import ModalMean from "./ModalMean";
import React, { useState } from 'react'
import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { AllSimilaritas } from "../../../../api/getDataSet";


export default function MeanMeasure({ opsional, similarity, initialData }) {

    const [data] = useState(initialData);

    const [dataOnly] = useState(initialData.data);

    const { result } = AllSimilaritas(data, similarity);

    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional
    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "item-based" ? dataOnly : transposeMatrix(dataOnly)) : (opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly)


    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedIndex, setSelectedIndex] = useState([]); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal


    const handleMeanClick = (mean, index) => {
        setSelectedMean(mean); // Simpan nilai mean yang ditekan
        setSelectedIndex([index])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
    };

    const meanFormula = getFormulaMean(opsionalModify, similarity)


    const RenderTableMean = () => {
        if (!result || !result['mean-list']) {
            return (<>
                <p>Loading or no data available...</p>
            </>)  // Tambahkan penanganan error atau loading
        }

        return (
            <>
                <div className='flex justify-center mt-4'>

                    <table className="border border-black mt-4">
                        <thead>
                            <tr className=" bg-gray-200">
                                <th className="border border-black px-4 py-2">U</th>
                                <th className="border border-black px-4 py-2">μ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result['mean-list'].map((mean, index) => (
                                <tr key={index} className='hover:bg-card_green_primary'>
                                    <td className="border border-black px-4 py-2">{index + 1}</td>
                                    <td className="border border-black px-4 py-2">
                                        <div className="text-center cursor-pointer"
                                            onClick={() => handleMeanClick(mean, index)}
                                        >
                                            {mean.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Modal Card */}
                    {showModal && (
                        <ModalMean
                            opsional={opsionalModify}
                            data={dataModify}
                            similarity={similarity}
                            selectedIndex={selectedIndex}
                            selectedMean={selectedMean}
                            close={closeModal}
                        />
                    )}

                </div>
            </>
        );
    };

    return (
        <div className='mt-5'>
            <div id="mean-rating-section" className="flex items-center justify-start mb-4">
                {/* Garis Vertikal */}
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                <h1 className='font-poppins text-xl sm:text-2xl font-semibold text-black'>
                    Mencari Mean Rating{' '}
                    <i>{opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</i>
                </h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-5 sm:px-10'>
                    <MathJax>
                        {meanFormula.formula}
                    </MathJax>
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={meanFormula.formula_detail}/>

            <div className='px-5 sm:px-10 py-5'>
                <h1 className='text-lg sm:text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>
                    Hasil Mean Rating <i>{opsionalModify}</i>
                </h1>
                {/* Render tabel mean rating */}
                <RenderTableMean/>
            </div>
        </div>

    )
}