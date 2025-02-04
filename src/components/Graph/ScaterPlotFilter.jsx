import React, { useEffect, useState } from "react";
import * as d3 from "d3";

// Fungsi untuk memeriksa apakah titik (x, y) berada dalam elips
const isPointInEllipse = (x, y, centerX, centerY, radiusX, radiusY, scale) => {
  // Perhitungan jarak titik terhadap pusat elips
  const dx = (x - centerX) / radiusX;
  const dy = (y - centerY) / radiusY;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(scale, 2);
};

// Fungsi untuk menghitung jarak dari titik ke elips dan menyesuaikan skala
const calculateEllipseScale = (allPoints, data, xScale, yScale) => {
  const xMin = d3.min(allPoints, (d) => d.x);
  const xMax = d3.max(allPoints, (d) => d.x);
  const yMin = d3.min(allPoints, (d) => d.y);
  const yMax = d3.max(allPoints, (d) => d.y);

  // Titik pusat elips
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;

  // Jari-jari elips
  const radiusX = (xMax - xMin) / 2;
  const radiusY = (yMax - yMin) / 2;

  let scale = 1.5; // Faktor skala awal

  // Periksa apakah ada titik steelblue dalam elips
  const isSteelBlueInEllipse = data.some((d) => {
    if (d.fill === "steelblue") {
      return isPointInEllipse(
        d.x,
        d.y,
        centerX,
        centerY,
        radiusX,
        radiusY,
        scale
      );
    }
    return false;
  });

  // Jika titik steelblue ada dalam elips, kurangi ukuran elips
  if (isSteelBlueInEllipse) {
    scale = 0.8; // Mengurangi skala untuk mencegah titik steelblue masuk
  }

  return { centerX, centerY, radiusX, radiusY, scale };
};

