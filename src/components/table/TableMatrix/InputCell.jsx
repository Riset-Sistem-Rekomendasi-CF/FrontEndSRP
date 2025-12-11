import { checkEmptyRowOrColumn } from "../../../helper/helper";

export default function InputCell({
  children,
  rowIndex,
  colIndex,
  change,
  disabled,
  onDeleteAttempt,
  data,
}) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Jika kosong, set ke 0 (sparsity)
    if (inputValue === "") {
      e.target.value = 0;
      change(e);
      return;
    }

    // Validasi ketat: hanya terima angka 0-5 (single digit)
    // Tolak: huruf, simbol, angka puluhan, desimal
    const isValidRating = /^[0-5]$/.test(inputValue);

    if (!isValidRating) {
      // Jangan update jika tidak valid
      return;
    }

    const numValue = parseInt(inputValue, 10);

    // Double check: pastikan angka 0-5
    if (numValue < 0 || numValue > 5) {
      return;
    }

    // Cek apakah akan menyebabkan row/column kosong
    let dataOnly = [...data.map((row) => [...row])];
    dataOnly[colIndex][rowIndex] = numValue;

    if (numValue === 0 && checkEmptyRowOrColumn(dataOnly)) {
      onDeleteAttempt(
        "Tidak boleh ada kolom atau baris yang sepenuhnya kosong!"
      );
      return;
    }

    // Update value
    e.target.value = numValue;
    change(e);
  };

  // Prevent paste dengan karakter tidak valid
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    if (!/^[0-5]$/.test(pastedText)) {
      e.preventDefault();
    }
  };

  // Prevent input karakter tidak valid via keyboard
  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 46, 9, 27, 13].includes(e.keyCode)) {
      return;
    }
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) {
      return;
    }
    // Allow: home, end, left, right
    if (e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }
    // Block jika bukan angka 0-5
    const key = e.key;
    if (!/^[0-5]$/.test(key)) {
      e.preventDefault();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-5]"
      maxLength={1}
      placeholder={children}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={handleFocus}
      value={children === "?" ? "" : children}
      className={`w-10 min-w-[40px] px-1 py-2 text-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 ${
        children === "?"
          ? "bg-red-100 text-red-600"
          : "bg-transparent text-gray-800"
      }`}
      disabled={disabled}
    />
  );
}
