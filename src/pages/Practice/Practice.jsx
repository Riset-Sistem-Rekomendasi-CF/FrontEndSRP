import React, { useState } from 'react';
import CardSteps from "../../components/Card/Main/CardSteps.jsx"
import { DropdownMethodBased, DropdownSimilarityMeasure } from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import Navigator from '../../components/Navigate/Navigator';
import NotationCard from '../../components/table/NotaionCard.jsx';

import FormMeasure from "../../components/Form/FormMeasure";
import VidioTutorialModal from "../../components/modal/VidioTutorialModal";
import {
    Build,
    FilterList,
    Lightbulb,
    People,
    RateReview,
    ShowChart, SportsMotorsports,
    Star
} from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BodyTutorial from "../Layout/Tutorial/BodyTutorial";

function Practice() {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };


    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedSimilarity, setSelectedSimilarity] = useState('');
    const [data, setData] = useState([])

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        setDescriptionVisible(false)
    };

    const handleTurnDescription = (condition) => {
        setDescriptionVisible(condition)
    }

    const handleSimilarityChange = (similaritas) => {
        setSelectedSimilarity(similaritas);
        setDescriptionVisible(false)
    };

    const handleClick = (label) => {
        console.log(`${label} clicked`);
    };

    const handleDataChange = (data) => {
        setData(data)
    };

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
                header={"Practice Fungsi Similaritas"}
                subheader={"Pada Page Practice pengguna bisa  bereksplorasi dan ingin melakukan" +
                    " eksperiment tentang perhitungan Fungsi Similaritas untuk pemahaman yang" +
                    " lebih lanjut. "}
            />


            <VidioTutorialModal/>

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


            <section className='max-w-4xl mx-auto text-center py-5'>
                <div className='flex flex-row items-center justify-center'>
                    <div
                        className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>1
                    </div>
                    <h1 className='text-2xl font-bold font-poppins py-5 ml-3'>Buat Tabel
                        Rating:</h1>
                </div>
                <FormMeasure
                    onDataChange={handleDataChange}
                    onDescriptionChange={handleTurnDescription}
                />

            </section>

            <section className='max-w-4xl mx-auto text-center py-5'>
                <NotationCard opsional={selectedMethod.toLowerCase()} data={data}/>
            </section>

            <section className="max-w-6xl mx-auto text-center py-5">
                <h1 className="text-3xl sm:text-4xl font-semibold font-poppins py-10 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
                    Pilih Sistem Rekomendasi dan Metode Similaritas
                </h1>
                <div
                    className="flex flex-col sm:flex-row justify-center sm:justify-around gap-8 sm:gap-10">

                    {/* First Column */}
                    <div className="flex flex-col items-center w-full sm:w-auto">
                        <div className="flex flex-row items-center">
                            <div
                                className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">3
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold font-poppins py-5 sm:py-10 px-3">Pilih Sistem
                                 Rekomendasi</h1>
                        </div>
                        <DropdownMethodBased onChange={handleMethodChange}/>
                    </div>

                    {/* Second Column */}
                    <div className="flex flex-col items-center w-full sm:w-auto">
                        <div className="flex flex-row items-center">
                            <div
                                className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">4
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold font-poppins py-5 sm:py-10 px-3">Pilih
                                Metode Similaritas</h1>
                        </div>
                        <DropdownSimilarityMeasure onChange={handleSimilarityChange}/>
                    </div>
                </div>
            </section>


            <section className='max-w-4xl mx-auto text-center my-10 py-10 '>
                <button onClick={toggleDescription}
                        className=" w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                    Cek Hasil Perhitungan Similaritas
                    {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg"/> :
                        <ExpandMoreIcon className="ml-2 text-lg"/>}
                </button>
                {isDescriptionVisible && (
                    <section className='max-w-6xl mx-auto text-center my-10 py-10'>
                        <h1 id="topMenuSim"
                            className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins py-5 sm:py-6 md:py-8 lg:py-10">
                            Hasil dan Pembahasan :
                        </h1>

                        <div
                            className="flex flex-wrap space-x-2 space-y-2 items-center justify-center mx-auto">
                            <h1 className='text-lg justify-center my-3'>Daftar Isi : </h1>
                            {/* Mean Rating */}
                            <Chip
                                label="Mean Rating"
                                icon={<Star/>}
                                onClick={() => scrollToSection('mean-rating-section')}
                                color="success"
                                variant="outlined"
                                clickable
                                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                                iconOnlyClass="sm:flex"
                            />

                            {/* Mean-Centered */}
                            <Chip
                                label="Mean-Centered"
                                icon={<ShowChart/>}
                                onClick={() => scrollToSection('mean-cen-section')}
                                color="primary"
                                variant="outlined"
                                clickable
                                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                            />

                            {/* Similaritas */}
                            <Chip
                                label="Similaritas"
                                icon={<People/>}
                                onClick={() => scrollToSection('sim-section')}
                                color="warning"
                                variant="outlined"
                                clickable
                                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                            />

                            {/* Prediksi */}
                            <Chip
                                label="Prediksi"
                                icon={<Lightbulb/>}
                                onClick={() => scrollToSection('pred-section')}
                                color="success"
                                variant="outlined"
                                clickable
                                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                            />

                            {/* Top-N */}
                            <Chip
                                label="Top-N"
                                icon={<AssignmentTurnedInIcon/>}
                                onClick={() => scrollToSection('topN-section')}
                                color="secondary"
                                variant="outlined"
                                clickable
                                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                            />
                        </div>


                        <DetailPageBox method={selectedMethod} similarity={selectedSimilarity}
                                       data={data}/>

                    </section>
                )}
            </section>


        </div>
    );
}

export default Practice;
