import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation"; // Import plugin

// Menonaktifkan pengaturan aspek rasio dan membuat grafik responsif
defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Daftarkan plugin anotasi
ChartJS.register(annotationPlugin);

function ScatterPlotChart({
  opsional,
  topSimilarities,
  result,
  rowIndex,
  colIndex,
}) {
  // Ambil data yang sudah diproses dari result
  const similarityDataFilter = result["reduced-data"];

  // Data untuk chart.js, dimapping sesuai dengan format yang dibutuhkan
  const data = {
    datasets: [
      {
        label: "Dataset Scatter",
        data: similarityDataFilter.map((item, index) => ({
          x: item[0], // x-coordinate
          y: item[1], // y-coordinate
          label: `${opsional === "user-based" ? "User" : "Item"}-${index + 1}`,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 6,
        hoverBackgroundColor: "orange", // Warna titik saat hover
        hoverRadius: 8, // Ukuran titik saat hover
      },
      {
        label: "Nearest Neighbors",
        data: [], // Placeholder untuk tetangga terdekat
        backgroundColor: "rgba(255, 105, 180, 0.6)", // Pink untuk tetangga terdekat
        borderColor: "rgba(255, 105, 180, 1)",
        pointRadius: 6,
      },
      {
        label: "SteelBlue Points",
        data: [], // Placeholder untuk titik steelblue
        backgroundColor: "rgba(70, 130, 180, 0.3)", // Steelblue lebih redup
        borderColor: "rgba(70, 130, 180, 1)",
        pointRadius: 6,
      },
      {
        label: "Target Point (Red)",
        data: [], // Placeholder untuk titik merah (target)
        backgroundColor: "rgba(255, 0, 0, 0.6)", // Merah lebih redup
        borderColor: "rgba(255, 0, 0, 1)",
        pointRadius: 10, // Ukuran lebih besar untuk target
      },
    ],
  };

  // Menghitung Euclidean Distance untuk menemukan tetangga terdekat
  const calculateDistance = (d1, d2) =>
    Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));

  const selectedIndex = opsional === "user-based" ? rowIndex : colIndex;
  const selectedPoint = data.datasets[0].data[selectedIndex];

  // Menambahkan titik merah (target) ke dataset
  data.datasets[3].data = [selectedPoint];

  // Menentukan tetangga terdekat
  const distances = data.datasets[0].data.map((d, index) => ({
    index,
    distance: calculateDistance(selectedPoint, d),
  }));

  // Mengurutkan berdasarkan jarak dan memilih tetangga terdekat
  const nearestNeighbors = distances
    .filter((d) => d.index !== selectedIndex) // Menghapus titik yang dipilih
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2); // Ambil 2 tetangga terdekat

  // Mengatur data untuk nearest neighbors dan steelblue points
  data.datasets[1].data = nearestNeighbors.map((neighbor) => {
    return data.datasets[0].data[neighbor.index];
  });

  // Menambahkan steelblue points (semua titik selain tetangga terdekat dan titik yang dipilih)
  data.datasets[2].data = data.datasets[0].data.filter((_, index) => {
    return (
      !nearestNeighbors.some((neighbor) => neighbor.index === index) &&
      index !== selectedIndex
    );
  });

  // Menghitung min/max untuk x dan y agar lebih besar +1
  const xValues = data.datasets[0].data.map((d) => d.x);
  const yValues = data.datasets[0].data.map((d) => d.y);

  const xMin = Math.min(...xValues) - 1;
  const xMax = Math.max(...xValues) + 1;

  const yMin = Math.min(...yValues) - 1;
  const yMax = Math.max(...yValues) + 1;

  // Menambahkan Lingkaran di sekitar titik merah dan dua tetangga terdekat
  const annotations = nearestNeighbors.map((neighbor) => {
    const neighborPoint = data.datasets[0].data[neighbor.index];
    const radius = calculateDistance(selectedPoint, neighborPoint);

    return {
      type: "circle",
      xValue: neighborPoint.x,
      yValue: neighborPoint.y,
      radius: radius + 0.5, // Menambahkan sedikit jarak
      backgroundColor: "rgba(0, 0, 0, 0)", // Lingkaran berwarna transparan
      borderColor: "rgba(255, 105, 180, 0.5)", // Warna pink untuk tetangga terdekat
      borderWidth: 2,
    };
  });

  // Menambahkan lingkaran di sekitar titik target dengan warna dinamis
  const targetColor = nearestNeighbors.some((neighbor) => {
    const neighborPoint = data.datasets[0].data[neighbor.index];
    // If the target point is near the center between the nearest neighbors, use a faded color
    return (
      Math.abs(selectedPoint.x - neighborPoint.x) < 0.5 &&
      Math.abs(selectedPoint.y - neighborPoint.y) < 0.5
    );
  })
    ? "rgba(255, 0, 0, 0.3)" // Faded red if target is near the middle
    : "rgba(255, 0, 0, 0.6)"; // Normal red color if it's not in the middle

  annotations.push({
    type: "circle",
    xValue: selectedPoint.x,
    yValue: selectedPoint.y,
    radius:
      Math.max(
        ...nearestNeighbors.map((neighbor) =>
          calculateDistance(
            selectedPoint,
            data.datasets[0].data[neighbor.index]
          )
        )
      ) + 1, // Menambahkan sedikit jarak
    backgroundColor: "rgba(0, 0, 0, 0)", // Lingkaran berwarna merah transparan
    borderColor: targetColor, // Dynamic color for target
    borderWidth: 2,
  });

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: xMin,
        max: xMax,
        title: {
          display: true,
          text: `${opsional === "user-based" ? "user" : "item"}- ${
            rowIndex + 1
          }`,
        },
      },
      y: {
        type: "linear",
        position: "left",
        min: yMin,
        max: yMax,
        title: {
          display: true,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw.label;
          },
        },
      },
      annotation: {
        annotations, // Menambahkan anotasi lingkaran
      },
    },
  };

  return (
    <>
      <Scatter data={data} options={options} />
    </>
  );
}

export default ScatterPlotChart;
