import React from 'react';
import ImageAs from '../../assets/images/lear.png';
import { AccordionMeasure } from "../../components/AccordionMeasure";
import LayoutHome from '../Layout/Home/LayoutHome.jsx';
import CardHome from '../../components/Card/Home/CardHome.jsx';
import CardAnggotaHome from '../../components/Card/Home/CardAnggotaHome.jsx';
import HeaderHome from '../Layout/Home/HeaderHome.jsx';
import BodyHome from '../Layout/Home/BodyHome.jsx';
import BackToTopButton, {BackToTopButtonHome} from "../../components/Navigate/BackToTopNavigate";
import OverViewRekomendasi from "../../components/Toggle/OverViewPage";
import Img1 from '../../assets/images/img1.png';


const Home = () => {
    const listOfSimilarity = [
        {
            title: 'Pearson Coefficient Correlation (PCC)',
            description: <>
                <a href="https://www.sciencedirect.com/science/article/pii/S1319157821002652" className='font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'>Pearson Coefficient Correlation (PCC)</a> Metode ini digunakan untuk mengukur kekuatan hubungan linier
                antara
                dua variabel, seperti rating pengguna terhadap item. Dalam sistem rekomendasi, Pearson Coefficient Correlation (PCC) digunakan untuk menghitung kesamaan antara pengguna berdasarkan preferensi mereka. Nilai PCC berkisar antara -1 hingga 1: nilai 1 menunjukkan kesamaan penuh (korelasi positif), nilai -1 menunjukkan kebalikan sempurna (korelasi negatif), dan nilai 0 menunjukkan tidak ada hubungan sama sekali.
            </>
        },
        {
            title: 'Vector Similarity (Cosine)',
            description: <>
                <a href="https://rifqimulyawan.com/kamus/cosine-similarity/#:~:text=Contoh%20penerapan%20Cosine%20Similarity%20adalah%20pada%20sistem%20rekomendasi,pengguna%20dengan%20film-film%20yang%20tersedia%20di%20dalam%20database." className='font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'>Cosine Similarity</a>  digunakan dalam sistem rekomendasi untuk mengukur kesamaan atau kemiripan antara dua objek, seperti pengguna, item, atau dokumen. Dalam konteks sistem rekomendasi, cosine similarity digunakan untuk membandingkan kesamaan antara preferensi pengguna atau kesamaan antara item. Nilai yang mendekati 1 menunjukkan korelasi yang kuat antara kedua variabel, sementara nilai yang mendekati 0 menunjukkan tidak adanya korelasi, yang berarti kedua variabel bersifat independen.
            </>
        },
        {
            title: 'Adjusted Vector Cosine',
            description: <>
                <a href="https://medium.com/@sujathamudadla1213/what-is-the-difference-between-cosine-similarity-and-adjusted-cosine-similarity-eb2b71f2236c" className='font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'>Adjusted Vector Cosine</a>  adalah variasi dari cosine similarity yang dirancang untuk mengurangi bias dalam data, misalnya ketika beberapa pengguna hanya memberikan rating pada sebagian kecil item. Yang memperhitungkan perbedaan skala penilaian antara pengguna. Umumnya digunakan dalam sistem rekomendasi untuk membandingkan kesamaan antara penilaian pengguna. <a
                href="https://www.sciencedirect.com/science/article/pii/S1319157821002652" className='font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'>Nilai adjusted cosine similarity</a>  berkisar antara -1 hingga 1. Nilai 1 menunjukkan korelasi positif yang kuat, nilai -1 menunjukkan korelasi negatif yang kuat, dan nilai 0 menunjukkan tidak ada korelasi sama sekali
            </>
        },
        {
            title: 'Bhattacharyya Coefficient Similarity (BC)',
            description: <>
                <a href="https://medium.com/@yoavyeledteva/bhattacharyya-distance-from-statistics-to-application-in-data-science-8eb5ccdbba62" className='font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'>Bhattacharyya Coefficient Similarity</a>  adalah cara untuk mengukur perbedaan antara dua distribusi probabilitas. Ini memberi tahu kita berapa banyak tumpang tindih yang ada antara dua distribusi, dan dapat membantu kita menentukan seberapa mirip atau berbeda mereka. Nilai Bhattacharyya Coefficient Similarity Nilai 1 menunjukkan kesamaan yang sempurna (tumpang tindih penuh), sementara nilai 0 menunjukkan tidak ada kesamaan sama sekali (tidak ada tumpang tindih).
            </>

        }
    ];


    return (
        <LayoutHome>

            <HeaderHome><>
                Media Pembelajaran Interaktif Sistem Rekomendasi dan Perhitungan Fungsi
                Similaritas
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="absolute top-0 -left-10 transform -translate-x-20 sm:-left-5 md:-left-10 lg:-left-10 xl:-left-12">
                        <img src={Img1} alt="Icon 1"
                             className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-100"/>
                    </div>
                    <div
                        className="absolute top-10 right-0 transform translate-x-20 sm:translate-x-10 md:translate-x-20 lg:translate-x-20 xl:translate-x-24">
                        <img src={Img1} alt="Icon 2"
                             className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-100"/>
                    </div>
                </div>

            </>
            </HeaderHome>

            {/*<section id="" className='max-w-4xl mx-auto text-center py-10 px-4'>*/}
            {/*    <h1 className=' font-bold font-poppins mb-10 md:mb-20 text-3xl sm:text-4xl md:text-5xl'>Apa itu User-Based dan Item-Based </h1>*/}
            {/*</section>*/}
            <OverViewRekomendasi/>

            <BodyHome
                // idName={"belajar"}
                header={"Pilih Tutorial atau Practice Untuk Perhitungan Fungsi Similaritas"}
                subheader={
                    "Pengguna dapat memilih untuk memulai pembelajaran sistem rekomendasi melalui dua opsi menarik: 'Tutorial Fungsi Similaritas' untuk memahami konsep dasar, atau 'Practice Fungsi Similaritas' untuk mengasah keterampilan dengan latihan langsung."
                }
                hirarki={'1'}
                type="grid"
            >
                <CardHome
                    Image={ImageAs}
                    bgColor={"bg-card_blue_primary"}
                    Heading={"Tutorial Fungsi Similaritas"}
                    buttonName={"Tutorial Now"}
                    anchor={"/Tutorial"}
                > Untuk belajar dan memahami cara perhitungan <span className='bold'>fungsi similaritas</span> bagi
                    baru
                    yang ingin mempelajari sistem rekomendasi.</CardHome>

                <CardHome
                    Image={ImageAs}
                    bgColor={"bg-card_green_primary"}
                    Heading={"Practice Fungsi Similaritas"}
                    buttonName={"Practice Now"}
                    anchor={"/practice"}
                > Untuk eksplorasi dan eksperimen dalam perhitungan <span className='bold'>fungsi similaritas</span> guna
                    pemahaman yang lebih mendalam. </CardHome>
            </BodyHome>

            {/* About Section */}

            <BodyHome
                header={"Tentang Aplikasi Website Media Pembelajaran"}
                type="casual"
                hirarki="1"
                subheader={
                    "Aplikasi ini merupakan platform media pembelajaran berbasis website yang dirancang untuk mempermudah pembelajaran interaktif. Dengan menggunakan sistem rekomendasi berbasis User-Based dan Item-Based, aplikasi ini memberikan pengalaman belajar yang lebih personal dan efektif. Pengguna dapat mengikuti tahapan pembelajaran yang jelas dan disertai dengan visualisasi yang mendukung untuk memperjelas materi dan meningkatkan pemahaman."
                }
            />


            {/* Fungsi Similaritas s Section */}
            <BodyHome
                header={"Fungsi Similaritas Yang Diterapkan Pada Website Media Pembelajaran"}
                hirarki='1'
                type='space'
                subheader={
                    "Ini adalah platform pembelajaran berbasis website yang mengajarkan cara menghitung Fungsi Similaritas, baik untuk sistem rekomendasi berbasis pengguna (user-based) maupun berbasis item (item-based). Melalui aplikasi ini, pengguna dapat memahami secara mendalam bagaimana algoritma rekomendasi bekerja."
                }


            >
                {listOfSimilarity.map((item, index) => (
                    <AccordionMeasure key={index} headingMeasure={item.title}
                                      descriptionMeasure={item.description}/>
                ))}
            </BodyHome>

            {/* Team Section */}

            <BodyHome
                header={"Anggota Yang Terlibat"}
                subheader={"Tim pengembang media pembelajaran sistem rekomendasi dengan metode Fungsi Similaritas terdiri dari mahasiswa yang memiliki minat di bidang sistem rekomedasi. Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari pengembangan perangkat lunak, hingga desain antarmuka pengguna."}
                type='grid'
            >
                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_blue_primary"}
                    Nama={"Dr. Noor Ifada, S.T., MISD."}
                    Identitas={"NIDN : 0017037802 "}
                />

                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_green_primary"}
                    Nama={"Alfi Nur danialin"}
                    Identitas={"NIM : 210411100059"}
                />

                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_pink_primary"}
                    Nama={"Dimas Dliyaur Rahman"}
                    Identitas={"NIM : 210411100080"}
                />
            </BodyHome>

            {/* Reference Section */}
            <BodyHome
                header={"Reference"}
                subheader={""}
                type='casual'
            >
                <li>
                    Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching
                    Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In
                    International Conference on Electrical Engineering and Informatics (ICEEI) (pp.
                    1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
                <li>
                    Ifada, ., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching
                    Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In
                    International Conference on Electrical Engineering and Informatics (ICEEI) (pp.
                    1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
            </BodyHome>

            <BackToTopButtonHome/>
        </LayoutHome>


    );
}

export default Home