export function ScatterPlotDataFilter({
  opsional,
  topSimilarities,
  result,
  rowIndex,
  colIndex,
}) {
  const similarityDataFilter = result["reduced-data"];
  // console.log("ini adalh reduce data ", similarityDataFilter);
  const PredictionDataSet = result["prediction"];
  // console.log("ini adalh prediciton in plot", PredictionDataSet);

  // Mengubah objek menjadi array 2D
  const dataFilterPlot = similarityDataFilter.map((item) => item);

  // console.log("ini array 2d", dataFilterPlot)
  const ScatterPlotFilter = () => {
    const [size, setSize] = useState({ width: 500, height: 500 });
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    useEffect(() => {
      // Update size on window resize to make the plot responsive
      const handleResize = () => {
        const container = document.getElementById("scatterplot");
        setSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initial size adjustment on mount

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const width = size.width - margin.left - margin.right;
    const height = size.height - margin.top - margin.bottom;

    // Data untuk scatter plot, disesuaikan dengan kebutuhan
    const data = dataFilterPlot.map((row, index) => ({
      x: row[0],
      y: row[1],
      label: `${opsional === "user-based" ? "user" : "item"}-${index + 1} `,
    }));

    useEffect(() => {
      // Clear previous SVG if present
      d3.select("#scatterplot").select("svg").remove();

      // Create a new SVG element
      const svg = d3
        .select("#scatterplot")
        .append("svg")
        .attr("width", size.width)
        .attr("height", size.height)
        .attr("viewBox", `0 0 ${size.width} ${size.height}`) // make it responsive
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Function to calculate Euclidean distance
      const calculateDistance = (d1, d2) =>
        Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));

      // Select the user/item for analysis
      const selectedUserIndex = opsional === "user-based" ? rowIndex : colIndex;

      // Calculate distances from the selected point
      const distances = data.map((d, i) => ({
        index: i,
        distance: calculateDistance(data[selectedUserIndex], d),
      }));

      // Menggabungkan distance dengan Top Similarity
      const distanceTopSimilarity = distances.filter((v) => {
        for (let i = 0; i < topSimilarities.length; i++) {
          if (topSimilarities[i].index === v.index)
            return topSimilarities[i].index === v.index;
        }
      });

      // Sort and select the 2 nearest neighbors
      const nearestNeighbors = distanceTopSimilarity
        .filter((d) => d.index !== selectedUserIndex) // Menghapus user yang dipilih dari daftar
        .sort((a, b) => a.distance - b.distance);
      // .slice(0, kValue); // Ambil 2 tetangga terdekat

      // console.log("nearest", nearestNeighbors);

      // Create scales for X and Y axes
      const xScale = d3
        .scaleLinear()
        // .domain(d3.extent(data, (d) => d.x))
        .domain([d3.min(data, (d) => d.x) - 1, d3.max(data, (d) => d.x) + 1])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        // .domain(d3.extent(data, (d) => d.y))
        .domain([d3.min(data, (d) => d.y) - 1, d3.max(data, (d) => d.y) + 1])
        .range([height, 0]);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

      // Add Y axis
      svg.append("g").call(d3.axisLeft(yScale));

      // Add grid lines
      const xGrid = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickSize(-height)
        .tickFormat("");

      const yGrid = d3
        .axisLeft(yScale)
        .ticks(10)
        .tickSize(-width)
        .tickFormat("");

      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(xGrid);

      svg.append("g").attr("class", "grid").call(yGrid);

      // Add circles for data points
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .attr("fill", (d, i) => {
          if (i === selectedUserIndex) return "red"; // Color for selected user
          if (nearestNeighbors.some((n) => n.index === i)) return "green"; // Color for nearest neighbors
          return "steelblue"; // Default color
        })
        .on("mouseover", (event, d) => {
          d3.select(this).attr("fill", "orange"); // Ubah warna saat hover
          svg
            .append("text")
            .attr("x", xScale(d.x) + 10)
            .attr("y", yScale(d.y) - 10)
            .attr("class", "tooltip")
            .text(d.label);
        })
        .on("mouseout", function () {
          svg.selectAll(".tooltip").remove(); // Hapus tooltip saat mouseout
        });

      // Menambahkan garis dari titik origin (0,0) ke setiap titik
      // data.forEach((d) => {
      //   svg
      //     .append("line")
      //     .attr("x1", xScale(0))
      //     .attr("y1", yScale(0))
      //     .attr("x2", xScale(d.x))
      //     .attr("y2", yScale(d.y))
      //     .attr("stroke", "red")
      //     .attr("stroke-width", 1);
      // });

      // Add labels around each point
      svg
        .selectAll("text.label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => xScale(d.x))
        .attr("y", (d) => yScale(d.y) - 10) // Position label slightly above the point
        .attr("class", "label")
        .attr("text-anchor", "middle") // Horizontal center alignment
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text((d) => d.label);

      // Fungsi untuk memeriksa apakah titik berada dalam ellips
      const isPointInEllipse = (x, y, ellipse) => {
        const dx = (x - ellipse.cx) / ellipse.rx;
        const dy = (y - ellipse.cy) / ellipse.ry;
        return dx * dx + dy * dy <= 1; // <= 1 untuk memastikan dalam ellipse
      };

      // Fungsi untuk menggambar ellips
      const drawEllipse = (
        centerX,
        centerY,
        radiusX,
        radiusY,
        color,
        id = null
      ) => {
        const ellipse = svg
          .append("ellipse")
          .attr("cx", xScale(centerX))
          .attr("cy", yScale(centerY))
          .attr("rx", xScale(centerX + radiusX) - xScale(centerX))
          .attr("ry", yScale(centerY - radiusY) - yScale(centerY))
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 2);

        if (id) ellipse.attr("id", id);
        return ellipse;
      };

      // ellipse steelBlue
      const steelbluePoints = data.filter(
        (_, i) =>
          !nearestNeighbors.some((n) => n.index === i) &&
          i !== selectedUserIndex
      );

      steelbluePoints.forEach((point, index) => {
        drawEllipse(point.x, point.y, 0.15, 0.15, "black", `ellipse-${index}`);
      });

      const mask = svg.append("defs").append("mask").attr("id", "ellipse-mask");

      // Mask background (full visibility)
      mask
        .append("rect")
        .attr("width", size.width)
        .attr("height", size.height)
        .attr("fill", "white");

      // Mask out steelblue ellipses
      steelbluePoints.forEach((point) => {
        mask
          .append("ellipse")
          .attr("cx", xScale(point.x))
          .attr("cy", yScale(point.y))
          .attr("rx", xScale(point.x + 0.15) - xScale(point.x))
          .attr("ry", yScale(point.y - 0.15) - yScale(point.y))
          .attr("fill", "black");
      });

      // Draw yellow ellipse with mask applied
      let yellowEllipse = null;
      if (nearestNeighbors.length > 0) {
        const targetPoints = [
          data[selectedUserIndex],
          ...nearestNeighbors.map((n) => data[n.index]),
        ];

        const xMin = d3.min(targetPoints, (d) => d.x);
        const xMax = d3.max(targetPoints, (d) => d.x);
        const yMin = d3.min(targetPoints, (d) => d.y);
        const yMax = d3.max(targetPoints, (d) => d.y);

        const centerX = (xMin + xMax) / 2;
        const centerY = (yMin + yMax) / 2;
        // console.log("ini center x", centerX, "center y", centerY);
        const radiusX = (xMax - xMin) / 2 + 0.2;
        const radiusY = (yMax - yMin) / 2 + 0.2;

        yellowEllipse = svg
          .append("ellipse")
          .attr("cx", xScale(centerX))
          .attr("cy", yScale(centerY))
          .attr("rx", xScale(centerX + radiusX) - xScale(centerX))
          .attr("ry", yScale(centerY - radiusY) - yScale(centerY))
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("mask", "url(#ellipse-mask)");

        // Add outline for the "cut-off" regions
        steelbluePoints.forEach((point) => {
          svg
            .append("ellipse")
            .attr("cx", xScale(point.x))
            .attr("cy", yScale(point.y))
            .attr("rx", xScale(point.x + 0.15) - xScale(point.x))
            .attr("ry", yScale(point.y - 0.15) - yScale(point.y))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);
        });
      }
    }, [size]); // Re-run on size change
    return (
      <>
        <div id="scatterplot" style={{ margin: "0 auto" }} />
        <div className="mt-6 text-start w-full">
          <p className="font-semibold text-lg sm:text-xl mb-4">Keterangan:</p>
          <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4 justify-center px-4">
            <li className="flex items-center text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-red-500 border border-1 border-black mr-2"></div>
              <span> {opsional === "user-based" ? "User" : "Item"} target</span>
            </li>
            <li className="flex items-center text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-500 border border-1 border-black mr-2"></div>
              <span>
                {opsional === "user-based" ? "User" : "Item"} Tetangga
              </span>
            </li>
            <li className="flex items-center text-sm sm:text-base">
              <div className="h-1 w-3  border-2 border-black "></div>
              <p>
                <span>
                  Himpunan {opsional === "user-based" ? "User" : "Item"} Top-K{" "}
                </span>
              </p>
            </li>
            <li className="flex items-center text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full   border-2 bg-blue-500 border-black mr-2"></div>
              <p>
                <span>
                  Semua {opsional === "user-based" ? "User" : "Item"}{" "}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </>
    );
  };
  const ExplanationSectionScatterPlotFilter = () => {
    return (
      <div className="mt-6 text-justify max-w-full md:max-w-xl mx-auto px-4">
        <h2 className="text-xl text-center font-bold mb-3">
          Cara Membaca Scatter Plot 2D
        </h2>
        <p className="text-sm mb-2">
          Grafik plot ini menunjukkan himpunan{" "}
          <i>{opsional === "user-based" ? "User" : "Item"} </i> yang diambil
          dari data kemiripan pengguna. Setiap titik mewakili{" "}
          <i>{opsional === "user-based" ? "User" : "Item"}</i>, dan posisi titik
          yang diambil berdasarkan Top-K terdekat dan terdapat 2 kriteria dalam
          memilih Top-K :
        </p>

        {/* Tabel untuk Kriteria 1 dan Kriteria 2 */}
        <div className="overflow-x-auto ">
          <table className="min-w-full table-auto border-collapse text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Kriteria 1</th>
                <th className="px-4 py-2 border border-gray-300">Kriteria 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-sm px-4 py-2 border border-gray-300 hover:bg-blue-200 cursor-pointer">
                  Pada Kriteria 1, digunakan untuk memilih Top-K berdasarkan
                  nilai similaritas mirip terhadap{" "}
                  <i>{opsional === "user-based" ? "User" : "Item"} </i> target.
                </td>
                <td className="font-medium text-sm px-4 py-2 border border-gray-300  hover:bg-blue-200 cursor-pointer">
                  Pada Kriteria 2, dimana{" "}
                  <i>{opsional === "user-based" ? "User" : "Item"} </i>{" "}
                  sama-sama telah memberikan rating terhadap{" "}
                  <i>{opsional === "user-based" ? "Item" : "User"} </i> target.
                </td>
              </tr>
              {/* Baris selanjutnya dapat ditambahkan sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col my-5 font-poppins items-center mx-auto">
      <ScatterPlotFilter />
      <ExplanationSectionScatterPlotFilter />
    </div>
  );
}

// Tambahkan lingkaran besar di sekitar kelompok tetangga terdekat

//             // Ambil koordinat x dan y dari tetangga terdekat
//             const neighborXValues = nearestNeighbors.map(n => data[n.index].x);
//             const neighborYValues = nearestNeighbors.map(n => data[n.index].y);
//             const targetPoint = data[selectedUserIndex];
//
// // Hitung titik tengah ellipse (center) sebagai rata-rata dari titik-titik tetangga
//             const ellipseX = d3.mean(neighborXValues);
//             const ellipseY = d3.mean(neighborYValues);
//
// // Hitung radius ellipse berdasarkan sebaran titik-titik tetangga relatif terhadap target
//             const radiusX = d3.max(neighborXValues.map(x => Math.abs(x - targetPoint.x))) || 1;  // Pastikan radius minimal 1
//             const radiusY = d3.max(neighborYValues.map(y => Math.abs(y - targetPoint.y))) || 1;  // Pastikan radius minimal 1
//
// // Tentukan faktor skala untuk menyesuaikan ukuran ellipse
//             const scaleFactor = 1.0; // Sesuaikan skala radius sesuai kebutuhan
//
// // Menggambar ellipse
//             svg.append('ellipse')
//                 .attr('cx', xScale(ellipseX)) // Posisi sumbu X (titik tengah ellipse)
//                 .attr('cy', yScale(ellipseY)) // Posisi sumbu Y (titik tengah ellipse)
//                 .attr('rx', xScale(ellipseX + radiusX * scaleFactor) - xScale(ellipseX)) // Radius X yang disesuaikan dengan skala
//                 .attr('ry', yScale(ellipseY + radiusY * scaleFactor) - yScale(ellipseY)) // Radius Y yang disesuaikan dengan skala
//                 .attr('fill', 'none') // Tidak ada isian
//                 .attr('stroke', 'green') // Warna garis hijau untuk ellipse
//                 .attr('stroke-width', 2) // Ketebalan garis
//                 .attr('stroke-dasharray', '4,4'); // Opsional: Garis putus-putus (dapat dihilangkan)
