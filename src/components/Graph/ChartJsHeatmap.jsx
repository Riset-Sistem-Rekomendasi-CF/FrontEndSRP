import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import "chartjs-plugin-datalabels";
import { ExplanationSectionHeatMap } from "./KomponenHeatMaps/Explenation";

Chart.register(...registerables, MatrixController, MatrixElement);

export default function ChartJsHeatmap({ opsional, result, similarity }) {
  const canvasRef = useRef(null);
  const colorBarRef = useRef(null);

  const getColorScale = (value) => {
    if (
      similarity === "Adjusted Cosine" ||
      similarity === "Pearson Correlation Coefficient"
    ) {
      if (value <= -1) return "#68FF64"; // Green
      if (value >= 1) return "#6A5AE0"; // Purple
      if (value === 0) return "#69b3a2"; // Teal
      if (value < 0) {
        const ratio = (value + 1) / 1;
        return interpolateColor("#68FF64", "#69b3a2", ratio);
      } else {
        const ratio = value / 1;
        return interpolateColor("#69b3a2", "#6A5AE0", ratio);
      }
    } else {
      if (value <= 0) return "#68FF64";
      if (value >= 1) return "#6A5AE0";
      if (value <= 0.5) {
        const ratio = value / 0.5;
        return interpolateColor("#68FF64", "#69b3a2", ratio);
      } else {
        const ratio = (value - 0.5) / 0.5;
        return interpolateColor("#69b3a2", "#6A5AE0", ratio);
      }
    }
  };

  const interpolateColor = (startHex, endHex, t) => {
    const start = hexToRgb(startHex);
    const end = hexToRgb(endHex);
    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);
    return `rgb(${r},${g},${b})`;
  };

  const hexToRgb = (hex) => {
    const value = hex.replace("#", "");
    const bigint = parseInt(value, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const drawColorBar = (height) => {
    const canvas = colorBarRef.current;
    if (!canvas) return;

    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    if (
      similarity === "Adjusted Cosine" ||
      similarity === "Pearson Correlation Coefficient"
    ) {
      gradient.addColorStop(0, "#6A5AE0");
      gradient.addColorStop(0.5, "#69b3a2");
      gradient.addColorStop(1, "#68FF64");
    } else {
      gradient.addColorStop(0, "#6A5AE0");
      gradient.addColorStop(1, "#68FF64");
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.textAlign = "left";

    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
      let value;
      if (
        similarity === "Adjusted Cosine" ||
        similarity === "Pearson Correlation Coefficient"
      ) {
        value = (1 - i / steps) * 2 - 1;
      } else {
        value = 1 - i / steps;
      }
      ctx.fillText(value.toFixed(2), width + 5, y + 4);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const similarityMatrix = result["similarity"];
    const numCells = similarityMatrix.length;

    const usersIndex = Array.from(
      { length: numCells },
      (_, i) => `${opsional === "user-based" ? "user" : "item"}-${i + 1}`
    );

    const data = similarityMatrix.flatMap((row, rowIndex) =>
      row.map((value, colIndex) => ({
        x: colIndex,
        y: numCells - rowIndex - 1,
        v: value,
        backgroundColor: getColorScale(value),
      }))
    );

    const cellSize = 40; // ukuran cell tetap (kotak)

    const chart = new Chart(ctx, {
      type: "matrix",
      data: {
        datasets: [
          {
            label: "Similarity Heatmap",
            data: data,
            backgroundColor: (ctx) => ctx.raw.backgroundColor,
            width: () => cellSize,
            height: () => cellSize,
            borderWidth: 1,
            borderColor: "#fff",
            datalabels: {
              display: true,
              color: "#000",
              font: { size: 10 },
              align: "center",
              anchor: "center",
              formatter: (value) => value.v.toFixed(2),
            },
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: () => "",
              label: (ctx) => {
                const { x, y, v } = ctx.raw;
                return `(${usersIndex[y]}, ${usersIndex[x]}): ${v.toFixed(4)}`;
              },
            },
          },
          legend: { display: false },
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              callback: (val) => usersIndex[val],
              font: { size: 12 },
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
            grid: { display: false },
          },
          y: {
            type: "linear",
            ticks: {
              callback: (val) => usersIndex[numCells - val - 1],
              font: { size: 12 },
              autoSkip: false,
            },
            grid: { display: false },
          },
        },
      },
      plugins: ["chartjs-plugin-datalabels"],
    });

    drawColorBar(cellSize * numCells);

    return () => {
      chart.destroy();
    };
  }, [result, similarity]);

  return (
    <div className="flex flex-col items-center font-poppins my-5">
      <div className="flex flex-row justify-center items-start gap-4">
        {/* Heatmap Chart */}
        <div className="overflow-auto relative border p-2">
          <canvas
            ref={canvasRef}
            width={result.similarity.length * 40}
            height={result.similarity.length * 40}
          />
        </div>

        {/* Color Bar + Legend */}
        <div className="flex flex-col items-center">
          {/* Color Bar */}
          <canvas
            ref={colorBarRef}
            width={30}
            style={{
              width: "30px",
              height: `${result.similarity.length * 40}px`,
            }}
          />

          {/* Legend Description */}
          <div className="text-xs mt-2 text-left">
            <div className="mb-1">Skala Warna:</div>
            <ul className="text-[11px]">
              {similarity === "Adjusted Cosine" ||
              similarity === "Pearson Correlation Coefficient" ? (
                <>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#6A5AE0] mr-2" />1
                    = Sangat Mirip
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#69b3a2] mr-2" />0
                    = Netral
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#68FF64] mr-2" />
                    -1 = Sangat Berlawanan
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#6A5AE0] mr-2" />1
                    = Sangat Mirip
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#69b3a2] mr-2" />
                    0.5 = Sedang
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-[#68FF64] mr-2" />0
                    = Tidak Mirip
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Penjelasan */}
      <ExplanationSectionHeatMap opsional={opsional} />
    </div>
  );
}
