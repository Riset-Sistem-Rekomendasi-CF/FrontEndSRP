import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function HeatMapVisualDataSim({ opsional, result, similarity }) {
  const RenderingHeatMap = () => {
    const similarityDataHeatMap = result["similarity"];

    useEffect(() => {
      // Clear previous SVG if present
      d3.select("#heatmap").select("svg").remove();
      d3.select("#colorbar").select("svg").remove();

      const size = 400; // Default size for heatmap (will be scaled)
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = size - margin.left - margin.right;
      const height = size - margin.top - margin.bottom;

      const usersIndex = Array.from(
        { length: similarityDataHeatMap.length },
        (_, i) => `${opsional === "user-based" ? "user" : "item"}-${i + 1}`
      );

      // SVG container setup
      const svg = d3
        .select("#heatmap")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${size} ${size}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(usersIndex)
        .padding(0.05);

      const y = d3
        .scaleBand()
        .range([height, 0])
        .domain(usersIndex)
        .padding(0.05);

      const colorScale = d3
        .scaleLinear()
        .range(["#69b3a2", "#6A5AE0", "#FCC822"]);

      // Adding rectangles for heatmap cells
      svg
        .append("g")
        .selectAll("rect")
        .data(similarityDataHeatMap.flat())
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(usersIndex[i % usersIndex.length]))
        .attr("y", (d, i) => y(usersIndex[Math.floor(i / usersIndex.length)]))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d));

      // Add text inside cells to display values
      svg
        .append("g")
        .selectAll("text")
        .data(similarityDataHeatMap.flat())
        .enter()
        .append("text")
        .attr(
          "x",
          (d, i) => x(usersIndex[i % usersIndex.length]) + x.bandwidth() / 2
        )
        .attr(
          "y",
          (d, i) =>
            y(usersIndex[Math.floor(i / usersIndex.length)]) + y.bandwidth() / 2
        )
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text((d) => d.toFixed(4))
        .attr("fill", "black")
        .style("font-size", (d, i) => {
          const cellWidth = x.bandwidth();
          const cellHeight = y.bandwidth();
          const fontSize = Math.min(cellWidth, cellHeight) * 0.2;
          return `${fontSize}px`;
        });

      // Add axes to the heatmap
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      // Color Bar setup
      const colorBarWidth = 20;
      const colorBarHeight = height;

      const colorBarSvg = d3
        .select("#colorbar")
        .append("svg")
        .attr("width", colorBarWidth + 70)
        .attr("height", colorBarHeight + 40)
        .append("g")
        .attr("transform", `translate(20, 20)`);

      let colorScaleBar;
      let gradient;

      // Check the similarity type and define color scale
      if (
        similarity === "Adjusted Cosine" ||
        similarity === "Pearson Correlation Coefficient"
      ) {
        colorScaleBar = d3
          .scaleLinear()
          .range([colorBarHeight, 0])
          .domain([-1, 1]);

        gradient = colorBarSvg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color: #6A5AE0 ; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "50%")
          .attr("style", "stop-color: #69b3a2; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color: #FCC822; stop-opacity: 1");
      } else if (
        similarity === "Cosine" ||
        similarity === "Bhattacharyya Coefficient"
      ) {
        colorScaleBar = d3
          .scaleLinear()
          .range([colorBarHeight, 0])
          .domain([0, 1]);

        gradient = colorBarSvg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color: #6A5AE0 ; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color: #69b3a2; stop-opacity: 1");
      } else {
        // Default fallback color scale
        colorScaleBar = d3
          .scaleLinear()
          .range([colorBarHeight, 0])
          .domain([0, 1]);
      }

      // Apply the gradient as the fill for the color bar
      colorBarSvg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", colorBarWidth)
        .attr("height", colorBarHeight)
        .style("fill", "url(#gradient)"); // Apply the gradient here

      // Create color bar axis if colorScaleBar is defined
      if (colorScaleBar) {
        const colorBarAxis = d3
          .axisRight(colorScaleBar)
          .ticks(3)
          .tickFormat(d3.format(".1f"));

        colorBarSvg
          .append("g")
          .attr("transform", `translate(${colorBarWidth}, 0)`)
          .call(colorBarAxis);
      }
    }, [similarityDataHeatMap, similarity]);

    return (
      <div className="flex justify-center w-full mb-5 md:flex-row md:w-1/2">
        <div
          id="heatmap"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        />
        <div
          id="colorbar"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginLeft: "10px",
            height: "100%", // Ensure colorbar is responsive
          }}
        />
      </div>
    );
  };

  const ExplanationSectionHeatMap = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Fungsi untuk toggle teks
    const toggleText = () => setIsExpanded(!isExpanded);

    return (
      <div className="mt-6 text-justify max-w-xl w-full px-4 sm:px-0">
        <h2 className="text-sm sm:text-lg md:text-xl text-center font-bold mb-3">
          Cara Membaca Heatmap Hasil Similaritas
        </h2>

        <p className={`text-sm mb-2`}>
          <a
            className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            HeatMap
          </a>{" "}
          ini digunakan untuk memvisualisasikan tingkat kemiripan antara{" "}
          <span className="italic">{opsional}</span> berdasarkan data. Setiap
          sel dalam heatmap menunjukkan nilai kemiripan antara dua entitas,
          dengan skala warna yang membantu agar cepat memahami seberapa mirip
          atau tidak mirip dua entitas tersebut.
        </p>

        <p className={`text-sm mb-2`}>
          Dalam heatmap ini, setiap sel mewakili pasangan{" "}
          <span className="italic">user</span> atau{" "}
          <span className="italic">item</span>, dan nilai di dalam sel tersebut
          menggambarkan tingkat kemiripan antara keduanya. Semakin terang atau
          gelap warna yang ditampilkan, semakin mudah kita mengetahui tingkat
          kesamaan antara dua entitas tersebut.
        </p>
      </div>
    );
  };
  return (
    <div className="flex flex-col my-5 font-poppins items-center">
      <RenderingHeatMap />
      <ExplanationSectionHeatMap />
    </div>
  );
}
