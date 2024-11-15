import React, { useState, useEffect } from 'react';
import '../../index.css';

import ReactFlipCard from 'reactjs-flip-card';

const ReactFlip = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mb-40">
            {/* Kolom 1: Flip Card User-Based */}
            <div className="flex justify-center">
                <ReactFlipCard
                    frontStyle={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                        borderRadius: '20px',
                        padding: '5px',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                    backStyle={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                        borderRadius: '20px',
                        padding: '5px',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                    frontComponent={
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 italic">User-Based</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Gambar User-Based
                            </p>
                        </div>
                    }
                    backComponent={
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 italic">User-Based
                                (Back)</h2>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                Media pembelajaran berbasis rekomendasi memanfaatkan teknik
                                seperti <span
                                className="font-semibold"><i>user-based</i></span> dan <span
                                className="font-semibold"><i>item-based filtering</i></span> untuk
                                memberikan pengalaman belajar yang lebih personal.
                            </p>
                        </div>
                    }
                />
            </div>

            {/* Kolom 2: Flip Card Item-Based */}
            <div className="flex justify-center">
                <ReactFlipCard
                    frontStyle={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                        borderRadius: '20px',
                        padding: '5px',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                    backStyle={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                        borderRadius: '20px',
                        padding: '5px',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                    frontComponent={
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 italic">Item-Based</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Gambar item-based
                            </p>
                        </div>
                    }
                    backComponent={
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 italic">Item-Based
                                (Back)</h2>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                Dengan pendekatan ini, pembelajaran menjadi lebih efektif dan
                                relevan. Sistem dapat mengidentifikasi materi yang sesuai dengan
                                gaya belajar masing-masing, memastikan bahwa siswa selalu diberikan
                                tantangan yang tepat, dan mengurangi kebosanan dalam belajar.
                            </p>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

const ContentOverview = () => {
    return (
        <>
            <ReactFlip/>

            {/* Bottom Section: Single Column */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mt-6 max-w-2xl mx-auto">
                <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary mb-5">Collaborative Filtering</h1>
                <p className="text-base sm:text-md md:text-lg text-gray-600">
                    Media pembelajaran berbasis rekomendasi memanfaatkan teknik seperti <span className="font-semibold"><i>user-based</i></span> dan <span className="font-semibold"><i>item-based filtering</i></span> untuk memberikan pengalaman belajar yang lebih personal. Sistem ini merekomendasikan materi yang sesuai dengan minat dan kebutuhan individu, berdasarkan interaksi sebelumnya atau kesamaan dengan pengguna lain.
                </p>
                <div className="mt-6">
                    <p className="text-base sm:text-md md:text-lg text-gray-600">
                        Dengan pendekatan ini, pembelajaran menjadi lebih efektif dan relevan. Sistem dapat mengidentifikasi materi yang sesuai dengan gaya belajar masing-masing, memastikan bahwa siswa selalu diberikan tantangan yang tepat, dan mengurangi kebosanan dalam belajar.
                    </p>
                </div>

            </div>
        </>
    );
};

export default function OverViewRekomendasi() {
    const TypingEffect = () => {
        const [currentText, setCurrentText] = useState("User-Based");
        const textOptions = ["User-Based", "Item-Based"];
        const transitionDuration = 1000;

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentText((prevText) => (prevText === "User-Based" ? "Item-Based" : "User-Based"));
            }, transitionDuration * 2);

            return () => clearInterval(interval);
        }, []);

        return (
            <section>
                <h1 className="font-bold font-poppins mb-5 md:mb-8 text-3xl sm:text-4xl md:text-5xl text-gray-800">
                    <span className="text-slider inline-block">
                        <span className="slide-text">{`Apa itu ${currentText} ?`}</span>
                    </span>
                </h1>
            </section>
        );
    };

    return (
        <div id="belajar" className="max-w-4xl mx-auto text-center py-10 px-4 font-poppins">
            <TypingEffect />
            <ContentOverview />
        </div>
    );
}
