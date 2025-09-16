import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ExplanationSectionScatterPlotFilter } from "./KomponenPlotFilter/ExplanationSectionScatterPlotFilter";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import IconButton from "@mui/material/IconButton";
import { KeteranganScatterPlotFilter } from "./KomponenPlotFilter/KeteranganScatterPlotFilter";

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

  // Periksa apakah ada titik red dalam elips
  const isredInEllipse = data.some((d) => {
    if (d.fill === "red") {
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

  // Jika titik red ada dalam elips, kurangi ukuran elips
  if (isredInEllipse) {
    scale = 0.8; // Mengurangi skala untuk mencegah titik red masuk
  }

  return { centerX, centerY, radiusX, radiusY, scale };
};

export function ScatterPlotFilterData({
  opsional,
  topSimilarities,
  result,
  rowIndex,
  colIndex,
}) {
  const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);
  if (!result || !result["reduced-data"]) {
    return <div>Data tidak tersedia...</div>;
  }
  console.log("ini adalh result", result);
  const similarityDataFilter = result["reduced-data"];
  console.log("ini adalh reduce data ", similarityDataFilter);
  const PredictionDataSet = result["prediction"];
  console.log("ini adalh prediciton in plot", PredictionDataSet);

  // Mengubah objek menjadi array 2D
  const dataFilterPlot = similarityDataFilter.map((item) => item);
  // Asumsikan threshold jarak minimum antar titik untuk penggabungan
  const mergedEllipses = [];
  const threshold = 0.3; // batas jarak antar titik yang dianggap berdekatan

  // console.log("ini array 2d", dataFilterPlot)
  const ScatterPlotFilter = () => {
    const [size, setSize] = useState({ width: 500, height: 500 });
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const zoomRef = useRef(null);
    const svgRootRef = useRef(null);
    const containerRef = useRef(null); // Ref untuk elemen kontainer

    const handleZoom = (scaleFactor) => {
      if (!zoomRef.current || !svgRootRef.current) return;

      const svg = svgRootRef.current;
      const currentTransform = d3.zoomTransform(svg.node());

      const newTransform = currentTransform.scale(scaleFactor);

      svg
        .transition()
        .duration(500)
        .call(zoomRef.current.transform, newTransform);
    };

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

      // Tambahkan elemen wrapper utama
      // 1. Hapus SVG lama
      d3.select("#scatterplot").select("svg").remove();

      // 2. Buat SVG baru
      const svgRoot = d3
        .select("#scatterplot")
        .append("svg")
        .attr("width", size.width)
        .attr("height", size.height)
        .attr("viewBox", `0 0 ${size.width} ${size.height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      svgRootRef.current = svgRoot; // Simpan referensi SVG root

      // 3. Tambahkan grup utama untuk margin
      const svg = svgRoot
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`);
      const yAxisGroup = svg.append("g");
      const gridGroup = svg.append("g");

      // 4. Buat kontainer grafik (semua elemen visual masuk sini)
      const container = svg.append("g"); // <<< Gunakan ini untuk transform
      containerRef.current = container.node(); // Simpan referensi kontainer

      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 8])
        .on("zoom", (event) => {
          const newXScale = event.transform.rescaleX(xScale);
          const newYScale = event.transform.rescaleY(yScale);

          xAxisGroup.call(d3.axisBottom(newXScale));
          yAxisGroup.call(d3.axisLeft(newYScale));

          // Update grid lines
          gridGroup.selectAll(".grid").remove(); // Clear old grid
          const xGrid = d3
            .axisBottom(newXScale)
            .ticks(10)
            .tickSize(-height)
            .tickFormat("");
          const yGrid = d3
            .axisLeft(newYScale)
            .ticks(10)
            .tickSize(-width)
            .tickFormat("");
          gridGroup
            .append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0, ${height})`)
            .call(xGrid);
          gridGroup.append("g").attr("class", "grid").call(yGrid);

          container.attr("transform", event.transform); // Zoom di sini
        });

      // Simpan ke ref agar bisa digunakan di luar useEffect
      zoomRef.current = zoom;
      svgRoot.call(zoom);

      // Terapkan zoom
      svgRoot.call(zoom);

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
      xAxisGroup.call(d3.axisBottom(xScale));

      // Add Y axis
      yAxisGroup.call(d3.axisLeft(yScale));

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

      gridGroup
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(xGrid);

      gridGroup.append("g").attr("class", "grid").call(yGrid);

      // Add circles for data points
      container
        .selectAll("text.icon")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "material-icons")
        .attr("x", (d) => xScale(d.x))
        .attr("y", (d) => yScale(d.y))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "24px")
        .attr("class", (d, i) =>
          i === selectedUserIndex
            ? "material-icons user-target"
            : "material-icons"
        )
        .attr("fill", (d, i) => {
          if (i === selectedUserIndex) return "black";
          if (nearestNeighbors.some((n) => n.index === i)) return "green";
          return "red";
        })
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "orange");

          container
            .append("text")
            .attr("x", xScale(d.x) + 10)
            .attr("y", yScale(d.y) - 10)
            .attr("class", "tooltip")
            .text(d.label);
        })
        .on("mouseout", function () {
          container.selectAll(".tooltip").remove();
          // Kembalikan warna ikon ke semula (opsional)
          const i = data.indexOf(d3.select(this).datum());
          d3.select(this).attr("fill", () => {
            if (i === selectedUserIndex) return "black";
            if (nearestNeighbors.some((n) => n.index === i)) return "green";
            return "red";
          });
        })
        .text((d, i) => {
          if (i === selectedUserIndex) return "adjust";
          if (nearestNeighbors.some((n) => n.index === i)) return "location_on";
          return "location_off";
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

      // Tambahkan garis dari titik merah ke titik hijau (tetangga terdekat)
      nearestNeighbors.forEach((neighbor) => {
        container
          .append("line")
          .attr("x1", xScale(data[selectedUserIndex].x))
          .attr("y1", yScale(data[selectedUserIndex].y))
          .attr("x2", xScale(data[neighbor.index].x))
          .attr("y2", yScale(data[neighbor.index].y))
          .attr("stroke", "gray")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4 2"); // optional: putar jadi putus-putus
      });

      // Add labels around each point
      // Add clearer labels around each point
      container
        .selectAll("text.label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => xScale(d.x))
        .attr("y", (d) => yScale(d.y) - 15) // Sedikit lebih jauh di atas titik
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px") // Lebih besar
        .attr("font-weight", "bold") // Tebal
        .attr("fill", "black")
        .style("paint-order", "stroke") // Agar lebih jelas
        .style("stroke-width", "3px")
        .style("stroke-linejoin", "round")
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
        const ellipse = container
          .append("ellipse")
          .attr("cx", xScale(centerX))
          .attr("cy", yScale(centerY))
          .attr("rx", xScale(centerX + radiusX) - xScale(centerX))
          .attr("ry", yScale(centerY - radiusY) - yScale(centerY))
          .attr("fill", "red")
          .attr("fill-opacity", 0.1)
          .attr("stroke", color)
          .attr("stroke-width", 2);

        if (id) ellipse.attr("id", id);
        return ellipse;
      };

      // ellipse red
      const redPoints = data.filter(
        (_, i) =>
          !nearestNeighbors.some((n) => n.index === i) &&
          i !== selectedUserIndex
      );

      redPoints.forEach((point) => {
        // Cek apakah sudah dimerge
        const closeGroup = mergedEllipses.find((group) =>
          group.some((p) => calculateDistance(p, point) < threshold)
        );

        if (closeGroup) {
          closeGroup.push(point);
        } else {
          mergedEllipses.push([point]);
        }
      });

      // Gambar 1 ellipse per grup
      mergedEllipses.forEach((group, index) => {
        const xMin = d3.min(group, (d) => d.x);
        const xMax = d3.max(group, (d) => d.x);
        const yMin = d3.min(group, (d) => d.y);
        const yMax = d3.max(group, (d) => d.y);

        const centerX = (xMin + xMax) / 2;
        const centerY = (yMin + yMax) / 2;
        const radiusX = (xMax - xMin) / 2 + 0.1;
        const radiusY = (yMax - yMin) / 2 + 0.1;

        drawEllipse(
          centerX,
          centerY,
          radiusX,
          radiusY,
          "red",
          `ellipse-${index}`
        );
      });
      const mask = svgRoot
        .append("defs")
        .append("mask")
        .attr("id", "ellipse-mask");

      // Mask background (full visibility)
      mask
        .append("rect")
        .attr("width", size.width)
        .attr("height", size.height)
        .attr("fill", "white");

      // Mask out red ellipses
      redPoints.forEach((point) => {
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

        yellowEllipse = container
          .append("ellipse")
          .attr("cx", xScale(centerX))
          .attr("cy", yScale(centerY))
          .attr("rx", xScale(centerX + radiusX) - xScale(centerX))
          .attr("ry", yScale(centerY - radiusY) - yScale(centerY))
          .attr("fill", "green")
          .attr("fill-opacity", 0.1)
          .attr("stroke", "green")
          .attr("stroke-width", 2)
          .attr("mask", "url(#ellipse-mask)");

        // Add outline for the "cut-off" regions
        redPoints.forEach((point) => {
          container
            .append("ellipse")
            .attr("cx", xScale(point.x))
            .attr("cy", yScale(point.y))
            .attr("rx", xScale(point.x + 0.15) - xScale(point.x))
            .attr("ry", yScale(point.y - 0.15) - yScale(point.y))
            .attr("fill", "none")
            // .attr("stroke", "red")
            .attr("stroke-width", 2);
        });
      }
    }, [size]); // Re-run on size change
    return (
      <>
        <div className="relative w-full h-[500px]">
          <div className="absolute top-2 right-2 flex gap-2 bg-white/80 rounded-lg p-2 z-10">
            <button onClick={() => handleZoom(1.2)} className="p-1">
              <ZoomInIcon fontSize="small" />
            </button>
            <button onClick={() => handleZoom(0.8)} className="p-1">
              <ZoomOutIcon fontSize="small" />
            </button>
          </div>
          <div id="scatterplot" className="w-full h-full" />
        </div>
        <KeteranganScatterPlotFilter opsional={opsional} />
        {/* <div id="scatterplot" style={{ margin: "0 auto" }} /> */}
      </>
    );
  };

  return (
    <div className="flex flex-col my-5 font-poppins items-center mx-auto w-full max-w-full">
      <ScatterPlotFilter />
      <ExplanationSectionScatterPlotFilter opsional={opsional} />
    </div>
  );
}
