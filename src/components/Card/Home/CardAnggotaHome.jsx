import EmailIcon from "@mui/icons-material/Email"; // Import ikon Email dari MUI

const CardAnggotaHome = ({ name, imageUrl, email }) => {
  return (
    <div className="max-w-sm bg-white border-2 border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out">
      <a href="#">
        <img
          className="rounded-t-lg w-full object-cover h-48"
          src={imageUrl}
          alt={name}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex justify-center items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 mt-3"
        >
          <EmailIcon className="w-5 h-5" />{" "}
          {/* Menampilkan ikon email dengan ukuran yang lebih baik */}
          <span>Email</span> {/* Label untuk ikon */}
        </a>
      </div>
    </div>
  );
};

export default CardAnggotaHome;
