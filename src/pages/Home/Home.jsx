import React from 'react';
import ImageAs from '../../assets/images/lear.png';
import { AccordionMeasure } from "../../components/AccordionMeasure";
import LayoutHome from '../Layout/Home/LayoutHome.jsx';
import CardHome from '../../components/Card/Home/CardHome.jsx';
import CardAnggotaHome from '../../components/Card/Home/CardAnggotaHome.jsx';
import HeaderHome from '../Layout/Home/HeaderHome.jsx';
import BodyHome from '../Layout/Home/BodyHome.jsx';
import BackToTopButton, {BackToTopButtonHome} from "../../components/Navigate/BackToTopNavigate";



const Home = () => {
    const listOfSimilarity = [
        {
            title: 'Pearson Coefficient Correlation (PCC)',
            description: 'Metode ini digunakan untuk mengukur kekuatan hubungan linier antara dua variabel, seperti rating pengguna terhadap item. Dalam sistem rekomendasi, Pearson Coefficient Correlation (PCC) digunakan untuk menghitung kesamaan antara pengguna berdasarkan preferensi mereka. Nilai PCC berkisar antara -1 hingga 1: nilai 1 menunjukkan kesamaan penuh (korelasi positif), nilai -1 menunjukkan kebalikan sempurna (korelasi negatif), dan nilai 0 menunjukkan tidak ada hubungan sama sekali.'
        },
        {
            title: 'Vector Similarity (Cosine)',
            description: 'Cosine Similarity digunakan dalam sistem rekomendasi untuk mengukur kesamaan antara dua vektor, yang mewakili rating atau preferensi pengguna terhadap item. Dalam pendekatan ini, baik pengguna maupun item diwakili sebagai vektor dalam ruang dimensi tinggi. Cosine similarity menghitung sudut antara dua vektor untuk menentukan seberapa mirip keduanya. Nilai cosine similarity mendekati 1 menunjukkan bahwa dua vektor sangat mirip, sementara nilai mendekati 0 berarti kedua vektor tidak memiliki kesamaan (variabel independen).'
        },
        {
            title: 'Adjusted Vector Cosine',
            description: 'Adjusted Vector Cosine adalah variasi dari cosine similarity yang dirancang untuk mengurangi bias dalam data, misalnya ketika beberapa pengguna hanya memberikan rating pada sebagian kecil item. Dengan metode ini, nilai rating pengguna disesuaikan dengan rata-rata rating mereka, sehingga memungkinkan perbandingan yang lebih adil antara pengguna yang memiliki pola pemberian rating yang berbeda-beda.'
        },
        {
            title: 'Bhattacharyya Coefficient Similarity (BC)',
            description: 'Dalam konteks sistem rekomendasi, Bhattacharyya Coefficient digunakan untuk mengukur kesamaan antara dua distribusi probabilitas, seperti distribusi rating pengguna terhadap berbagai item. Metode ini sangat berguna untuk membandingkan dua pengguna atau dua item dengan distribusi rating yang berbeda, dan membantu memberikan rekomendasi yang lebih relevan dengan memperhitungkan kemiripan distribusi preferensi mereka. Nilai yang lebih tinggi menunjukkan kesamaan yang lebih besar antara distribusi.'
        }
    ];


    return (
        <LayoutHome>

            <HeaderHome>Media Pembelajaran Interaktif Sistem Rekomendasi dan Perhitungan Fungsi Similaritas </HeaderHome>

            <BodyHome
                idName={"belajar"}
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
                > Untuk belajar dan memahami cara perhitungan <span className='bold'>fungsi similaritas</span> bagi baru
                    yang ingin mempelajari sistem rekomendasi.</CardHome>

                <CardHome
                    Image={ImageAs}
                    bgColor={"bg-card_green_primary"}
                    Heading={"Practice Fungsi Similaritas"}
                    buttonName={"Practice Now"}
                    anchor={"/practice"}
                > Untuk eksplorasi dan eksperimen dalam perhitungan <span className='bold'>fungsi similaritas</span>  guna pemahaman yang lebih mendalam. </CardHome>
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
                    "Ini adalah platform pembelajaran berbasis website yang mengajarkan cara menghitung Fungsi Similaritas, baik untuk sistem rekomendasi berbasis pengguna (user-based) maupun berbasis item (item-based). Melalui aplikasi ini, pengguna dapat memahami secara mendalam bagaimana algoritma rekomendasi bekerja untuk memberikan saran yang relevan dan personal."
                }


            >
                {listOfSimilarity.map((item, index) => (
                    <AccordionMeasure key={index} headingMeasure={item.title} descriptionMeasure={item.description} />
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
                    Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
                <li>
                    Ifada, ., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
            </BodyHome>

            <BackToTopButtonHome/>
        </LayoutHome>


    );
}

export default Home