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
  kValue,
}) {
  // Ambil data yang sudah diproses dari result
  const similarityDataFilter = result["reduced-data"];

  // Data untuk chart.js, dimapping sesuai dengan format yang dibutuhkan
  const data = {
    datasets: [
      {
        label: "Data Rating",
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
        label: "Tetangga Terdekat (Green)",
        data: [], // Placeholder untuk tetangga terdekat
        backgroundColor: "rgba(0, 255, 0, 0.6)", // Hijau untuk tetangga terdekat
        borderColor: "rgba(0, 255, 0, 1)",
        pointRadius: 6,
      },
      {
        label: "Bukan Tetangga (Blue)",
        data: [], // Placeholder untuk titik biru
        backgroundColor: "rgba(0, 0, 255, 0.3)", // Biru lebih redup
        borderColor: "rgba(0, 0, 255, 1)",
        pointRadius: 6,
      },
      {
        label: "Target Prediksi (Red)",
        data: [], // Placeholder untuk titik merah (target)
        backgroundColor: "rgba(255, 0, 0, 0.6)", // Merah untuk target
        borderColor: "rgba(255, 0, 0, 1)",
        pointRadius: 8, // Ukuran lebih besar untuk target
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
    .slice(0, kValue); // Ambil k tetangga terdekat

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

  // Menambahkan lingkaran (ellipse) yang membungkus titik merah dan semua titik hijau
  const redPoint = selectedPoint;
  const greenPoints = nearestNeighbors.map(
    (neighbor) => data.datasets[0].data[neighbor.index]
  );

  // Menghitung posisi dan radius lingkaran untuk mencakup titik merah dan hijau
  const centerX =
    (redPoint.x + greenPoints.reduce((sum, p) => sum + p.x, 0)) /
    (greenPoints.length + 1);
  const centerY =
    (redPoint.y + greenPoints.reduce((sum, p) => sum + p.y, 0)) /
    (greenPoints.length + 1);

  // Radius adalah jarak terbesar dari center ke titik terjauh (merah atau hijau)
  const radius = Math.max(
    calculateDistance({ x: centerX, y: centerY }, redPoint),
    ...greenPoints.map((p) => calculateDistance({ x: centerX, y: centerY }, p))
  );

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
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1,
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
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1,
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
        annotations: nearestNeighbors.reduce((acc, neighbor, index) => {
          const greenPoint = data.datasets[0].data[neighbor.index];

          acc[`line-${index}`] = {
            type: "line",
            xMin: redPoint.x,
            xMax: greenPoint.x,
            yMin: redPoint.y,
            yMax: greenPoint.y,
            borderColor: "green", // Warna garis untuk setiap tetangga
            borderWidth: 2,
            label: {
              content: `Red to Green ${index + 1}`,
              enabled: true,
              position: "center",
            },
          };

          return acc;
        }, {}),
      },
    },
  };

  const ExplanationSectionScatterPlotFilter = () => {
    return (
      <div className=" text-justify max-w-full md:max-w-xl mx-auto px-4">
        <h2 className="text-xl text-center font-bold mb-3">
          Cara Membaca Scatter Plot 2D
        </h2>
        <p className="text-sm mb-2">
          Grafik plot ini menunjukkan himpunan{" "}
          <i>{opsional === "user-based" ? "User" : "Item"} </i> yang diambil
          dari data kemiripan pengguna. Setiap titik mewakili{" "}
          <i>{opsional === "user-based" ? "User" : "Item"}</i>, dan posisi titik
          yang diambil berdasarkan Top-K terdekat. Titik merah menunjukkan titik
          yang dipilih sebagai{" "}
          <i>{opsional === "user-based" ? "User" : "Item"}</i> yang akan
          diprediksi. Titik hijau menunjukkan Top-K terdekat, sedangkan titik
          biru menunjukkan titik yang bukan merupakan tetangga terdekat. Garis
          yang menghubungkan titik merah dan hijau menunjukkan jarak antara
          titik merah dan hijau. Jarak ini digunakan untuk membantu melihat
          titik yang paling dekat dengan titik merah atau <i>user</i> target.
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col my-5 font-poppins items-center">
        <div className="w-full h-96 p-4 rounded-lg mb-5">
          <Scatter data={data} options={options} />
        </div>
        <ExplanationSectionScatterPlotFilter />
      </div>
    </>
  );
}

export default ScatterPlotChart;
