import React, { useState, useEffect } from "react";
import { AccordionMeasure } from "../../components/AccordionMeasure";
import LayoutHome from "../Layout/Home/LayoutHome.jsx";
import CardHome from "../../components/Card/Home/CardHome.jsx";
import CardAnggotaHome from "../../components/Card/Home/CardAnggotaHome.jsx";
import HeaderHome from "../Layout/Home/HeaderHome.jsx";
import BodyHome from "../Layout/Home/BodyHome.jsx";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import OverViewRekomendasi from "../../components/Toggle/OverViewPage";
import Img1 from "../../assets/images/img1.png";
import Img7 from "../../assets/images/img7.png";
import tutorialPage from "../../assets/images/tutorialPage.png";
import buifa from "../../assets/images/ibu_Ifada.jpg";
import alfi from "../../assets/images/alfinur.JPG";
import dimas from "../../assets/images/Dimas.jpeg";
import ModalHomeFirst from "../../components/modal/ModalHomeFirst.jsx";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
// import Cookies from "js-cookie";

const RatingExplanationTable = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
    },
    {
      value: "-1",
      description:
        "Nilai -1 menunjukkan hubungan negatif sempurna, di mana kedua user atau item memiliki pola rating yang bertentangan. Contohnya, jika user A tidak menyukai suatu item, user C mungkin justru menyukai item tersebut.",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingExplanationTable2 = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingExplanationTable3 = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Ketika Nilai BC adalah 1 maka menunjukkan hubungan disitribusi positif  sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip dan hampir tidak ada berbedaanya sama sekali. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Ketika nilai Bhattacharyya Coefficient (BC) menjadi 0, misalnya pada User A dan User D memiliki distribusi rating yang sepenuhnya berbeda. Ini menunjukkan bahwa tidak ada kesamaan atau tumpang tindih antara distribusi rating mereka. Dengan kata lain, perubahan rating pengguna A tidak mempengaruhi pengguna D, karena keduanya memiliki pola rating yang sangat berbeda. Ini menggambarkan bahwa rekomendasi berdasarkan pola rating mereka tidak efektif, karena tidak ada kesamaan dalam cara mereka memberikan rating terhadap item-item yang sama. ",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Home = () => {
  // modal home

  const [isModalOpenHome, setIsModalOpenHome] = useState(false);

  useEffect(() => {
    // const hasVisited = localStorage.getItem("hasVisited");
    // const hasVisited = sessionStorage.getItem("hasVisited");
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // jika belum pernah dikunjungi, tampilkan modal
      setIsModalOpenHome(true);
      localStorage.getItem("hasVisited", "true");
    }
  }, []);

  const closeModal = () => setIsModalOpenHome(false); // Function to close modal

  // end modal home
  const listOfSimilarity = [
    {
      title: "Pearson Coefficient Correlation (PCC)",
      description: (
        <>
          <p className="mb-4">
            {" "}
            <a
              href="https://www.sciencedirect.com/science/article/pii/S1319157821002652"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pearson Coefficient Correlation (PCC)
            </a>{" "}
            adalah salah satu fungsi similaritas yang paling umum digunakan
            untuk mengukur similaritas di dalam Sistem Rekomendasi. Dalam sudut
            pandang CF, PCC menghitung hubungan linier antara dua user atau item
            berdasarkan data rating yang telah diberikan oleh user terhadap
            item. Nilai similaritas PCC berkisar antara -1 hingga 1:
          </p>
          <RatingExplanationTable />
        </>
      ),
    },
    {
      title: "Vector Similarity (Cosine)",
      description: (
        <>
          <p>
            <a
              href="https://rifqimulyawan.com/kamus/cosine-similarity/#:~:text=Contoh%20penerapan%20Cosine%20Similarity%20adalah%20pada%20sistem%20rekomendasi,pengguna%20dengan%20film-film%20yang%20tersedia%20di%20dalam%20database."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            >
              Cosine Similarity
            </a>{" "}
            digunakan dalam sistem rekomendasi untuk mengukur kesamaan atau
            kemiripan antara dua objek, seperti pengguna, item, atau dokumen.
            Dalam konteks sistem rekomendasi, cosine similarity digunakan untuk
            membandingkan kesamaan antara preferensi pengguna atau kesamaan
            antara item. Nilai yang mendekati 1 menunjukkan korelasi yang kuat
            antara kedua variabel, sementara nilai yang mendekati 0 menunjukkan
            tidak adanya korelasi, yang berarti kedua variabel bersifat
            independen.
          </p>
          <RatingExplanationTable2 />
        </>
      ),
    },
    {
      title: "Adjusted Vector Cosine",
      description: (
        <>
          <p className="mb-4">
            <a
              href="https://medium.com/@sujathamudadla1213/what-is-the-difference-between-cosine-similarity-and-adjusted-cosine-similarity-eb2b71f2236c"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adjusted Vector Cosine (ACos)
            </a>{" "}
            adalah variasi dari fungsi similaritas Cosine (Cos) yang
            mempertimbangkan mean rating yang diberikan oleh masing-masing user.
            ACos membantu mengatasi masalah bias yang mungkin muncul dari
            perbedaan skala rating antara user. Masalah bias ini terjadi karena
            user sering memberikan rating dengan cara yang berbeda. Misalnya,
            seorang user dapat memiliki cenderung memberikan rating yang lebih
            tinggi secara keseluruhan dibandingkan dengan user lain. Nilai
            similaritas ACos berkisar antara -1 hingga 1.
          </p>

          <RatingExplanationTable />
        </>
      ),
    },
    {
      title: "Bhattacharyya Coefficient Similarity (BC)",
      description: (
        <>
          <p className="mb-4">
            <a
              href="https://medium.com/@yoavyeledteva/bhattacharyya-distance-from-statistics-to-application-in-data-science-8eb5ccdbba62"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            >
              Bhattacharyya Coefficient Similarity
            </a>{" "}
            adalah fungsi similaritas yang telah digunakan secara luas dalam
            pemrosesan sinyal, pemrosesan gambar, pengenalan pola, dan Sistem
            Rekomendasi. Dalam sudut pandang pemodelan Collaborative Filtering
            (CF), perhitungan BC dilakukan dengan mengukur similaritas antara
            dua distribusi probabilitas histogram rating. Dengan kata lain,
            kinerja dari BC tergantung pada pola distribusi rating. Nilai
            Similaritas BC berkisar antara 0 hingga 1, dan bersifat simetris
          </p>
          <RatingExplanationTable3 />
        </>
      ),
    },
  ];

  return (
    <LayoutHome>
      <div>
        <button
          onClick={() => setIsModalOpenHome(true)}
          className="bg-card_blue_primary  font-poppins font-semibold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 "
        >
          Modal Home Tutorial
          <PlayCircleFilledWhiteIcon className="ml-2" />
        </button>
        {isModalOpenHome && (
          <ModalHomeFirst isOpen={isModalOpenHome} onClose={closeModal} />
        )}
        {/* Rest of your component */}
      </div>
      <HeaderHome>
        <>
          <div>
            Media Pembelajaran Interaktif Sistem Rekomendasi dan Perhitungan
            Fungsi Similaritas
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Icon 1 */}
            <div className="absolute top-0 left-0 transform -translate-x-1/4 sm:-left-5  md:-left-10 lg:-left-12 xl:-left-14">
              <img
                src={Img1}
                alt="Icon 1"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-100"
              />
            </div>

            {/* Icon 2 */}
            <div className=" absolute top-10 right-0 transform translate-x-1/4 sm:translate-x-10 md:translate-x-20 lg:translate-x-20 xl:translate-x-24">
              <img
                src={Img7}
                alt="Icon 2"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-100"
              />
            </div>
          </div>
        </>
      </HeaderHome>

      {/*<section id="" className='max-w-4xl mx-auto text-center py-10 px-4'>*/}
      {/*    <h1 className=' font-bold font-poppins mb-10 md:mb-20 text-3xl sm:text-4xl md:text-5xl'>Apa itu User-Based dan Item-Based </h1>*/}
      {/*</section>*/}
      <OverViewRekomendasi />

      <BodyHome
        // idName={"belajar"}
        header={
          "Pilih Tutorial atau Latihan Untuk Perhitungan Fungsi Similaritas"
        }
        subheader={
          "Untuk memulai pembelajaran sistem rekomendasi, pengguna dapat memilih antara dua opsi menarik: Tutorial Fungsi Similaritas, yang menjelaskan konsep dasar dan memberi contoh penerapan dalam perhitungan dan prediksi, atau Latihan Fungsi Similaritas, yang memungkinkan pengguna berlatih dengan memasukkan nilai rating secara bebas."
        }
        hirarki={"1"}
        type="grid"
      >
        <CardHome
          Image={tutorialPage}
          bgColor={"bg-card_blue_primary"}
          Heading={"Tutorial Fungsi Similaritas"}
          buttonName={"Tutorial Sekarang"}
          anchor={"/tutorial"}
        >
          {" "}
          Untuk belajar dan memahami cara perhitungan{" "}
          <span className="bold">fungsi similaritas</span> bagi yang ingin
          mempelajari sistem rekomendasi.
        </CardHome>

        <CardHome
          Image={tutorialPage}
          bgColor={"bg-card_green_primary"}
          Heading={"Latihan Fungsi Similaritas"}
          buttonName={"Latihan Sekarang"}
          anchor={"/latihan"}
        >
          {" "}
          Untuk eksplorasi dan eksperimen dalam perhitungan{" "}
          <span className="bold">fungsi similaritas</span> guna pemahaman yang
          lebih mendalam.{" "}
        </CardHome>
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
        header={
          "Fungsi Similaritas Yang Diterapkan Pada Website Media Pembelajaran"
        }
        hirarki="1"
        type="space"
        subheader={
          "Ini adalah platform pembelajaran berbasis website yang mengajarkan cara menghitung Fungsi Similaritas, baik untuk sistem rekomendasi berbasis pengguna (user-based) maupun berbasis item (item-based). Melalui aplikasi ini, pengguna dapat memahami secara mendalam bagaimana algoritma rekomendasi bekerja."
        }
      >
        {listOfSimilarity.map((item, index) => (
          <AccordionMeasure
            key={index}
            headingMeasure={item.title}
            descriptionMeasure={item.description}
          />
        ))}
      </BodyHome>

      {/* Team Section */}

      <BodyHome
        header={"Tim Pengembang Website"}
        subheader={
          "Tim pengembang media pembelajaran sistem rekomendasi dengan metode Fungsi Similaritas terdiri dari mahasiswa yang memiliki minat di bidang sistem rekomendasi. Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari pengembangan perangkat lunak, hingga desain antarmuka pengguna."
        }
        type="gridAnggota"
      >
        <CardAnggotaHome
          Image={buifa}
          Color={"bg-card_blue_primary"}
          Nama={"Noor Ifadah"}
          Email={"noor.ifada@trunojoyo.ac.id"}
        />

        <CardAnggotaHome
          Image={alfi}
          Color={"bg-card_green_primary"}
          Nama={"Alfi Nur danialin"}
          Email={"alfinurdanialin900@gmail.com"}
        />

        <CardAnggotaHome
          Image={dimas}
          Color={"bg-card_pink_primary"}
          Nama={"Dimas Dliyaur Rahman"}
          Email={"dimasdliyaurrahman@gmail.com"}
        />
      </BodyHome>

      {/* Reference Section */}
      {/*<BodyHome*/}
      {/*    header={"Reference"}*/}
      {/*    subheader={""}*/}
      {/*    type='casual'*/}
      {/*>*/}
      {/*    <li>*/}
      {/*        Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching*/}
      {/*        Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In*/}
      {/*        International Conference on Electrical Engineering and Informatics (ICEEI) (pp.*/}
      {/*        1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*        Ifada, ., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching*/}
      {/*        Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In*/}
      {/*        International Conference on Electrical Engineering and Informatics (ICEEI) (pp.*/}
      {/*        1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716*/}
      {/*    </li>*/}
      {/*</BodyHome>*/}

      <BackToTopButtonHome />
    </LayoutHome>
  );
};

export default Home;
