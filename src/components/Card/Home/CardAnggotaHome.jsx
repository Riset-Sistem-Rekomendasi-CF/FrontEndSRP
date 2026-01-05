import EmailIcon from "@mui/icons-material/Email";

const CardAnggotaHome = ({ name, imageUrl, email }) => {
  return (
    <div className="max-w-sm mx-auto bg-white border-2 border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out">
      <a href="#">
        <img
          className="rounded-t-lg w-full object-cover h-36 sm:h-40 md:h-48"
          src={imageUrl}
          alt={name}
        />
      </a>
      <div className="p-3 sm:p-4 md:p-5">
        <a href="#">
          <h5 className="mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex justify-center items-center space-x-1 sm:space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 mt-2 sm:mt-3 text-sm sm:text-base"
        >
          <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
};

export default CardAnggotaHome;
