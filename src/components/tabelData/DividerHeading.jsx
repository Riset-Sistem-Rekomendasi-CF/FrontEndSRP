import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const DividerHeading = ({ text }) => (
  <div className="flex items-center w-full my-4">
    <div
      className="flex-grow border-t border-red-500"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>
    <div className="mx-4 text-red-600 text-sm font-semibold bg-white px-2 rounded shadow-sm font-poppins">
      {text}
    </div>
    <div
      className="flex-grow border-t border-red-500"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>
  </div>
);

export const DividerHeadingBlue = ({ text, onClick, show }) => (
  <div className="flex items-center w-full my-4">
    <div
      className="flex-grow border-t border-purple-btn-primary"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>
    <div
      className="mx-4 px-4 py-2 text-purple-btn-primary font-semibold font-poppins bg-white rounded-full border border-gray-400 cursor-pointer hover:bg-green-50"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-wrap font-poppins">
        <span className="text-sm sm:text-base md:text-lg lg:text-xl break-words leading-snug">
          {show ? `Tutup Hasil ${text}` : `Tampilkan Hasil ${text}`}
        </span>
        {show ? (
          <ExpandLessIcon className="inline-block align-middle ml-1 text-base sm:text-lg md:text-xl" />
        ) : (
          <ExpandMoreIcon className="inline-block align-middle ml-1 text-base sm:text-lg md:text-xl" />
        )}
      </div>
    </div>

    <div
      className="flex-grow border-t border-purple-btn-primary"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>
  </div>
);

export const OnlyDivider = ({ colorBorder }) => (
  <div className="flex items-center w-full my-4">
    <div
      className={`flex-grow border-t ${
        colorBorder ? colorBorder : "border-gray-400"
      }`}
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>
  </div>
);
