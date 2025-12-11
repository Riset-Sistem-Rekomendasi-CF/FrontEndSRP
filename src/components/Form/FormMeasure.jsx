import { Input } from "@headlessui/react";
import { useState } from "react";
import TableMatrix from "../table/TableMatrix";
import * as helper from "../../helper/helper.js";
import PercentIcon from "@mui/icons-material/Percent";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";
import SwitchToggle from "../Toggle/SwitchToggle";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function FormMeasure({
  onDataChange,
  onDescriptionChange,
  changeFunny,
  headers,
  columns,
  funnyMode,
}) {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const [sparsity, setSparsity] = useState(0);
  const [isOneClick, setIsOneClick] = useState(false);
  const [inputMErrorMessage, setInputMErrorMessage] = useState("");
  const [inputNErrorMessage, setInputNErrorMessage] = useState("");
  const [inputSparsityErrorMessage, setInputSparsityErrorMessage] =
    useState("");
  const [range] = useState({ min: 1, max: 5 });
  const [data, setData] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleOneClick = () => setIsOneClick(true);

  const handleResetData = () => {
    onDescriptionChange(false);
    setData([]);
    onDataChange([]);
    setIsOneClick(false);
  };

  const handleInputChange = (e, max, setChange, messageError) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && Number(value) <= max) {
      setChange(value);
      messageError("");
      setIsOneClick(false);
    } else if (!/^\d*\.?\d*$/.test(value)) {
      messageError("Input harus memakai numerik");
    } else {
      messageError(`Input dilarang melebihi ${max}. Silahkan coba lagi.`);
    }
  };

  const getValueM = (value) => {
    setM(Number(value));
    onDescriptionChange(false);
    setData([]);
    onDataChange([]);
    setIsOneClick(false);
  };

  const getValueN = (value) => {
    setN(Number(value));
    onDescriptionChange(false);
    setData([]);
    onDataChange([]);
    setIsOneClick(false);
  };

  const getValueSparsity = (value) => {
    setSparsity(Number(value));
    setData([]);
    onDataChange([]);
    setIsOneClick(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!n || !m || !sparsity) {
      setFormErrorMessage(
        "Semua field harus diisi. Harap isi Jumlah User, Jumlah Item, dan Sparsity."
      );
      return;
    }

    setFormErrorMessage("");
    const result = helper.makeSparsity(n, m, sparsity, range);

    if (!result) {
      setFormErrorMessage(
        "Data hasil generate tidak valid. Silakan coba lagi atau isi ulang field."
      );
    } else if (result.length === 1 || result[0].length === 1) {
      setFormErrorMessage("User atau item tidak boleh berisi 1");
    } else {
      setData(result);
      onDataChange(result);
      onDescriptionChange(false);
      handleOneClick();
    }
  };

  const InputField = ({
    id,
    label,
    icon: Icon,
    value,
    placeholder,
    max,
    onChange,
    errorMessage,
  }) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      >
        <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        {label}
      </label>
      <div
        className={`
          flex items-center rounded-xl border-2 transition-all duration-200
          bg-white dark:bg-gray-800
          ${
            errorMessage
              ? "border-red-400 dark:border-red-500"
              : "border-gray-200 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400"
          }
        `}
      >
        <Input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          value={value === 0 ? "" : value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <span className="pr-4 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
          max {max}
        </span>
      </div>
      {errorMessage && (
        <p className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
          <WarningAmberIcon className="w-4 h-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800  dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 overflow-hidden rounded-lg">
 

          <form onSubmit={submitHandler} className="p-6 space-y-6">
            {/* Matrix Dimensions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    1
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Dimensi Matrik
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="itemInput"
                  label="Jumlah Item (I)"
                  icon={InventoryIcon}
                  value={m}
                  placeholder="Masukkan jumlah item"
                  max={17}
                  onChange={(e) =>
                    handleInputChange(e, 17, getValueM, setInputMErrorMessage)
                  }
                  errorMessage={inputMErrorMessage}
                />

                <InputField
                  id="userInput"
                  label="Jumlah User (U)"
                  icon={PersonIcon}
                  value={n}
                  placeholder="Masukkan jumlah user"
                  max={15}
                  onChange={(e) =>
                    handleInputChange(e, 15, getValueN, setInputNErrorMessage)
                  }
                  errorMessage={inputNErrorMessage}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Sparsity Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    2
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Sparsity Level
                </h3>
              </div>

              <div className="max-w-xs">
                <label
                  htmlFor="sparsity"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  <PercentIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  Persentase Sparsity
                </label>
                <div
                  className={`
                    flex items-center rounded-xl border-2 transition-all duration-200
                    bg-white dark:bg-gray-800
                    ${
                      inputSparsityErrorMessage
                        ? "border-red-400 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400"
                    }
                  `}
                >
                  <Input
                    id="sparsity"
                    name="sparsity"
                    type="text"
                    placeholder="0 - 100"
                    value={sparsity === 0 ? "" : sparsity}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        100,
                        getValueSparsity,
                        setInputSparsityErrorMessage
                      )
                    }
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="pr-4 flex items-center text-gray-400 dark:text-gray-500">
                    <PercentIcon className="w-5 h-5" />
                  </div>
                </div>
                {inputSparsityErrorMessage && (
                  <p className="flex items-center gap-1 mt-2 text-sm text-red-500 dark:text-red-400">
                    <WarningAmberIcon className="w-4 h-4" />
                    {inputSparsityErrorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isOneClick}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-200 shadow-md
                  ${
                    !isOneClick
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                <TuneIcon className="w-5 h-5" />
                Buat Tabel Rating
              </button>

              <button
                type="button"
                disabled={!isOneClick}
                onClick={handleResetData}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-200 shadow-md
                  ${
                    isOneClick
                      ? "bg-red-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                <RefreshIcon className="w-5 h-5" />
                Reset Data
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Form Error Message */}
      {formErrorMessage && (
        <div className="max-w-2xl mx-auto mt-4">
          <div
            className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            role="alert"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
              <WarningAmberIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-800 dark:text-red-200">
                Error
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">
                {formErrorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      {data.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="max-w-2xl mx-auto">
            <SwitchToggle title="Funny Mode" changeToggle={changeFunny} />
          </div>
          <TableMatrix
            Data={data}
            onDataChange={onDataChange}
            onDescriptionChange={onDescriptionChange}
            headers={headers}
            columns={columns}
            funnyMode={funnyMode}
          />
        </div>
      )}
    </div>
  );
}
