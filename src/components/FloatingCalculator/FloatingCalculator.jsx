import React, { useState, useRef } from "react";
import { FaCalculator, FaTimes } from "react-icons/fa";

const FloatingCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const inputRef = useRef(null);

  const insertAtCursor = (value) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newExpression =
        expression.substring(0, start) + value + expression.substring(end);
      setExpression(newExpression);
      // Set cursor position after inserted value
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = start + value.length;
        input.focus();
      }, 0);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const handleExpressionChange = (e) => {
    // Filter hanya karakter yang valid untuk kalkulator
    const validChars = e.target.value.replace(/[^0-9+\-×÷().]/g, "");
    setExpression(validChars);
  };

  const clear = () => {
    setExpression("");
    setResult("0");
  };

  const backspace = () => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start !== end) {
        // Ada selection, hapus selection
        const newExpression =
          expression.substring(0, start) + expression.substring(end);
        setExpression(newExpression);
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = start;
          input.focus();
        }, 0);
      } else if (start > 0) {
        // Hapus karakter sebelum cursor
        const newExpression =
          expression.substring(0, start - 1) + expression.substring(start);
        setExpression(newExpression);
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = start - 1;
          input.focus();
        }, 0);
      }
    } else {
      setExpression((prev) => prev.slice(0, -1));
    }
  };

  const calculateResult = () => {
    try {
      if (!expression) return;

      // Replace display operators dengan JS operators
      let evalExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");

      // Evaluate expression
      // eslint-disable-next-line no-eval
      const evalResult = eval(evalExpression);

      if (evalResult === Infinity || evalResult === -Infinity) {
        setResult("Error");
      } else if (isNaN(evalResult)) {
        setResult("Error");
      } else {
        const formatted = parseFloat(evalResult.toFixed(10)).toString();
        setResult(formatted);
      }
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    { label: "C", action: clear, className: "bg-red-500 text-white" },
    { label: "(", action: () => insertAtCursor("("), className: "bg-gray-300" },
    { label: ")", action: () => insertAtCursor(")"), className: "bg-gray-300" },
    {
      label: "÷",
      action: () => insertAtCursor("÷"),
      className: "bg-orange-500 text-white",
    },
    { label: "7", action: () => insertAtCursor("7"), className: "bg-gray-100" },
    { label: "8", action: () => insertAtCursor("8"), className: "bg-gray-100" },
    { label: "9", action: () => insertAtCursor("9"), className: "bg-gray-100" },
    {
      label: "×",
      action: () => insertAtCursor("×"),
      className: "bg-orange-500 text-white",
    },
    { label: "4", action: () => insertAtCursor("4"), className: "bg-gray-100" },
    { label: "5", action: () => insertAtCursor("5"), className: "bg-gray-100" },
    { label: "6", action: () => insertAtCursor("6"), className: "bg-gray-100" },
    {
      label: "-",
      action: () => insertAtCursor("-"),
      className: "bg-orange-500 text-white",
    },
    { label: "1", action: () => insertAtCursor("1"), className: "bg-gray-100" },
    { label: "2", action: () => insertAtCursor("2"), className: "bg-gray-100" },
    { label: "3", action: () => insertAtCursor("3"), className: "bg-gray-100" },
    {
      label: "+",
      action: () => insertAtCursor("+"),
      className: "bg-orange-500 text-white",
    },
    { label: "⌫", action: backspace, className: "bg-gray-300" },
    { label: "0", action: () => insertAtCursor("0"), className: "bg-gray-100" },
    { label: ".", action: () => insertAtCursor("."), className: "bg-gray-100" },
    {
      label: "=",
      action: calculateResult,
      className: "bg-orange-500 text-white",
    },
  ];

  return (
    <div className="hidden sm:block fixed bottom-6 left-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-purple-btn-primary hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="Buka Kalkulator"
        >
          <FaCalculator size={24} />
        </button>
      )}

      {/* Calculator Modal */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-72 animate-fadeIn">
          {/* Header */}
          <div className="bg-purple-btn-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaCalculator />
              <span className="font-semibold">Kalkulator</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-700 p-1 rounded transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Display */}
          <div className="bg-gray-800 text-white p-4">
            {/* Expression Input - bisa diedit */}
            <input
              ref={inputRef}
              type="text"
              value={expression}
              onChange={handleExpressionChange}
              placeholder="0"
              className="w-full bg-transparent text-right text-gray-300 text-sm font-mono outline-none border-b border-gray-600 pb-1 mb-2"
            />
            {/* Result */}
            <div className="text-right text-2xl font-bold font-mono overflow-x-auto">
              {result}
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-1 p-2 bg-gray-200">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`${btn.className} p-4 text-lg font-semibold rounded-lg hover:opacity-80 transition-opacity active:scale-95`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Footer info */}
          <div className="bg-gray-100 p-2 text-center text-xs text-gray-500">
            Hitung Ulang Untuk Memastikan Perhitungan Benar
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCalculator;
