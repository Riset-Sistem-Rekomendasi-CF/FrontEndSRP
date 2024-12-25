import { Input } from "@headlessui/react";
import React, { useState } from "react";
import TableMatrix from "../table/TableMatrix";
import * as helper from "../../helper/helper.js";
import PercentIcon from "@mui/icons-material/Percent";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function FormMeasure({ onDataChange, onDescriptionChange }) {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const [sparsity, setSparsity] = useState(0);
  const [isOneClick, setIsOneClick] = useState(false);
  const [inputMErrorMessage, setInputMErrorMessage] = useState("");
  const [inputNErrorMessage, setInputNErrorMessage] = useState("");
  const [inputSparsityErrorMessage, setInputSparsityErrorMessage] =
    useState("");
  const [range] = useState({
    min: 1,
    max: 5,
  });
  const [data, setData] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState(""); // To manage the form error message

  const handleOneClick = () => {
    setIsOneClick(true);
  };

  const handleResetData = () => {
    onDescriptionChange(false);
    setData([]);
    onDataChange([]);
    setIsOneClick(false);
  };

  const handleInputChange = (e, max, setChange, messageError) => {
    if (/^\d*\.?\d*$/.test(e.target.value) && Number(e.target.value) <= max) {
      setChange(e.target.value);
      messageError(""); // Clear the error message
      setIsOneClick(false);
    } else if (!/^\d*\.?\d*$/.test(e.target.value)) {
      messageError("Input harus memakai numerik");
    } else if (!(Number(e.target.value) <= max)) {
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

    // Validate if all fields are filled
    if (!n || !m || !sparsity) {
      setFormErrorMessage(
        "Semua field harus diisi. Harap isi Jumlah User, Jumlah Item, dan Sparsity."
      );
      return; // Prevent form submission
    }

    setFormErrorMessage(""); // Clear error message if all fields are valid

    // Proceed with data generation if validation passes
    const result = helper.makeSparsity(n, m, sparsity, range);

    if (!result) {
      setFormErrorMessage(
        "Data Hasil generate tidak valid , Silakan coba lagi atau isi ulang field"
      );
    } else if (result.length === 1 || result[0].length === 1) {
      setFormErrorMessage("User atau item tidak boleh berisi 1");
    } else if (result) {
      setData(result);
      onDataChange(result);
      onDescriptionChange(false);
      handleOneClick();
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-10">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
          {/* User Input */}
          <div className="flex flex-col mb-3 md:col-span-3">
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-2xl text-start font-poppins font-semibold text-gray-900">
                Jumlah <span className="italic">Item </span> (I):
              </label>
              <div className="outline outline-1 inline-flex items-center rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                <Input
                  id="userInput"
                  name="userInput"
                  placeholder="Masukkan Panjang Matrix"
                  type="text"
                  value={m === 0 ? "" : m}
                  className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                  onChange={(e) =>
                    handleInputChange(e, 17, getValueM, setInputMErrorMessage)
                  }
                />
              </div>
              {inputMErrorMessage && (
                <span
                  className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 shadow-sm"
                  role="alert"
                >
                  <span className="font-bold">Maaf ! </span>
                  {inputMErrorMessage}
                </span>
              )}
            </div>

            {/* Item Input */}
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-2xl text-start font-poppins font-semibold text-gray-900">
                Jumlah <span className="italic">User</span> (U):
              </label>
              <div className="outline outline-1 inline-flex items-center rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                <Input
                  id="itemInput"
                  name="itemInput"
                  placeholder="Masukkan Panjang Matrix"
                  value={n === 0 ? "" : n}
                  type="text"
                  className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                  onChange={(e) =>
                    handleInputChange(e, 15, getValueN, setInputNErrorMessage)
                  }
                />
              </div>
              {inputNErrorMessage && (
                <span
                  className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-bold">Maaf !</span>
                  {inputNErrorMessage}
                </span>
              )}
            </div>
          </div>

          {/* Sparsity Section */}
          <div className="flex flex-col mb-3 md:col-span-3">
            <div className="flex flex-col mx-auto text-center items-center my-4 mb-10">
              <div className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg mb-2">
                2
              </div>
              <h1 className="text-2xl font-bold font-poppins px-3 mb-2">
                Sparsity
              </h1>

              {/* sparsity penjelasan  */}
              {/* <p className="mb-5 sm:mb-0 font-poppins text-black font-medium">
                Sparsity adalah di mana data <i>rating </i> yang digunakan
                memiliki banyak nilai yang hilang atau tidak terisi, sehingga
                menghasilkan matriks <i>rating </i> kosong. Hal tersebut terjadi
                karena tidak semua <i>user </i> memberikan <i>rating </i> untuk
                setiap <i>item </i>, yang menyebabkan banyaknya{" "}
                <i>missing values</i>.
              </p> */}

              <div className="max-w-2xl flex flex-row items-center ">
                <div className="mt-5 sm:mt-4 outline outline-1 inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-poppins font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  <Input
                    id="sparsity"
                    name="sparsity"
                    placeholder="sparsity..."
                    className="w-24 border-none bg-transparent focus:outline-none text-gray-900"
                    type="text"
                    value={sparsity === 0 ? "" : sparsity}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        100,
                        getValueSparsity,
                        setInputSparsityErrorMessage
                      )
                    }
                  />
                  <div className="flex items-center">
                    <PercentIcon className="h-5 text-gray-500" />
                  </div>
                </div>
              </div>
              {inputSparsityErrorMessage && (
                <span className="text-red-400">
                  {inputSparsityErrorMessage}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 gap-4 flex justify-center mt-5">
            <button
              disabled={isOneClick}
              type="button"
              onClick={submitHandler}
              className={`${
                !isOneClick
                  ? "bg-purple-btn-primary"
                  : "bg-violet-400 pointer-events-none"
              } text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center`}
            >
              <TuneIcon className="mr-2" /> Buat Tabel Rating
            </button>
            <button
              disabled={!isOneClick}
              type="button"
              onClick={handleResetData}
              className={`${
                isOneClick
                  ? "bg-purple-btn-primary"
                  : "bg-violet-400 pointer-events-none"
              } text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center`}
            >
              <RefreshIcon className="mr-2" /> Reset Data Rating
            </button>
          </div>
        </form>
      </div>

      {/* Display Form Error Message */}
      {formErrorMessage && (
        <div className="text-center py-4 lg:px-4">
          <div
            className="p-2 bg-red-400 items-center text-white leading-none lg:rounded-full flex lg:inline-flex shadow-md"
            role="alert"
          >
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Erorr
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              {" "}
              {formErrorMessage}
            </span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <TableMatrix
          Data={data}
          onDataChange={onDataChange}
          onDescriptionChange={onDescriptionChange}
        />
      )}
    </>
  );
}
