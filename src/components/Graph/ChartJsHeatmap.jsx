import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation"; // Import plugin

// Menonaktifkan pengaturan aspek rasio dan membuat grafik responsif
defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Daftarkan plugin anotasi
ChartJS.register(annotationPlugin);

export default function ChartJsHeatmap({ opsional, result, similarity }) {
  // Cek apakah similarityDataHeatMap ada dan merupakan array
  const similarityDataHeatMap = result?.similarity || [];

  // Pastikan data tidak kosong sebelum melanjutkan
  if (similarityDataHeatMap.length === 0) {
    return (
      <div className="w-full h-96 p-4 rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Heatmap Chart
        </h2>
        <p>No similarity data available</p>
      </div>
    );
  }

  // Membuat data untuk chart.js berdasarkan data similarity
  const data = {
    datasets: [
      {
        label: "Heatmap",
        data: similarityDataHeatMap.flatMap((row, rowIndex) =>
          row.map((value, colIndex) => {
            const colorValue = value * 255; // Skala warna dari 0 ke 255 berdasarkan similarity
            return {
              x: colIndex + 1, // user/item (x-axis)
              y: rowIndex + 1, // user/item (y-axis)
              r: 10, // ukuran radius tetap untuk setiap titik
              backgroundColor: `rgba(${colorValue}, 99, 132, 0.6)`, // Mengubah warna titik berdasarkan similarity
            };
          })
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          callback: function (value) {
            // Custom x-axis ticks untuk menampilkan user/item
            return `${opsional === "user-based" ? "user" : "item"}-${value}`;
          },
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          callback: function (value) {
            // Custom y-axis ticks untuk menampilkan user/item
            return `${opsional === "user-based" ? "user" : "item"}-${value}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Mendapatkan informasi yang ditampilkan di tooltip
            const i = tooltipItem.dataIndex;
            return `${opsional === "user-based" ? "user" : "item"} - ${
              i + 1
            }: user = ${tooltipItem.raw.x}, item = ${
              tooltipItem.raw.y
            }, similarity = ${tooltipItem.raw.r}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 rounded-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">Heatmap Chart</h2>
      <Scatter data={data} options={options} />
    </div>
  );
}
