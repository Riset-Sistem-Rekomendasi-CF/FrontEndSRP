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
  <div className="flex items-center w-full my-4 flex-wrap gap-y-2">
    {/* Kiri */}
    <div
      className="flex-grow border-t border-purple-btn-primary"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderSpacing: "10px",
      }}
    ></div>

    {/* Tengah (Tombol Heading) */}
    <div
      className="mx-2 sm:mx-4 px-3 sm:px-4 py-1 sm:py-2 text-purple-btn-primary font-semibold font-poppins bg-white rounded-full border border-gray-400 cursor-pointer hover:bg-green-50 text-center"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap min-w-0">
        <span className="text-xs sm:text-sm md:text-base leading-snug break-words text-center">
          {show ? `Tutup ${text}` : `Tampilkan  ${text}`}
        </span>
        {show ? (
          <ExpandLessIcon className="text-sm sm:text-base md:text-lg" />
        ) : (
          <ExpandMoreIcon className="text-sm sm:text-base md:text-lg" />
        )}
      </div>
    </div>

    {/* Kanan */}
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
