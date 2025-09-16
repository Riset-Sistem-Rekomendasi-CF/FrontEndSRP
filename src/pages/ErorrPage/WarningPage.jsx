import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { OnlyDivider } from "../../components/tabelData/DividerHeading";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

export const WarningPage = ({
  title = "Attention needed",
  children,
  onClickId,
  buttonText,
}) => {
  const scrollToSectionDetail = (...ids) => {
    const target = ids.find((id) => document.getElementById(id));
    if (target) {
      document.getElementById(target).scrollIntoView({ behavior: "smooth" });
    }
  };

  // Default IDs untuk scroll (prioritas)
  const defaultScrollIds = ["metode_ratingTutorial", "metode_ratingLatihan"];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-[#fffcee] border-l-4 border-yellow-400 rounded-md shadow-sm w-full max-w-full">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-10 h-10 text-white bg-yellow-400 rounded-md shadow-sm flex-shrink-0">
        <WarningAmberRoundedIcon fontSize="medium" />
      </div>

      {/* Text Container */}
      <div className="mt-3 sm:mt-0 sm:ml-4 text-start flex-1 font-poppins">
        <h3 className="text-2xl sm:text-base font-semibold text-yellow-800">
          {title}
        </h3>
        <OnlyDivider />
        <div className="mt-1 text-base text-yellow-700 break-words">
          {children}
        </div>
        <button
          onClick={() =>
            scrollToSectionDetail(
              ...(onClickId
                ? Array.isArray(onClickId)
                  ? onClickId
                  : [onClickId]
                : defaultScrollIds)
            )
          }
          className="text-sm text-black rounded-md bg-red-200 px-3 py-2 flex items-center w-fit hover:bg-red-400"
        >
          <KeyboardCapslockIcon className="mr-2" />
          {buttonText
            ? buttonText
            : "Pilih Metode Prediksi dan Fungsi Similaritas"}
        </button>
      </div>
    </div>
  );
};
