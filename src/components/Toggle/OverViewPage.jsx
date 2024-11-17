import React, { useState, useEffect } from 'react';
import '../../index.css';
// import UserBased from '../../assets/images/userbased.png';
// import ItemBased from '../../assets/images/itembased.png';
import UserBased from '../../assets/vidioAsset/userBasedGif.gif';
import ItemBased from '../../assets/vidioAsset/itemBasedGif.gif';

import Img1 from '../../assets/images/img1.png';

const CardFlip = () => {
    // State terpisah untuk kartu kiri dan kanan
    const [isLeftFlipped, setIsLeftFlipped] = useState(false);
    const [isRightFlipped, setIsRightFlipped] = useState(false);

    // Fungsi untuk membalik kartu kiri
    const flipLeftCard = () => {
        setIsLeftFlipped(!isLeftFlipped);
    };

    // Fungsi untuk membalik kartu kanan
    const flipRightCard = () => {
        setIsRightFlipped(!isRightFlipped);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Kartu Kiri */}
            <div
                onClick={flipLeftCard}
                className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-80 sm:h-96 perspective-[1000px] cursor-pointer"
            >
                <div
                    className={`absolute w-full h-full transition-transform duration-500 ${
                        isLeftFlipped ? 'rotate-y-180' : ''
                    } transform-style-preserve-3d`}
                >
                    {/* Front */}
                    <div
                        className="w-full h-full absolute bg-white text-white flex flex-col justify-start items-center p-5 rounded-xl shadow-lg backface-hidden"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2">User-Based</h2>
                        <img
                            src={UserBased}
                            alt="user-based"
                            className="w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 object-cover rounded-lg"
                        />
                    </div>

                    {/* Back */}
                    <div
                        className={`w-full h-full absolute bg-white text-white flex justify-center items-start p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 overflow-auto`}
                    >
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Pada <strong><i>user-based filtering</i></strong>, rekomendasi diberikan
                            berdasarkan kesamaan antara pengguna. Jika dua pengguna memiliki pola
                            interaksi yang serupa (misalnya, mereka menyukai materi atau item yang
                            sama), maka sistem akan merekomendasikan item yang disukai oleh pengguna
                            serupa tersebut kepada pengguna yang sedang dipertimbangkan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Kartu Kanan */}
            <div
                onClick={flipRightCard}
                className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-80 sm:h-96 perspective-[1000px] cursor-pointer"
            >
                <div
                    className={`absolute w-full h-full transition-transform duration-500 ${
                        isRightFlipped ? 'rotate-y-180' : ''
                    } transform-style-preserve-3d`}
                >
                    {/* Front */}
                    <div
                        className="w-full h-full absolute bg-white text-white flex flex-col justify-start items-center p-5 rounded-xl shadow-lg backface-hidden"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2">Item-Based</h2>
                        <img
                            src={ItemBased}
                            alt="item-based"
                            className="w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 object-cover rounded-lg"
                        />
                    </div>

                    {/* Back */}
                    <div
                        className={`w-full h-full absolute bg-white text-white flex justify-center items-start p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 overflow-auto`}
                    >
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Di sisi lain, <strong><i>item-based filtering</i></strong> mengukur
                            kesamaan antar item atau materi pembelajaran. Dalam pendekatan ini,
                            rekomendasi
                            diberikan berdasarkan kesamaan antara item yang telah dipilih atau
                            disukai
                            oleh pengguna sebelumnya dengan item lainnya. Jika pengguna menyukai
                            item A,
                            dan item B memiliki kesamaan yang tinggi dengan item A, maka item B akan
                            direkomendasikan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ContentOverview = () => {
    return (
        <>
            <CardFlip/>
            {/* Bottom Section: Single Column */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mt-6 max-w-2xl mx-auto">
                <h1 className="text-lg font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary mb-5">
                    Collaborative Filtering dalam Sistem Rekomendasi
                </h1>
                <p className="text-base sm:text-md md:text-lg text-gray-600">
                    <strong>Collaborative Filtering</strong> adalah metode yang digunakan dalam
                    sistem rekomendasi untuk memberikan saran atau rekomendasi berdasarkan
                    preferensi pengguna dan interaksi mereka dengan item sebelumnya. Teknik ini
                    terbagi menjadi dua pendekatan utama: <span className="font-semibold"><i>user-based filtering</i></span> dan <span
                    className="font-semibold"><i>item-based filtering</i></span>. Keduanya bekerja
                    dengan menganalisis pola perilaku pengguna dan kesamaan antar pengguna atau item
                    untuk menghasilkan rekomendasi yang relevan dan personal.
                </p>

                <div className="mt-6">
                    <p className="text-base sm:text-md md:text-lg text-gray-600">
                        Dengan menggunakan metode <strong>Collaborative Filtering</strong>,
                        baik <i>user-based</i> maupun <i>item-based</i>, sistem rekomendasi dapat
                        memberikan pengalaman belajar yang lebih terpersonalisasi. Pembelajaran
                        menjadi lebih efektif dan menarik karena materi yang disarankan sesuai
                        dengan preferensi dan gaya belajar individu. Rekomendasi yang tepat dapat
                        memotivasi pengguna untuk terus belajar, sehingga meningkatkan keterlibatan pengguna dalam
                        proses pembelajaran.
                    </p>
                </div>

            </div>


        </>
    );
};

export default function OverViewRekomendasi() {
    const TypingEffect = () => {
        const [currentText, setCurrentText] = useState("User-Based");
        const transitionDuration = 1000;

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentText((prevText) => (prevText === "User-Based" ? "Item-Based" : "User-Based"));
            }, transitionDuration * 2);

            return () => clearInterval(interval);
        }, []);

        return (
            <section className="relative flex items-center justify-center">
                <h1 className="font-bold font-poppins mb-5 md:mb-8 text-3xl sm:text-4xl md:text-5xl text-gray-800">
                <span className="text-slider inline-block">
                    <span
                        className="slide-text">{`Bagaimana Sistem Rekomendasi Bekerja di ${currentText} ?`}</span>
                </span>
                </h1>

                {/* Animasi Ikon atau Gambar */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Icon 1 */}
                    <div
                        className="absolute top-0 left-0 transform -translate-x-1/4 sm:-left-5  md:-left-10 lg:-left-12 xl:-left-14">
                        <img
                            src={Img1}
                            alt="Icon 1"
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-100"
                        />
                    </div>

                    {/* Icon 2 */}
                    <div
                        className="absolute top-10 right-0 transform translate-x-1/4 sm:translate-x-10 md:translate-x-20 lg:translate-x-20 xl:translate-x-24">
                        <img
                            src={Img1}
                            alt="Icon 2"
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-100"
                        />
                    </div>
                </div>

            </section>
        );
    };

    return (
        <div id="belajar" className="max-w-4xl mx-auto text-center py-10 px-4 font-poppins">
            <TypingEffect/>
            <ContentOverview/>
        </div>
    );
}
