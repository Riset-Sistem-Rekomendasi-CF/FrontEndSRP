import React, { useState } from 'react';
import TabelView from "../../components/table/TabelView.jsx";
import CardSteps from "../../components/Card/Main/CardSteps.jsx";
import DropdownMethodBased from '../../components/Form/Tutorial/DropdownMethodBased.jsx';
import DropdownSimilarityMeasure from '../../components/Form/Tutorial/DropdownSimilarityMeasure.jsx';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import Navigator from '../../components/Navigate/Navigator';
import VideoTutorialModal from '../../components/modal/VidioTutorialModal';
import BodyTutorial from '../Layout/Tutorial/BodyTutorial.jsx';
import FormLayoutTutorial from '../Layout/Tutorial/FormTutorial.jsx';
import NotationCard from '../../components/table/NotaionCard.jsx';
import Chip from '@mui/material/Chip';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {
    RateReview,
    Build,
    FilterList,
    Star,
    ShowChart,
    People,
    SportsMotorsports, Lightbulb,

} from '@mui/icons-material'; // Import ikon MUI


const Tutorial = () => {

    const form = [
        {
            header: "Pilih Metode Sistem Rekomendasi",
            element: <DropdownMethodBased
                onChange={(method) => {
                    setSelectedMethod(method);
                    handleTurnDescription(false)
                }} />
        },
        {
            header: "Pilih Fungsi Similaritas",
            element: <DropdownSimilarityMeasure
                onChange={(similaritas) => {
                    setSelectedSimilarity(similaritas);
                    handleTurnDescription(false)
                }} />
        },
    ]
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };

    const handleTurnDescription = (condition) => {
        setDescriptionVisible(condition)
    }


    const [data] = useState([
        [5, 0, 4, 3, 5, 4],
        [4, 5, 0, 3, 2, 3],
        [0, 3, 0, 2, 1, 0],
        [1, 2, 2, 0, 3, 4],
        [1, 0, 1, 2, 3, 3]
    ]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedSimilarity, setSelectedSimilarity] = useState('');

    const handleClick = (label) => {
        console.log(`${label} clicked`);
    };

    // const scrollToMeanRating = () => {
    //     // Menggunakan window.scrollTo() dengan smooth behavior
    //     const element = document.getElementById('mean-rating-section');
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    const scrollToSection = (sectionId) => {
        // Mencari elemen berdasarkan ID dan melakukan scroll halus
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="p-4">
            {/* Section Of Navigate */}
            <Navigator/>

            <BodyTutorial
                header={"Tutorial Fungsi Similaritas"}
                subheader={" Pada Page tutorial ini pengguna akan diberikan tutorial tentang perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga pengguna paham tentang perhitungan Fungsi Similaritas dengan berbagai metode yang bisa digunakan "}
            />

            <VideoTutorialModal/>

            <BodyTutorial
                header={"Langkah-langkah"}
                subheader={"Berikut adalah langkah-langkah yang perlu diikuti untuk menghitung fungsi similaritas berdasarkan data rating yang akan digunakan:"}

            />


            <section className="max-w-5xl mx-auto p-6 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardSteps
                        heading="Menyiapkan Data Rating"
                        description="Menyiapkan data rating yang akan digunakan untuk perhitungan fungsi similaritas."
                        icon={<RateReview className="w-8 h-8"/>} // Ikon untuk langkah 1
                    />
                    <CardSteps
                        heading="Memilih Metode Digunakan"
                        description="Memilih metode yang ingin digunakan, apakah User-Based atau Item-Based."
                        icon={<Build className="w-8 h-8"/>} // Ikon untuk langkah 2
                    />
                    <CardSteps
                        heading="Memilih Fungsi Similaritas"
                        description="Memilih fungsi similaritas yang akan digunakan untuk menghitung kemiripan."
                        icon={<FilterList className="w-8 h-8"/>} // Ikon untuk langkah 3
                    />
                </div>
            </section>


            <BodyTutorial
                header={"Data Rating Yang Digunakan"}

                subheader={"Data rating yaitu suatu kumpulan data yang telah diberikan rating pada item tertentu oleh user."}
            >
                <TabelView/>
                <NotationCard opsional={selectedMethod.toLowerCase()} data={data}/>
            </BodyTutorial>
            <FormLayoutTutorial
                data={form}
            />


            <section className='max-w-6xl mx-auto text-center my-10 py-10 relative'>
                <button onClick={toggleDescription}
                        className="w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                    Cek Hasil Perhitungan Similaritas
                    {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg"/> :
                        <ExpandMoreIcon className="ml-2 text-lg"/>}
                </button>
                {isDescriptionVisible && (
                    <div className='flex flex-row '>
                        <section className='max-w-4xl mx-auto text-center py-10'>
                            <h1 id="topMenuSim" className='text-5xl font-bold font-poppins py-10 '>Hasil dan
                                Pembahasan</h1>
                            <div
                                className="flex space-x-2 items-center justify-center mx-auto">
                                {/* Mean Rating */}
                                <Chip
                                    label="Mean Rating"
                                    icon={<Star/>}
                                    // onClick={() => handleClick('Mean Rating')}
                                    onClick={() => scrollToSection('mean-rating-section')}
                                    color="success"
                                    variant="outlined"
                                    clickable
                                    className="cursor-pointer"
                                />

                                {/* Mean-Centered */}
                                <Chip
                                    label="Mean-Centered"
                                    icon={<ShowChart/>}
                                    onClick={() => scrollToSection('mean-cen-section')}
                                    // onClick={scrollToMeanRating}
                                    color="primary"
                                    variant="outlined"
                                    clickable
                                    className="cursor-pointer"
                                />

                                {/* Similaritas */}
                                <Chip
                                    label="Similaritas"
                                    icon={<People/>}
                                    onClick={() => scrollToSection('sim-section')}
                                    color="warning"
                                    variant="outlined"
                                    clickable
                                    className="cursor-pointer"
                                />

                                {/* Prediksi */}
                                <Chip
                                    label="Prediksi"
                                    icon={<Lightbulb/>}
                                    onClick={() => scrollToSection('pred-section')}
                                    color="success"
                                    variant="outlined"
                                    clickable
                                    className="cursor-pointer"
                                />

                                {/* Top-N */}
                                <Chip
                                    label="Top-N"
                                    icon={<AssignmentTurnedInIcon/>}
                                    onClick={() => scrollToSection('topN-section')}
                                    color="secondary"
                                    variant="outlined"
                                    clickable
                                    className="cursor-pointer"
                                />
                            </div>

                            <div>
                                <DetailPageBox
                                    method={selectedMethod}
                                    similarity={selectedSimilarity}
                                    data={data}
                                />
                            </div>
                        </section>
                    </div>

                )}

            </section>


        </div>
    );
}

export default Tutorial;
