import React, { useState, useCallback } from "react";
import { Menu } from "@headlessui/react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/material/FormControl";

import HeatMapVisualDataSim from "./HeatMapVisual";
import { ScatterPlotData } from "./SccaterPlotVisual";
import ChartJsScatter2D from "./ChartJsPlot2D";

// Membungkus komponen visualisasi dengan React.memo agar tidak di-render ulang secara tidak perlu
const MemoizedHeatMap = React.memo(({ result, opsional, similarity }) => {
  return (
    <HeatMapVisualDataSim
      result={result}
      opsional={opsional}
      similarity={similarity}
    />
  );
});

const MemoizedScatterPlot = React.memo(({ result, opsional }) => {
  return <ChartJsScatter2D result={result} opsional={opsional} />;
});

const DropdownWithDisplay = ({ opsional, result, similarity }) => {
  const [selectedMethod, setSelectedMethod] = useState("Pilih Visualisasi");
  const [visualComponent, setVisualComponent] = useState(null);

  // Fungsi handleChange yang lebih ringan dan menggunakan useCallback untuk menghindari pembentukan ulang fungsi setiap kali
  const handleChange = useCallback(
    (method) => {
      setSelectedMethod(method);
      switch (method) {
        case "HeatMap":
          setVisualComponent(
            <MemoizedHeatMap
              result={result}
              opsional={opsional}
              similarity={similarity}
            />
          );
          break;
        case "Plot Visual 2D":
          setVisualComponent(
            <MemoizedScatterPlot result={result} opsional={opsional} />
          );
          break;
        default:
          setVisualComponent(null);
          break;
      }
    },
    [result, opsional, similarity]
  );

  return (
    <div className="container mx-auto py-4">
      <FormControl>
        <Menu as="div" className="relative inline-block text-left w-full">
          <div>
            <Menu.Button className="outline outline-1 inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-purple-btn-primary px-4 py-2 text-sm font-semibold font-poppins text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-purple-600">
              {selectedMethod}
              <KeyboardArrowDown className="-mr-1 h-5 w-5 text-white" />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute right-0 z-10 mt-2 w-full sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleChange("HeatMap")}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    HeatMap
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleChange("Plot Visual 2D")}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Scatter Plot 2D
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </FormControl>

      {/* Display selected method below the dropdown */}
      <div className="my-5 text-gray-700">
        <div className="mt-4">{visualComponent}</div>{" "}
        {/* Render komponen yang sesuai */}
      </div>
    </div>
  );
};

export default DropdownWithDisplay;
