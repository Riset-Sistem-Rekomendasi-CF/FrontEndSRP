import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { getFormulaPrediction } from "../Formula/FormulaPrediction";

export const PredictionSteps = ({ similarity, opsional }) => {
  const formula = getFormulaPrediction(similarity, opsional);
  return (
    <div className="text-start sm:ml-5 md:ml-10 font-poppins text-black">
      <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
        1. Menentukan {opsional} {""}
        target
      </h2>

      <h2 className="font-semibold text-sm sm:text-base md:text-lg">
        2.{" "}
        {opsional === "user-based" ? (
          <>Mencari daftar sistem yang belum diberi Rating user pada target</>
        ) : (
          <>
            Mencari daftaruser yang belum memberi Rating <i> user </i>
            target
          </>
        )}
      </h2>

      <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
        3. Menentukan tetangga terdekat {opsional} target
      </h2>

      <p className="text-gray-700 font-medium ml-5 text-justify text-xs sm:text-sm md:text-base">
        Tetangga terdekat X<sub>u</sub>(j) merupakan himpunan sejumlah k user
        yang merupakan tetangga terdekat (atau similar dengan) user target u,
        yang telah memberikan Rating pada item j
      </p>

      <p className="ml-5 font-semibold text-xs sm:text-sm md:text-base">
        Catatan : | X<sub>u</sub>(j) | ≤ k
      </p>

      <MathJaxContext options={mathjaxConfig}>
        <div className="flex flex-col sm:flex-row my-5 pl-5">
          {/* MathJax Container */}
          <div className="border-2 border-black rounded-lg w-full sm:w-fit overflow-x-auto overflow-y-hidden sm:overflow-visible px-2 py-2 sm:px-4 sm:py-3 mx-auto sm:mx-0">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] text-center sm:text-left">
              <MathJaxComponent>{formula.arg_max}</MathJaxComponent>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-sm sm:text-sm md:text-base lg:text-lg  mt-4 sm:mt-0 sm:ml-4 items-center text-red-500 font-semibold text-justify">
            Di mana himpunan didapatkan berdasarkan urutan nilai similaritas
            (dari yang terbesar ke yang terkecil)
          </p>
        </div>
      </MathJaxContext>
      <FunctionMeasureDropdown DetailRumus={formula.detail_ArgMax} />
      <h2 className="font-semibold text-sm sm:text-base md:text-lg">
        4. Menentukan prediksi Rating
      </h2>
      <h2 className="font-semibold text-sm sm:text-base md:text-lg ">
        5. Menentukan Top-K {opsional} target
      </h2>
      <p className="text-gray-700 font-medium ml-5 text-justify text-xs sm:text-sm md:text-base">
        Pengguna dapat menentukan Top-K. Top-K yaitu tetangga terdekat yang akan
        digunakan untuk melihat seberapa mirip user target dari user yang lain.
      </p>
    </div>
  );
};
