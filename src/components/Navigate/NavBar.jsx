import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import imgWork from "../../assets/images/imgWorkshop.png";
import GifTut from "../../assets/vidioAsset/tutorialGif.gif";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import VowelsPana from "../../assets/images/VowelsPna.png";
import StepperModal, { StepRow } from "../../components/modal/StepeerModal";
import KoalaPage from "../../assets/icons/KoalaPage.png";
import { useLocation } from "react-router-dom";
import { use } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Untuk membuka/menutup hamburger menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk membuka/menutup dropdown Similaritas

  // aktif location
  const isActive = (path) =>
    location.pathname === path ? "bg-blue-home text-white" : "text-black";
  // modal stepper

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    // const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // jika belum pernah dikunjungi, tampilkan modal
      setIsModalOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  // navbar Visiable dan hidden
  const [isVisible, setIsVisible] = useState(true); // State untuk menentukan apakah navbar terlihat
  const [lastScrollY, setLastScrollY] = useState(0); // Untuk menyimpan posisi scroll sebelumnya

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Saat scroll ke bawah, sembunyikan navbar
      } else {
        setIsVisible(true); // Saat scroll ke atas, tampilkan navbar
      }
      setLastScrollY(window.scrollY); // Update posisi scroll sebelumnya
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Dependency pada lastScrollY agar bisa mendeteksi scroll direction

  const stepsDataLatihan = [
    {
      title: "Step 1: Perkenalan Pada Fitur Eksplorasi",
      content: (
        <>
          <p>
            Pada langkah pertama ini, Anda akan diperkenalkan dengan fitur utama
            dari sistem rekomendasi. Dimana pada fitur latihan akan menjelaskan
            langkah-langkah perhitungan metode user-based dan item-based pada
            fungsi similaritas yang digunakan dimana data rating harus membuat
            terlebih dahulu. Sehingga pengguna bisa bebas untuk membuat tabel
            data rating yang diiginkan setelah selesai membuat data rating
            pengguna baru bisa memulai belajar langkah-langkah perhitungannya.
          </p>
          <div className="flex justify-center">
            <img
              src={imgWork} // Ganti dengan gambar yang relevan
              alt="imgwork"
              className="w-[20rem] h-[20rem]  rounded-lg"
            />
          </div>
        </>
      ),
    },
    {
      title: "Step 2: Langkah-Langkah Sistem Rekomendasi",
      content: (
        <>
          <div>
            <p>
              Pada tahap ini, Anda akan mempelajari langkah-langkah yang perlu
              diikuti untuk menghitung fungsi similaritas berdasarkan data
              rating yang akan digunakan. Berikut adalah langkah-langkah yang
              perlu diikuti:
            </p>
            <StepRow />

            <div className="relative inline-block m-4 shadow-lg rounded-lg overflow-hidden">
              <div className="w-full sm:w-[600px] h-[300px] sm:h-[300px] bg-white p-3 flex items-center justify-center relative">
                <img
                  src={GifTut}
                  alt="Video Tutorial Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-red-500 font-semibold">
              <NotificationImportantIcon /> Catatan Setiap Cell pada tabel hasil
              perhitungan bisa ditekan dan akan memberikan detail perhitungan
              atau penjelasan lebih lanjut.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Step 3: Metode Prediksi Collaborative Filtering",
      content: (
        <>
          <div>
            <p>
              Pada Prediksi Collaborative Filtering, terdapat dua metode yang
              bisa digunakan, yaitu: User-Based dan Item-Based.
            </p>

            {/* Tabel dua kolom berisi nama metode dan keterangan */}
            <table className="min-w-full table-auto border-collapse border">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Metode
                  </th>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">User-Based</td>
                  <td className="border px-4 py-2">
                    Metode ini memanfaatkan preferensi pengguna lain yang
                    memiliki kesamaan dalam memberi rating terhadap item.
                    Rekomendasi untuk user target dibuat dengan mencari pengguna
                    lain yang serupa dan memberikan item yang mereka sukai.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">Item-Based</td>
                  <td className="border px-4 py-2">
                    Dalam metode ini, rekomendasi berdasarkan kesamaan antara
                    item yang telah diberi rating oleh pengguna target. Jika
                    pengguna telah menyukai suatu item, maka item lain yang
                    serupa akan direkomendasikan berdasarkan kesamaan atribut
                    atau preferensi sebelumnya.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: "Step 4: Fungsi Similaritas",
      content: (
        <>
          <div>
            <p>
              Pada Fungsi Similaritas ini, Anda akan mempelajari cara menghitung
              similaritas berdasarkan data rating yang digunakan. Terdapat 4
              Fungsi Similaritas yang bisa digunakan, yaitu:{" "}
              <i>Pearson Correlation Coefficient </i>(PCC), Cosine,{" "}
              <i>Adjusted Vector Cosine </i> (ACos), dan{" "}
              <i>Bhattacharyaa Coefficient Similarity </i> (BC).
            </p>
            {/* Tabel dua kolom berisi nama metode dan keterangan */}
            <table className="min-w-full table-auto border-collapse border ">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Metode
                  </th>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Pearson Correlation Coefficient </i>(PCC)
                  </td>
                  <td className="border px-4 py-2">
                    Dalam sudut pandang <i>Collaborative Filtering </i> , PCC
                    menghitung hubungan linier antara dua <i>user </i> atau{" "}
                    <i>item </i> berdasarkan data rating yang telah diberikan
                    oleh <i>user</i> terhadap <i>item </i>.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">Cosine</td>
                  <td className="border px-4 py-2">
                    Dalam konteks sistem rekomendasi, cosine similarity
                    digunakan untuk membandingkan kesamaan antara preferensi
                    pengguna atau kesamaan antara item. Nilai yang mendekati 1
                    menunjukkan korelasi yang kuat antara kedua variabel,
                    sementara nilai yang mendekati 0 menunjukkan tidak adanya
                    korelasi, yang berarti kedua variabel bersifat independen.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Adjusted Vector Cosine </i> (ACos)
                  </td>
                  <td className="border px-4 py-2">
                    Adjusted Vector Cosine (ACos) adalah variasi dari fungsi
                    similaritas Cosine (Cos) yang mempertimbangkan mean rating
                    yang diberikan oleh masing-masing user. ACos membantu
                    mengatasi masalah bias yang mungkin muncul dari perbedaan
                    skala rating antara user.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Bhattacharyaa Coefficient </i> (BC)
                  </td>
                  <td className="border px-4 py-2">
                    Dalam sudut pandang pemodelan Collaborative Filtering (CF),
                    perhitungan BC dilakukan dengan mengukur similaritas antara
                    dua distribusi probabilitas histogram rating. Dengan kata
                    lain, kinerja dari BC tergantung pada pola distribusi
                    rating.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: "Step 5: Apa Anda Sudah Siap Untuk Belajar ?",
      content: (
        <>
          <div>
            <p>
              Selesai! Beri tanda centang untuk mengkonfirmasi bahwa Anda telah
              mengerti langkah-langkah yang telah dijelaskan.
            </p>
            <div className="flex justify-center">
              <img
                src={VowelsPana} // Ganti dengan gambar yang relevan
                alt="Pahami Langkah"
                className="w-[20rem] h-[20rem]  rounded-lg"
              />
            </div>
            <p>
              Sekarang adalah waktunya untuk belajar dan mengasah keterampilanmu
              dan tantang pemahamanmu pada Website Media Pembelajaran terkait
              Sistem Rekomendasi ini.
            </p>
          </div>
        </>
      ),
    },
  ];

  // end modal stepper

  return (
    <nav
      className={`bg-white shadow-sm sticky top-0 z-50 transition-transform ${
        isVisible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <div className="flex mx-auto justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full h-16">
          {/* Tombol Hamburger Menu (untuk mobile) */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black  hover:bg-blue-home hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <CloseIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Navbar Brand */}
          <a
            href="/"
            className="flex items-center space-x-4 text-black text-2xl font-semibold"
          >
            {/* Gambar di kiri */}
            <img
              src={KoalaPage} // Ganti dengan URL gambar yang Anda inginkan
              alt="Icon"
              className="w-10 h-10 object-cover rounded-full"
            />
            {/* Teks di kanan */}
            <span>Sistem Rekomendasi</span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden sm:flex sm:ml-6 space-x-4">
            <a
              href="/"
              className={`px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-home hover:text-white ${isActive(
                "/"
              )}`}
            >
              Home
            </a>
            <a
              href="/tutorial"
              className={`px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-home hover:text-white ${isActive(
                "/tutorial"
              )}`}
            >
              Tutorial
            </a>
            <a
              href="/eksplorasi"
              className={`px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-home hover:text-white ${isActive(
                "/eksplorasi"
              )}`}
            >
              Eksplorasi
            </a>

            {/* Dropdown Similaritas */}
            <div
              className="relative"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown saat diklik
            >
              <button className="text-black px-3 py-2 rounded-md text-lg font-medium flex items-center hover:bg-blue-home hover:text-white">
                Similaritas
                {dropdownOpen ? (
                  <KeyboardArrowUpIcon className="ml-2 h-5 w-5" />
                ) : (
                  <KeyboardArrowDownIcon className="ml-2 h-5 w-5" />
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-48 mt-2 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <a
                      href="/pccDetail"
                      className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                        "/pccDetail"
                      )}`}
                    >
                      PCC
                    </a>
                    <a
                      href="/cosineDetail"
                      className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                        "/cosineDetail"
                      )}`}
                    >
                      Cosine
                    </a>
                    <a
                      href="/acosDetail"
                      className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                        "/acosDetail"
                      )}`}
                    >
                      ACos
                    </a>
                    <a
                      href="/bcDetail"
                      className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                        "/bcDetail"
                      )}`}
                    >
                      BC
                    </a>
                  </div>
                </div>
              )}
            </div>
            {/* Button Modal Tutorial */}
            <div className=" sm:block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex mx-auto items-center bg-card_yellow_primary  w-full  font-poppins font-semibold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
              >
                Panduan
                <PlayCircleFilledWhiteIcon className="ml-2" />
              </button>
              <StepperModal
                isOpen={isModalOpen}
                onClose={closeModal}
                stepsContent={stepsDataLatihan}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className={`text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white ${isActive(
              "/"
            )}`}
          >
            Home
          </a>
          <a
            href="/tutorial"
            className={`text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white ${isActive(
              "/tutorial"
            )}`}
          >
            Tutorial
          </a>
          <a
            href="/eksplorasi"
            className={`text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white ${isActive(
              "/eksplorasi"
            )}`}
          >
            Eksplorasi
          </a>
          <div
            className="relative"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown saat diklik
          >
            <button className="text-black px-3 py-2 rounded-md text-base font-medium flex items-center hover:bg-blue-home hover:text-white">
              Similaritas
              {dropdownOpen ? (
                <KeyboardArrowUpIcon className="ml-2 h-5 w-5" />
              ) : (
                <KeyboardArrowDownIcon className="ml-2 h-5 w-5" />
              )}
            </button>
            {dropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-48 mt-2 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <a
                    href="/pccDetail"
                    className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                      "/pccDetail"
                    )}`}
                  >
                    PCC
                  </a>
                  <a
                    href="/cosineDetail"
                    className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                      "/cosineDetail"
                    )}`}
                  >
                    Cosine
                  </a>
                  <a
                    href="/acosDetail"
                    className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                      "/acosDetail"
                    )}`}
                  >
                    ACos
                  </a>
                  <a
                    href="/bcDetail"
                    className={`text-gray-700 block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                      "/bcDetail"
                    )}`}
                  >
                    BC
                  </a>
                </div>
              </div>
            )}
            <div className=" sm:block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex mx-auto items-center bg-card_yellow_primary  w-full  font-poppins font-semibold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
              >
                Panduan
                <PlayCircleFilledWhiteIcon className="ml-2" />
              </button>
              <StepperModal
                isOpen={isModalOpen}
                onClose={closeModal}
                stepsContent={stepsDataLatihan}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
