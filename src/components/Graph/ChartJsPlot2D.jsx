import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation"; // Import plugin
import { lab } from "d3";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

ChartJS.register(annotationPlugin);

export default function ChartJsScatter2D({ result, opsional }) {
  const similarityData = result["reduced-data"];

  // Data untuk scatter plot (titik-titik), memastikan titik pertama adalah (0, 0)
  const scatterPoints = [
    ...similarityData.map((row, index) => ({
      x: row[0],
      y: row[1],
      label: `${opsional === "user-based" ? "user" : "item"}-${index + 1}`,
    })),
  ];

  // // Data untuk garis dari titik (0, 0)
  // const lineData = [
  //   { x: 0, y: 0 }, // Titik awal (0,0)
  //   ...scatterPoints, // Hubungkan ke titik-titik scatter setelah titik (0, 0)
  // ];

  // Menghitung min/max untuk x dan y agar lebih besar +1
  const xMin = Math.min(...scatterPoints.map((d) => d.x)) - 1;
  const xMax = Math.max(...scatterPoints.map((d) => d.x)) + 1;

  const yMin = Math.min(...scatterPoints.map((d) => d.y)) - 1;
  const yMax = Math.max(...scatterPoints.map((d) => d.y)) + 1;

  const data = {
    datasets: [
      {
        label: `Kumpulan ${opsional === "user-based" ? "User" : "Item"}`,
        data: scatterPoints,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointRadius: 5,
      },
      // {
      //   label: "Connections",
      //   data: lineData,
      //   borderColor: "red",
      //   borderWidth: 2,
      //   fill: false,
      //   showLine: true,
      //   pointRadius: 0, // Jangan tampilkan titik untuk garis
      // },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: xMin,
        max: xMax,
        ticks: {
          callback: function (value) {
            // Custom x-axis ticks untuk menampilkan user/item
            return `${value}`;
          },
        },
      },
      y: {
        type: "linear",
        position: "left",
        min: yMin,
        max: yMax,
        ticks: {
          callback: function (value) {
            // Custom y-axis ticks untuk menampilkan user/item
            return `${value}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const i = tooltipItem.dataIndex;
            return `${opsional === "user-based" ? "user" : "item"} - ${
              i + 1
            }: (${tooltipItem.raw.x}, ${tooltipItem.raw.y})`;
          },
        },
      },
    },
  };

  const PenjelasanScatter = () => {
    return (
      <>
        {/* Explanation Section */}
        <div className="mt-6 text-justify max-w-full md:max-w-xl mx-auto px-4">
          <h2 className="text-xl text-center font-bold mb-3">
            Cara Membaca Scatter Plot 2D
          </h2>
          <p className={`text-sm mb-2`}>
            Plot ini menggunakan{" "}
            <b>
              <a
                className="no-underline hover:underline text-card_blue_primary decoration-card_blue_primary "
                href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Multidimensional Scaling (MDS)
              </a>
            </b>
            , yaitu teknik reduksi dimensi yang mengubah data kompleks ke dalam
            dimensi lebih rendah (misalnya 2D atau 3D) sambil mempertahankan
            jarak antar objek. MDS membantu memvisualisasikan kemiripan antar
            objek, sehingga memudahkan analisis hubungan antar <i>user</i>.
          </p>
          <p className={`text-sm mb-2`}>
            Scatter plot ini menunjukkan hubungan antara dua variabel yang
            diambil dari data kemiripan pengguna. Setiap titik mewakili{" "}
            <i>user</i>, dan posisi titik tersebut menunjukkan posisi dari
            variabel yang dipilih.
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col my-5 font-poppins items-center">
        <div className="w-full h-96 p-4 rounded-lg mb-5">
          {/* Scatter Plot */}
          <Scatter data={data} options={options} />
        </div>
        <PenjelasanScatter />
      </div>
    </>
  );
}
