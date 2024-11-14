
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RateReview, Build, FilterList } from '@mui/icons-material'; // Misalnya kita pakai ikon MUI


const ScrollButton = () => {
    // const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scrollToSection = () => {
        const section = document.getElementById("belajar");
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='flex justify-center gap-4 mt-20 mb-8'>
            <Link
                onClick={scrollToSection}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className='font-bold font-poppins bg-yellow-btn-primary text-white px-8 py-4 rounded-full shadow-md hover:bg-yellow-btn-primary flex items-center transition-colors duration-200'
            >
                Mulai Sekarang
                {isHovered ? (
                    <ArrowDownwardIcon className="ml-2 text-xl transition-transform duration-300" />
                ) : (
                    <ArrowForwardIcon className="ml-2 text-xl transition-transform duration-300" />
                )}
            </Link>
        </div>
    );
}

const HeaderHome = ({ children }) => {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center">
            {/* Latar belakang */}
            {/* Konten */}
            <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
                {/* Judul dengan animasi dan efek 3D */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins text-black mb-4 relative animate__animated animate__fadeIn animate__delay-1s">
                    {children}
                </h1>


                {/* Deskripsi atau subjudul */}
                <p className=" mt-8 font-medium text-lg sm:text-xl lg:text-2xl font-poppins text-gray-800 opacity-90 mb-6 max-w-3xl mx-auto leading-relaxed tracking-wide">
                    Platform pembelajaran berbasis <span
                    className='italic'>website</span> dengan metode sistem rekomendasi
                    untuk meningkatkan pengalaman belajar Anda.
                </p>


                {/* Tombol scroll dengan animasi */}
                <ScrollButton/>
            </div>
        </section>
    );
};


export default HeaderHome