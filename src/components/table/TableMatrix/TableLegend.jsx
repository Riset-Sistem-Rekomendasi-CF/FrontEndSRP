import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function TableLegend() {
  return (
    <div className="mt-6 ml-5 text-left w-full font-poppins">
      <p className="font-bold text-xl mb-3">Keterangan:</p>
      <ul className="flex flex-col sm:flex-row flex-wrap gap-4">
        <li className="flex items-center">
          <div className="w-10 h-5 bg-red-100 rounded-md shadow-sm mr-2 flex items-center justify-center text-red-600 text-sm">
            ?
          </div>
          <p>Data Sparsity</p>
        </li>
        <li className="flex items-center">
          <div className="w-10 h-5 bg-gray-100 rounded-md shadow-sm mr-2"></div>
          Index User
        </li>
        <li className="flex items-center">
          <div className="w-10 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-sm mr-2"></div>
          Index Item
        </li>
        <li className="flex items-center">
          <div className="w-10 h-5 flex items-center justify-center bg-white rounded-md shadow-sm mr-2 text-sm text-gray-700">
            1-5
          </div>
          Nilai Rating : 1-5
        </li>
        <li className="flex items-center">
          <div className="w-5 h-5 bg-red-500 rounded-full shadow-sm mr-2 flex items-center justify-center">
            <CloseIcon style={{ fontSize: 12, color: "white" }} />
          </div>
          <p>Hapus User/Item</p>
        </li>
        <li className="flex items-center">
          <div className="w-5 h-5 bg-green-500 rounded-full shadow-sm mr-2 flex items-center justify-center">
            <AddIcon style={{ fontSize: 12, color: "white" }} />
          </div>
          <p>Tambah User/Item</p>
        </li>
      </ul>
    </div>
  );
}
