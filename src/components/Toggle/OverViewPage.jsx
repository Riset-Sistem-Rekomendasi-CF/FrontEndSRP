import React, { useState, useEffect } from 'react';
import '../../index.css';
import UserBased from '../../assets/vidioAsset/userBased.gif';
import ItemBased from '../../assets/vidioAsset/itemBased.gif';

import Img1 from '../../assets/images/img1.png';
import Img8 from '../../assets/images/img8.png';


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
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 italic">User-Based</h2>
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
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 italic">Item-Based</h2>
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
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mb-6 max-w-4xl mx-auto">
                <h1 className="animate-bounce text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary mb-5">
                    Sistem Rekomendasi
                </h1>
                <p className="text-base sm:text-md md:text-lg text-gray-600 text-justify">
                    <a href="https://www.bing.com/ck/a?!&&p=024c8e5d90fb32c16daaec06b7404838325313e0097f7340e2a37bb95b0a5cadJmltdHM9MTczMjA2MDgwMA&ptn=3&ver=2&hsh=4&fclid=333afb95-0e41-6f3e-3613-eb710fbc6e24&psq=IMPLEMENTASI+METODE+COLLABORATIVE+FILTERING+UNTUK+SISTEM+REKOMENDASI+PENJUALAN+PADA+TOKO+MEBEL&u=a1aHR0cHM6Ly9lam91cm5hbC5ic2kuYWMuaWQvZWp1cm5hbC9pbmRleC5waHAva2hhdHVsaXN0aXdhL2FydGljbGUvZG93bmxvYWQvOTg1OS80ODcz&ntb=1"
                       className='text-italic font-semibold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary '
                       target="_blank" rel="noopener noreferrer">Sistem Rekomendasi</a> merupakan sistem
                    atau aplikasi yang dibuat untuk dapat
                    menyediakan dan memberikan rekomendasi
                    dari suatu <i>item</i> untuk membuat suatu
                    keputusan yang diinginkan oleh <i>user</i>  pada
                    sistem.
                </p>

            </div>
            {/* Bottom Section: Single Column */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mb-6 max-w-4xl mx-auto">
                <h1 className="animate-bounce text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary mb-5">
                    Collaborative Filtering
                </h1>
                <p className="text-base sm:text-md md:text-lg text-gray-600 text-justify">
                    <a href="https://www.researchgate.net/publication/365477302_Sistem_Rekomendasi_Produk_Aplikasi_Marketplace_Berdasarkan_Karakteristik_Pembeli_Menggunakan_Metode_User_Based_Collaborative_Filtering"
                       className='text-italic font-semibold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary '
                       target="_blank" rel="noopener noreferrer">Collaborative Filtering</a> adalah
                    metode yang digunakan dalam
                    sistem rekomendasi yang menghasilkan rekomendasi khusus kepada
                    <i> user </i> tentang <i> item </i> berdasarkan pola penilaian atau
                    penggunaan. Teknik ini
                    terbagi menjadi dua pendekatan utama: <span
                    className="font-semibold"><i>user-based </i></span> dan <span
                    className="font-semibold"><i>item-based </i></span>. Metode ini menghasilkan
                    prediksi atau rekomendasi untuk
                    pengguna tertentu untuk satu atau banyak <i> item </i>.
                </p>

            </div>
            <CardFlip/>


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
                            src={Img8}
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
