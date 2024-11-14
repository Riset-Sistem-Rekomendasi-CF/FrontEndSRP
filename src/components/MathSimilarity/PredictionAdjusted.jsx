import React, {useState} from 'react';
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";
import {MeanMeasureUserBased} from "./meanMeasure";
import {getPearsonPC} from "../../api/api";
import {MeanCenteredSimUserBased} from "./meanCentredSim";
import {TopNPrediksi} from "./TopNPrediction";


//predicition user-based
const UserBasedPrediciton = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{u}} +\\frac{\\sum_{v\\in N_u^i} Sim_{uv}*\\left(r_{vi} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_u^i}\\mid Sim_{uv} \\mid} \\]`
]

const ArgMax = [
    `\\[ X_u(j) = \\underset{v \\in U_j}{\\operatorname{argmax}^k} \\operatorname{sim}(u, v) \\]`
]
const DetailRumusPrediksiUserBased = [
    `\\[ \\overline{r_{u}} = \\text{Rata-rata rating yang diberikan oleh user u pada seluruh item} \\] `,
    `\\[ \\overline{r_{v}} = \\text{Rata-rata rating yang diberikan oleh user v pada seluruh item} \\] `,
    `\\[ Sim_{uv} = \\text{Nilai similaritas antara user u dan v} \\] `,
    `\\[ r_{vi} = \\text{Nilai rating yang diberikan oleh user v terhadap item i} \\] `,

]

export function UserBasedPredicitionAdjust({opsional, similaritas}){



    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan mean yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang diklik
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // Menyimpan user yang diklik

    const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Menyimpan user yang diklik


    const [topSimilarities, setTopSimilarities] = useState([]); // State to store top similarities
    const [PrediksiFormula, setPrediksiFormula] = useState([]); // State to store top similarities

    const [selectedExpression, setSelectedExpression] = useState([]);

// Function to find top `count` similarities closest to 1 where the user has a valid rating
    const findTopSimilaritiesWithValidRatings = (similarityData, dataOnly, itemIndex, userIndex, count = 2) => {
        const similarities = similarityData.map((row, index) => ({
            index,
            value: row[userIndex],
            diff: Math.abs(row[userIndex] - 1), // Absolute difference from 1
            hasRated: dataOnly[index][itemIndex] !== 0 // Check if the user has rated the item
        }));

        // Sort by difference from 1 (ascending) and filter out users who haven't rated the item (rating is 0)
        const validSimilarities = similarities
            .filter(item => item.hasRated) // Only keep users who have rated the item
            .sort((a, b) => a.diff - b.diff); // Sort by proximity to 1

        return validSimilarities.slice(0, count); // Take the top `count` valid similarities
    };




    // Fungsi untuk menangani klik pada sel
    const handleMeanClick = (value, rowIndex, colIndex) => {

        const expressionIndex = PrediksiIndex(rowIndex, colIndex);
        // const expressionValue = PrediksiValue(rowIndex, colIndex);
        setSelectedExpression([expressionIndex]); //

        setSelectedValue(value)
        setSelectedItem(colIndex); // Simpan item yang diklik (index)
        setSelectedUserIndex(rowIndex); // Simpan user yang diklik (index)
        setSelectedRowIndex(rowIndex); // Simpan user yang diklik (index)


        // Get the top similarities when clicking
        const top = findTopSimilaritiesWithValidRatings(result['similarity'], dataOnly, colIndex, rowIndex, 2);
        setTopSimilarities(top);

        // Call PrediksiValue with the top similarities to generate the formula
        const formula = PrediksiValue(rowIndex, colIndex, top);
        setPrediksiFormula(formula); // Store the formula in state

        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedItem(null); // Reset pilihan item
        setSelectedRowIndex(null); // Reset pilihan user
        setSelectedValue(null)
        setSelectedUserIndex(null)
        setTopSimilarities(null)


    };



    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    // get only data
    const [dataOnly, setDataOnly] = useState(initialData.data);

    const { result, error } = AllSimilaritas(data, similaritas);



    // Fungsi untuk menghitung rata-rata (mean) per user (baris)
    const meanPerUser = (data) => {
        return data.map(userRatings => {
            const validRatings = userRatings.filter(value => value !== 0); // Hanya hitung non-zero values
            return validRatings.length > 0
                ? validRatings.reduce((sum, value) => sum + value, 0) / validRatings.length
                : 0; // Jika tidak ada nilai valid, return 0
        });
    };

    // Fungsi untuk menghitung mean-centered per user
    const meanCenteredPerUser = (data) => {
        return data.map(userRatings => {
            const meanValue = userRatings.filter(value => value !== 0).reduce((sum, val) => sum + val, 0) / userRatings.filter(value => value !== 0).length || 0;
            return userRatings.map(rating => rating !== 0 ? rating - meanValue : 0); // Subtract the mean for non-zero values
        });
    };


    const userMeanList = meanPerUser(dataOnly)
    const userMeanCenList =  meanCenteredPerUser(dataOnly)
    // rumus
    const PrediksiIndex = (rowIndex, colIndex) => {
        return  `\\[ {\\widetilde{r_{${rowIndex+1}${colIndex + 1}}}} = \\overline{r_{${rowIndex+1}}} +\\frac{\\sum_{v\\in N_${rowIndex+1}^${colIndex+1}} Sim_{${rowIndex+1}v} \\times \\left(r_{v${colIndex+1}} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_${rowIndex+1}^${colIndex+1}}\\mid Sim_{${rowIndex+1}v} \\mid} \\]`;
    }

    // const PrediksiValue= (rowIndex, colIndex) => {
    //     return  `\\[ {\\widetilde{r_{${rowIndex+1}${colIndex + 1}}}} = \\overline{r_{${rowIndex+1}}} +\\frac{\\left( 3 \\times 3 \\right) + \\left( 3 \\times 3 \\right)  }{\\mid 3 \\mid + \\mid 3 \\mid}  \\]`;
    // }

    const PrediksiValue = (rowIndex, colIndex, similarValues = []) => {
        if (!Array.isArray(similarValues) || similarValues.length === 0) {
            return ''; // Return empty if no similarities found
        }


        const selectedUserMean =  meanPerUser(dataOnly)[rowIndex]

        // Build the similarity and value components dynamically
        const simPart = similarValues
            .map(sim =>{
                // Retrieve mean-centered value directly from result['mean-centered']
                const meanCenteredValue =  meanCenteredPerUser(dataOnly)[sim.index][colIndex];
                return `\\left(${sim.value.toFixed(4)} \\times \\left(${meanCenteredValue.toFixed(1)}\\right)\\right)`})
            .join(' + '); // Add each term together

        const denominatorPart = similarValues
            .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
            .join(' + '); // Sum the absolute values

        // Construct the full LaTeX formula
        return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${selectedUserMean}} + \\frac{${simPart}}{${denominatorPart}} \\]`;
    };

    const RenderUserTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;
        const numberOfColumnsPred = result['prediction'][0].length; // Ambil jumlah kolom dari baris pertama

        if (!result || !result['mean-centered']) return null;
        const numberOfColumnsMeanCen = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        if (!result || !result['similarity']) return null;
        const numberOfColumnsSim = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama

        if(!result || !result['mean-list']) return  null;
        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/I</th>
                        {Array.from({ length: numberOfColumnsPred }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['prediction'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-blue-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => {
                                const OriginalValue = dataOnly[rowIndex][colIndex];
                                const IsZero = OriginalValue === 0;
                                return (
                                    <td key={colIndex}
                                        className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200 cursor-pointer hover:bg-card_green_primary' : ''}`}
                                        onClick={IsZero ? () => handleMeanClick(value, rowIndex, colIndex ) : undefined} // hanya aktif jika IsZero

                                    >
                                        {value.toFixed(3)} {/* Format desimal */}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Modal Card */}
                {showModal &&  selectedItem !== null && selectedUserIndex !== null &&(
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Prediksi</h2>
                            <div className="overflow-x-auto"> {/* Tambahkan ini untuk responsivitas tabel */}
                                {/* Menampilkan rumus mean menggunakan MathJax */}
                                {/*matriks rating*/}
                                <h2 className='font-semibold'>Data Matrix Rating</h2>

                                <table className="border border-black mt-4 mx-auto text-center my-4 ">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">User</th>
                                        <th className="border border-black px-4 py-2">Data Rating
                                            (Item {selectedItem + 1})
                                        </th>
                                        {/* Hanya tampilkan item yang dipilih */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataOnly.map((row, rowIndex) => {
                                        const OriginalValue = dataOnly[rowIndex][selectedItem]; // Ambil OriginalValue berdasarkan item yang dipilih
                                        const IsZero = OriginalValue === 0; // Cek apakah nilainya 0

                                        return (
                                            <tr key={rowIndex}>
                                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                                <td
                                                    className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200' : ''}`}
                                                >
                                                    {row[selectedItem]?.toFixed(1) || 'N/A'} {/* Tampilkan nilai mean-centered untuk item yang dipilih */}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                                <h2 className='font-semibold'>Matrix Mean Rating</h2>


                                <table className="border border-black mt-4 mx-auto text-center my-4">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">U</th>
                                        <th className="border border-black italic px-4 py-2">μ</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userMeanList.map((mean, index) => {
                                        const isActiveUser = index  === selectedUserIndex; // Highlight the active user in the mean rating table

                                        return (
                                            <tr key={index}
                                                className={isActiveUser ? 'bg-green-200' : ''}> {/* Highlight active user */}
                                                <td className="border border-black px-4 py-2">{index + 1}</td>
                                                <td className="border border-black px-4 py-2">
                                                    <div className="text-center">
                                                        {mean}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>

                                <h2 className='font-semibold'>Matrix Mean-Centerd Rating</h2>

                                <table className="border border-black mt-4 mx-auto text-center ">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">User</th>
                                        <th className="border border-black px-4 py-2">Mean-Centered
                                            (Item {selectedItem + 1})
                                        </th>
                                        {/* Hanya tampilkan item yang dipilih */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userMeanCenList.map((userCentered, userIndex) => {
                                        const originalValue = dataOnly[userIndex][selectedItem]; // Get original value (dataOnly)
                                        const isZero = originalValue === 0; // Check if the rating is 0
                                        const isTopSimilarity = topSimilarities.some(top => top.index === userIndex); // Check if this user is in the top 2 similarities

                                        return (
                                            <tr key={userIndex}>
                                                <td className="border border-black px-4 py-2 bg-gray-200">{userIndex + 1}</td>
                                                <td className={`border border-black px-4 py-2 text-center ${isZero ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                    {userCentered[selectedItem]?.toFixed(1) || 'N/A'} {/* Display mean-centered value per user */}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>


                                {/*tabel user item */}

                                {/*    vektor similaritas*/}
                                <h2 className='font-semibold my-4'>Nilai Similaritas</h2>
                                {selectedUserIndex < result['similarity'].length ? (
                                    <table className="border border-black mt-4 mx-auto text-center">
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-black px-4 py-2">User</th>
                                            <th className="border border-black px-4 py-2">Nilai Similaritas
                                                (User {selectedUserIndex + 1})
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {result['similarity'].map((row, colIndex) => {
                                            const isTopSimilarity = topSimilarities.some(top => top.index === colIndex); // Check if this row is in the top similarities

                                            return (
                                                <tr key={colIndex}>
                                                    <td className="border border-black px-4 py-2 bg-gray-200">{colIndex + 1}</td>
                                                    <td className={`border border-black px-4 py-2 text-center ${row[selectedUserIndex] === 1 ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                        {row[selectedUserIndex]?.toFixed(4) || 'N/A'} {/* Display similarity value */}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Data for this user is not available.</p>
                                )}

                            </div>
                            {/* Menampilkan perhitungan manual */}

                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression}/>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>

                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {PrediksiFormula ? (
                                        <MathJaxComponent math={PrediksiFormula}/>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <p className="text-xl font-bold text-gray-700">Hasil prdiksi rating user target {selectedUserIndex + 1} terhadap
                                item {selectedItem + 1} adalah = {selectedValue.toFixed(3)}</p>


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
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghitung Prediksi User-Based</h1>
            </div>
            <div className='text-start ml-10'>
                <h2 className='font-semibold'>1. Menentukan User Target</h2>
                <h2 className='font-semibold'>2. Mencari daftar item yang belum diberi rating user target</h2>
                <h2 className='font-semibold'>3. Menentukan tetangga terdekat user target</h2>
                <p className='text-gray-700 font-medium ml-5 text-justify '>Tetangga terdekat X<sub>u</sub>(j) merupakan
                    himpunan sejumlah k user yang merupakan tetangga terdekat (atau similar dengan ) user target u, yang
                    telah memberikan rating pada item j</p>
                <p className='ml-5 font-semibold'>Catatan : | X<sub>u</sub>(j) | ≤ k</p>
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-start items-start flex-row my-5 pl-5'>
                        <div className='border-2 py-3 px-3 border-black rounded-lg'>
                            {ArgMax.map((math, index) => (
                                <MathJaxComponent key={index} math={math}/>
                            ))}
                        </div>

                        <p className='ml-4 items-center text-red-500 font-semibold text-justify'>Dimana himpunan didapatkan berdasarkan urutan nilai similaritasnya (dari yang terbesar ke yang terkecil)</p>
                    </div>

                </MathJaxContext>
                <h2 className='font-semibold'>4. Menentukan prediksi rating</h2>

            </div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Langkah-langkah Prediksi User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {UserBasedPrediciton.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusPrediksiUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Prediction User-Based</h1>
                {/*    call api */}
                <RenderUserTabelPrediksi/>
                <h2 className='font-semibold my-4'>Yang berwarna merah yang dilakukan prediksi</h2>
            </div>
            <div className="flex items-center my-5">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghasilkan Top-N Rekomendasi </h1>
            </div>

        </div>
    )
}


//prediciton item-based

const ItemBasedPrediction = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{i}} +\\frac{\\sum{_j\\in N_u^i} Sim_{ij}*\\left(r_{uj} - \\overline{r_{j}}\\right)}{\\sum_{j \\in N_u^i}\\mid Sim_{ij} \\mid} \\]`
]

const DetailRumusPrediksiItemBased = [
    `\\[ \\overline{r_{i}} = \\text{Rata-rata nilai rating pada item i yang telah merating} \\] `,
    `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\] `,
    `\\[ Sim_{ij} = \\text{Nilai similaritas antara item i dan j} \\] `,
    `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\] `,

]

export function ItemBasedPredicitonAdjust({opsional, similaritas}) {

    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);
    const transposedData = dataOnly[0].map((_, colIndex) =>
        dataOnly.map(row => row[colIndex])
    );
    const { result, error } = AllSimilaritas(data, similaritas);

    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan mean yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang diklik
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // Menyimpan user yang diklik

    const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Menyimpan user yang diklik


    const [topSimilarities, setTopSimilarities] = useState([]); // State to store top similarities
    const [PrediksiFormula, setPrediksiFormula] = useState([]); // State to store top similarities

    const [selectedExpression, setSelectedExpression] = useState([]);


    // Function to find top `count` similarities closest to 1 where the user has a valid rating
    const findTopSimilaritiesWithValidRatingsItem = (similarityData, transposedData, itemIndex, userIndex, count = 2) => {
        const similarities = similarityData.map((row, index) => ({
            index,
            value: row[userIndex],
            diff: Math.abs(row[userIndex] - 1), // Absolute difference from 1
            hasRated: transposedData[index][itemIndex] !== 0 // Check if the user has rated the item
        }));

        // Sort by difference from 1 (ascending) and filter out users who haven't rated the item (rating is 0)
        const validSimilarities = similarities
            .filter(item => item.hasRated) // Only keep users who have rated the item
            .sort((a, b) => a.diff - b.diff); // Sort by proximity to 1

        return validSimilarities.slice(0, count); // Take the top `count` valid similarities
    };





    const handleMeanClick = (value, rowIndex, colIndex) => {

        const expressionIndexItem = PrediksiIndexItem(rowIndex, colIndex);
        // const expressionValue = PrediksiValue(rowIndex, colIndex);
        setSelectedExpression([expressionIndexItem]); //

        setSelectedValue(value)
        setSelectedItem(colIndex); // Simpan item yang diklik (index)
        setSelectedUserIndex(rowIndex); // Simpan user yang diklik (index)
        setSelectedRowIndex(rowIndex); // Simpan user yang diklik (index)


        // Get the top similarities when clicking
        const top = findTopSimilaritiesWithValidRatingsItem(result['similarity'], dataOnly, colIndex, rowIndex, 2);
        setTopSimilarities(top);

        // Call PrediksiValue with the top similarities to generate the formula
        const formula = PrediksiValueItem(rowIndex, colIndex, top);
        setPrediksiFormula(formula); // Store the formula in state

        setShowModal(true); // Tampilkan modal

    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedItem(null); // Reset pilihan item
        setSelectedRowIndex(null); // Reset pilihan user
        setSelectedValue(null)
        setSelectedUserIndex(null)
        setTopSimilarities(null)


    };



    // Fungsi untuk menghitung rata-rata (mean) per user (baris)
    const meanPerItem = (data) => {
        return data.map(userRatings => {
            const validRatings = userRatings.filter(value => value !== 0); // Hanya hitung non-zero values
            return validRatings.length > 0
                ? validRatings.reduce((sum, value) => sum + value, 0) / validRatings.length
                : 0; // Jika tidak ada nilai valid, return 0
        });
    };

    // Fungsi untuk menghitung mean-centered per user
    const meanCenteredPerItem = (data) => {
        return data.map(userRatings => {
            const meanValue = userRatings.filter(value => value !== 0).reduce((sum, val) => sum + val, 0) / userRatings.filter(value => value !== 0).length || 0;
            return userRatings.map(rating => rating !== 0 ? rating - meanValue : 0); // Subtract the mean for non-zero values
        });
    };


    const itemMeanList = meanPerItem(dataOnly)
    const itemMeanCenList =  meanCenteredPerItem(dataOnly)
    // rumus
    const PrediksiIndexItem = (rowIndex, colIndex) => {
        return  `\\[ {\\widetilde{r_{${rowIndex+1}${colIndex + 1}}}} = \\overline{r_{${rowIndex+1}}} +\\frac{\\sum_{v\\in N_${rowIndex+1}^${colIndex+1}} Sim_{${rowIndex+1}v} \\times \\left(r_{v${colIndex+1}} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_${rowIndex+1}^${colIndex+1}}\\mid Sim_{${rowIndex+1}v} \\mid} \\]`;
    }

    // const PrediksiValue= (rowIndex, colIndex) => {
    //     return  `\\[ {\\widetilde{r_{${rowIndex+1}${colIndex + 1}}}} = \\overline{r_{${rowIndex+1}}} +\\frac{\\left( 3 \\times 3 \\right) + \\left( 3 \\times 3 \\right)  }{\\mid 3 \\mid + \\mid 3 \\mid}  \\]`;
    // }

    const PrediksiValueItem = (rowIndex, colIndex, similarValues = []) => {
        if (!Array.isArray(similarValues) || similarValues.length === 0) {
            return ''; // Return empty if no similarities found
        }


        const selectedUserMean =  itemMeanList(dataOnly)[rowIndex]

        // Build the similarity and value components dynamically
        const simPart = similarValues
            .map(sim =>{
                // Retrieve mean-centered value directly from result['mean-centered']
                const meanCenteredValue =  itemMeanCenList(dataOnly)[sim.index][colIndex];
                return `\\left(${sim.value.toFixed(4)} \\times \\left(${meanCenteredValue.toFixed(1)}\\right)\\right)`})
            .join(' + '); // Add each term together

        const denominatorPart = similarValues
            .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
            .join(' + '); // Sum the absolute values

        // Construct the full LaTeX formula
        return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${selectedUserMean}} + \\frac{${simPart}}{${denominatorPart}} \\]`;
    };




    const RenderItemTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;

        const numberOfColumnsPred = result['prediction'][0].length; // Ambil jumlah kolom dari baris pertama

        if (!result || !result['mean-centered']) return null;
        const numberOfColumnsMeanCen = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        if (!result || !result['similarity']) return null;
        const numberOfColumnsSim = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/I</th>
                        {Array.from({ length: numberOfColumnsPred }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['prediction'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-blue-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) =>{
                                const OriginalValue = dataOnly[rowIndex][colIndex];
                                const IsZero = OriginalValue === 0;
                                return (
                                    <td key={colIndex}
                                        className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200 cursor-pointer hover:bg-card_green_primary' : ''}`}
                                        onClick={IsZero ? () => handleMeanClick(value, rowIndex, colIndex) : undefined} // hanya aktif jika IsZero

                                    >
                                        {value.toFixed(3)} {/* Format desimal */}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/*    show modal*/}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Prediksi</h2>


                            <div className="overflow-x-auto"> {/* Tambahkan ini untuk responsivitas tabel */}
                                {/* Menampilkan rumus mean menggunakan MathJax */}
                                {/*matriks rating*/}
                                <h2 className='font-semibold'>Data Matrix Rating</h2>

                                <table className="border border-black mt-4 mx-auto text-center my-4 ">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">User</th>
                                        <th className="border border-black px-4 py-2">Data Rating
                                            (Item {selectedItem + 1})
                                        </th>
                                        {/* Hanya tampilkan item yang dipilih */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataOnly.map((row, rowIndex) => {
                                        const OriginalValue = dataOnly[rowIndex][selectedItem]; // Ambil OriginalValue berdasarkan item yang dipilih
                                        const IsZero = OriginalValue === 0; // Cek apakah nilainya 0

                                        return (
                                            <tr key={rowIndex}>
                                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                                <td
                                                    className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200' : ''}`}
                                                >
                                                    {row[selectedItem]?.toFixed(1) || 'N/A'} {/* Tampilkan nilai mean-centered untuk item yang dipilih */}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                                <h2 className='font-semibold'>Matrix Mean Rating</h2>


                                <table className="border border-black mt-4 mx-auto text-center my-4">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">U</th>
                                        <th className="border border-black italic px-4 py-2">μ</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {itemMeanList.map((mean, index) => {
                                        const isActiveUser = index === selectedUserIndex; // Highlight the active user in the mean rating table

                                        return (
                                            <tr key={index}
                                                className={isActiveUser ? 'bg-green-200' : ''}> {/* Highlight active user */}
                                                <td className="border border-black px-4 py-2">{index + 1}</td>
                                                <td className="border border-black px-4 py-2">
                                                    <div className="text-center">
                                                        {mean}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>

                                <h2 className='font-semibold'>Matrix Mean-Centerd Rating</h2>

                                <table className="border border-black mt-4 mx-auto text-center ">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">User</th>
                                        <th className="border border-black px-4 py-2">Mean-Centered
                                            (Item {selectedItem + 1})
                                        </th>
                                        {/* Hanya tampilkan item yang dipilih */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {itemMeanCenList.map((userCentered, userIndex) => {
                                        const originalValue = dataOnly[userIndex][selectedItem]; // Get original value (dataOnly)
                                        const isZero = originalValue === 0; // Check if the rating is 0
                                        const isTopSimilarity = topSimilarities.some(top => top.index === userIndex); // Check if this user is in the top 2 similarities

                                        return (
                                            <tr key={userIndex}>
                                                <td className="border border-black px-4 py-2 bg-gray-200">{userIndex + 1}</td>
                                                <td className={`border border-black px-4 py-2 text-center ${isZero ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                    {userCentered[selectedItem]?.toFixed(1) || 'N/A'} {/* Display mean-centered value per user */}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>


                                {/*tabel user item */}

                                {/*    vektor similaritas*/}
                                <h2 className='font-semibold my-4'>Nilai Similaritas</h2>
                                {selectedUserIndex < result['similarity'].length ? (
                                    <table className="border border-black mt-4 mx-auto text-center">
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-black px-4 py-2">User</th>
                                            <th className="border border-black px-4 py-2">Nilai Similaritas
                                                (User {selectedUserIndex + 1})
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {result['similarity'].map((row, colIndex) => {
                                            const isTopSimilarity = topSimilarities.some(top => top.index === colIndex); // Check if this row is in the top similarities

                                            return (
                                                <tr key={colIndex}>
                                                    <td className="border border-black px-4 py-2 bg-gray-200">{colIndex + 1}</td>
                                                    <td className={`border border-black px-4 py-2 text-center ${row[selectedUserIndex] === 1 ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                        {row[selectedUserIndex]?.toFixed(4) || 'N/A'} {/* Display similarity value */}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Data for this user is not available.</p>
                                )}

                            </div>

                            {/* Menampilkan perhitungan manual */}

                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression}/>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>

                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {PrediksiFormula ? (
                                        <MathJaxComponent math={PrediksiFormula}/>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <p className="text-xl font-bold text-gray-700">Hasil prdiksi rating Item
                                target {selectedUserIndex + 1} terhadap
                                item {selectedItem + 1} adalah = {selectedValue.toFixed(3)}</p>


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
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghitung Prediksi Item-Based</h1>
            </div>
            <div className='text-start ml-10'>
                <h2 className='font-semibold'>1. Menentukan Item Target</h2>
                <h2 className='font-semibold'>2. Mencari daftar user yang belum memberi rating user target</h2>
                <h2 className='font-semibold'>3. Menentukan tetangga terdekat item target</h2>
                <p className='text-gray-700 font-medium ml-5 text-justify '>Tetangga terdekat X<sub>u</sub>(j) merupakan
                    himpunan sejumlah k user yang merupakan tetangga terdekat (atau similar dengan ) user target u, yang
                    telah memberikan rating pada item j</p>
                <p className='ml-5 font-semibold'>Catatan : | X<sub>u</sub>(j) | ≤ k</p>
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-start items-start flex-row my-5 pl-5'>
                        <div className='border-2 py-3 px-3 border-black rounded-lg'>
                            {ArgMax.map((math, index) => (
                                <MathJaxComponent key={index} math={math}/>
                            ))}
                        </div>

                        <p className='ml-4 items-center text-red-500 font-semibold text-justify'>Dimana himpunan
                            didapatkan berdasarkan urutan nilai similaritasnya (dari yang terbesar ke yang terkecil)</p>
                    </div>

                </MathJaxContext>
                <h2 className='font-semibold'>4. Menentukan prediksi rating</h2>

            </div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Fungsi Prediksi Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {ItemBasedPrediction.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusPrediksiItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Prediksi Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelPrediksi/>
            </div>
            <div className="flex items-center my-5">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghasilkan Top-N Rekomendasi </h1>
            </div>
            <TopNPrediksi/>

        </div>
    )
}