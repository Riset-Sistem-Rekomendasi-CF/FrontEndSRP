import { useState, useCallback, memo, lazy, Suspense } from "react";
import { Menu } from "@headlessui/react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/material/FormControl";

import HeatMapVisualDataSim from "./HeatMapVisual";
import { ScatterPlotData } from "./SccaterPlotVisual";
import ChartJsScatter2D from "./ChartJsPlot2D";
import GrafikForChart from "../../assets/images/grafikDropdown.svg";
import { OnlyDivider } from "../tabelData/DividerHeading";
import ChartJsHeatmap from "./ChartJsHeatmap";

const MemoizedHeatMap = memo(({ result, opsional, similarity }) => {
  return (
    <HeatMapVisualDataSim
      result={result}
      opsional={opsional}
      similarity={similarity}
    />
    // <ChartJsHeatmap
    //   result={result}
    //   opsional={opsional}
    //   similarity={similarity}
    // />
  );
});

const MemoizedScatterPlot = memo(({ result, opsional }) => {
  return <ChartJsScatter2D result={result} opsional={opsional} />;
});

const DropdownWithDisplay = ({ opsional, result, similarity }) => {
  const [selectedMethod, setSelectedMethod] = useState("Pilih Visualisasi");
  const [visualComponent, setVisualComponent] = useState(null);

  const LazyHeatMap = lazy(() => import("./HeatMapVisual"));
  const LazyScatterPlot = lazy(() => import("./ChartJsPlot2D"));

  // Fungsi handleChange yang lebih ringan dan menggunakan useCallback untuk menghindari pembentukan ulang fungsi setiap kali
  const handleChange = useCallback(
    (method) => {
      setSelectedMethod(method);
      switch (method) {
        case "HeatMap":
          setVisualComponent(
            <Suspense fallbac={<div>Loading...</div>}>
              <MemoizedHeatMap
                result={result}
                opsional={opsional}
                similarity={similarity}
              />
            </Suspense>
          );
          break;
        case "Plot Visual 2D":
          setVisualComponent(
            <Suspense fallbac={<div>Loading...</div>}>
              <MemoizedScatterPlot result={result} opsional={opsional} />
            </Suspense>
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
    <div className="container mx-auto max-w-full py-4 bg-green-200 rounded-md shadow-sm border border-black">
      <div>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold font-poppins">
          Silahkan Pilih Visualisasi Yang Anda Inginkan{" "}
        </h1>
        <OnlyDivider colorBorder="border-gray-600" />
        <img
          src={GrafikForChart}
          alt="Grafik Illustration"
          className="mx-auto mb-4 w-40 h-32"
        />
      </div>
      <FormControl>
        <Menu as="div" className="relative inline-block text-left w-full">
          <div>
            <Menu.Button className="outline outline-1 inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-purple-btn-primary px-4 py-2 text-sm font-semibold font-poppins text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-purple-600">
              {selectedMethod}
              <KeyboardArrowDown className="-mr-1 h-5 w-5 text-white" />
            </Menu.Button>
          </div>

          <Menu.Items className="font-medium text-md absolute right-0 z-10 mt-2 w-full sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none font-poppins">
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
