import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function HeatMapVisualDataSim({ opsional, result, similarity }) {
  const RenderingHeatMap = () => {
    const similarityDataHeatMap = result["similarity"];

    useEffect(() => {
      d3.select("#heatmap").select("svg").remove();
      d3.select("#colorbar").select("svg").remove();

      const cellSize = 80;
      const numCells = similarityDataHeatMap.length;

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = cellSize * numCells;
      const height = cellSize * numCells;

      const usersIndex = Array.from(
        { length: numCells },
        (_, i) => `${opsional === "user-based" ? "user" : "item"}-${i + 1}`
      );

      const svg = d3
        .select("#heatmap")
        .append("svg")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
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
        .domain(
          similarity === "Adjusted Cosine" ||
            similarity === "Pearson Correlation Coefficient"
            ? [-1, 0, 1]
            : [0, 0.5, 1]
        )
        .range(["#68FF64", "#69b3a2", "#6A5AE0"]);

      svg
        .append("g")
        .selectAll("rect")
        .data(similarityDataHeatMap.flat())
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(usersIndex[i % numCells]))
        .attr("y", (d, i) => y(usersIndex[Math.floor(i / numCells)]))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d));

      svg
        .append("g")
        .selectAll("text")
        .data(similarityDataHeatMap.flat())
        .enter()
        .append("text")
        .attr("x", (d, i) => x(usersIndex[i % numCells]) + x.bandwidth() / 2)
        .attr(
          "y",
          (d, i) => y(usersIndex[Math.floor(i / numCells)]) + y.bandwidth() / 2
        )
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text((d) => d.toFixed(4))
        .attr("fill", "black")
        .style(
          "font-size",
          `${Math.min(x.bandwidth(), y.bandwidth()) * 0.2}px`
        );

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      // COLOR BAR
      const colorBarWidth = 20;
      const colorBarSvg = d3
        .select("#colorbar")
        .append("svg")
        .attr(
          "viewBox",
          `0 0 ${colorBarWidth + 70} ${height + margin.top + margin.bottom}`
        )
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
        .append("g")
        .attr("transform", `translate(20, ${margin.top})`);

      let colorScaleBar;
      let gradient;

      if (
        similarity === "Adjusted Cosine" ||
        similarity === "Pearson Correlation Coefficient"
      ) {
        colorScaleBar = d3.scaleLinear().range([height, 0]).domain([-1, 1]);

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
          .attr("style", "stop-color: #68FF64; stop-opacity: 1");
      } else {
        colorScaleBar = d3.scaleLinear().range([height, 0]).domain([0, 1]);

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
      }

      colorBarSvg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", colorBarWidth)
        .attr("height", height)
        .style("fill", "url(#gradient)");

      colorBarSvg
        .append("g")
        .attr("transform", `translate(${colorBarWidth}, 0)`)
        .call(
          d3.axisRight(colorScaleBar).ticks(3).tickFormat(d3.format(".1f"))
        );
    }, [similarityDataHeatMap, similarity]);

    return (
      <div className="flex justify-center w-full mb-5 md:flex-row flex-wrap">
        <div
          id="heatmap"
          className="flex justify-center items-center overflow-auto"
        />
        <div
          id="colorbar"
          className="mt-5 md:mt-0 md:ml-4 w-[60px] max-w-full"
          style={{ display: "flex", justifyContent: "center" }}
        />
      </div>
    );
  };

  const ExplanationSectionHeatMap = () => {
    const [isExpanded, setIsExpanded] = useState(false);

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
