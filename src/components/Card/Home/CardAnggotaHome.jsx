import EmailIcon from "@mui/icons-material/Email"; // Import ikon Email dari MUI

const CardAnggotaHome = ({ Color, Nama, Image, Email }) => {
  return (
    <div
      className={
        Color +
        " border-4 border-black shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center space-x-4"
      }
    >
      <div className="flex-1 text-center text-white font-poppins">
        <div className="flex-shrink-0 items-center flex justify-center">
          <img
            src={Image}
            alt="Descriptive Alt Text"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
        <h3 className="text-xl text-white text-center font-bold font-poppins my-3">
          {Nama}
        </h3>

        {/* Icon email with mailto functionality */}
        <a
          href={`mailto:${Email}`} // 'mailto' untuk membuka aplikasi email dengan alamat email tujuan
          className="flex justify-center items-center space-x-2 text-white hover:text-gray-300"
        >
          <EmailIcon /> {/* Menampilkan ikon email */}
          <span>Email</span> {/* Label untuk ikon */}
        </a>
      </div>
    </div>
  );
};

export default CardAnggotaHome;
