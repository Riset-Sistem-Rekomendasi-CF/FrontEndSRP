import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { WarningPage } from "../../pages/ErorrPage/WarningPage";
import { TabelRatingData } from "./TableRatingData";



export const NotationCard = ({ data, opsional, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="p-5 ">
      <div
        id={id}
        className="bg-white border-2 border-black shadow-md rounded-lg my-10 p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:border-white"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center text-black dark:text-white">
          Notasi dan Penjelasan
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          {/* Left Column */}
          <div className="w-full sm:w-1/2 space-y-2 font-poppins text-start">
            <p>
              <strong>
                <i>m</i>
              </strong>{" "}
              : Jumlah user
            </p>
            <p>
              <strong>
                <i>n</i>
              </strong>{" "}
              : Jumlah item
            </p>
            <p>
              <strong>
                <i>U</i>
              </strong>{" "}
              : Himpunan user
            </p>
            <p>
              <strong>
                <i>I</i>
              </strong>{" "}
              : Himpunan item
            </p>
            <p>
              <strong>
                <i>
                  I<sub>u</sub>
                </i>
              </strong>{" "}
              : Himpunan item yang telah diberi rating oleh user {""}
              <em>u</em>
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-1/2 space-y-2 font-poppins text-start">
            <p>
              <strong>
                <i>
                  U<sub>i</sub>
                </i>
              </strong>{" "}
              : Himpunan user yang telah memberi rating <br /> item {""}
              <em>i</em>
            </p>
            <p>
              <strong>
                <em>
                  R ∈ ℝ<sup> m×n</sup>
                </em>
              </strong>{" "}
              : Matriks yang berisi bilangan asli dengan panjang m dan lebar n
            </p>
            <p>
              <strong>
                r<sub>ui</sub>
              </strong>{" "}
              : rating user
              <em> u</em> terhadap item {""}
              <em>i</em>
            </p>
          </div>
        </div>

        {/* Dropdown Button */}
        <button
          className="mt-6 w-full bg-blue-home text-white px-4 py-3 rounded-lg flex justify-center items-center font-poppins font-semibold"
          onClick={toggleDropdown}
        >
          <FaChevronDown className="mr-2" />
          {isOpen
            ? "Sembunyikan Detail Matrik Rating"
            : "Tampilkan Detail Matrik Rating"}
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="mt-4 bg-white rounded-lg p-4 text-white dark:text-black">
            {/* validasi jika data 0 */}
            {data && data.length > 0 ? (
              <TabelRatingData data={data} opsional={opsional} />
            ) : (
              <>
                <WarningPage
                  title="Data Rating Masih Kosong"
                  children={
                    <>
                      <p className="mb-2">
                        Oppps...., Untuk melanjutkan proses perhitungan, Data
                        kosong! Harap isi data rating terlebih dahulu untuk
                        melanjutkan.
                      </p>
                    </>
                  }
                  onClickId={"data_ratingLatihan"}
                  buttonText={"Isi Data Rating"}
                />
              </>
              // button untuk masuk ke form input data
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NotationCard;
