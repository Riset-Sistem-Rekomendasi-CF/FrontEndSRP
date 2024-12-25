import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function HeatMapVisualDataSim({ opsional, result, similarity }) {
  const RenderingHeatMap = () => {
    const similarityDataHeatMap = result["similarity"];
    // const similarity = result["similarityType"];  // Asumsi similarityType adalah properti di data result

    // Tentukan rentang color scale berdasarkan jenis similarity
    const similarityList =
      similarity === "Adjusted Vector Cosine" ||
      similarity === "Pearson Correlation Coefficient"
        ? [0, 1] // Rentang untuk similarity tipe ini
        : [1, 0, -1]; // Rentang untuk similarity tipe lain

    useEffect(() => {
      // Clear previous SVG if present
      d3.select("#heatmap").select("svg").remove();
      d3.select("#colorbar").select("svg").remove();

      const size = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = size - margin.left - margin.right;
      const height = size - margin.top - margin.bottom;

      // Define the user labels
      const usersIndex = Array.from(
        { length: similarityDataHeatMap.length },
        (_, i) => {
          return `${opsional === "user-based" ? "user" : "item"}-${i + 1}`;
        }
      );

      // Create the SVG element
      const svg = d3
        .select("#heatmap")
        .append("svg")
        .attr("width", size)
        .attr("height", size)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create scales for x and y axes
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

      // Create color scale based on similarity
      const colorScale = d3
        .scaleLinear()
        .range(["#69b3a2", "#6A5AE0", "#FCC822"]) // Warna yang digunakan di heatmap
        .domain(similarityList); // Adjust domain based on similarity type

      // Create tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "white")
        .style("border", "1px solid black")
        .style("padding", "5px")
        .style("border-radius", "3px")
        .style("pointer-events", "none");

      // Append the heatmap cells
      svg
        .append("g")
        .selectAll("rect")
        .data(similarityDataHeatMap.flat())
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(usersIndex[i % usersIndex.length])) // Map to user labels
        .attr("y", (d, i) => y(usersIndex[Math.floor(i / usersIndex.length)])) // Map to user labels
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d))
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").text(`Value: ${d.toFixed(4)}`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      // Append text labels inside the cells
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
          const fontSize = Math.min(cellWidth, cellHeight) * 0.2; // Adjust font size based on cell size
          return `${fontSize}px`;
        });

      // Append x and y axes
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      // Create Color Bar
      const colorBarWidth = 20;
      const colorBarHeight = height;

      const colorBarSvg = d3
        .select("#colorbar")
        .append("svg")
        .attr("width", colorBarWidth + 70)
        .attr("height", colorBarHeight + 40)
        .append("g")
        .attr("transform", `translate(20, 20)`);

      // Define the gradient for the color bar
      const gradient = colorBarSvg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%");

      // Set the gradient stops based on the domain of 1, 0, -1 or 0, 1
      if (JSON.stringify(similarityList) === JSON.stringify([1, 0, -1])) {
        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#69b3a2") // Color for 0
          .attr("stop-opacity", 1);

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#FCC822") // Color for 1
          .attr("stop-opacity", 1);
      } else {
        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#69b3a2") // Color for 1
          .attr("stop-opacity", 1);

        gradient
          .append("stop")
          .attr("offset", "50%")
          .attr("stop-color", "#6A5AE0") // Color for 0
          .attr("stop-opacity", 1);

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#FCC822") // Color for -1
          .attr("stop-opacity", 1);
      }

      // Create the color bar rectangle
      colorBarSvg
        .append("rect")
        .attr("width", colorBarWidth)
        .attr("height", colorBarHeight)
        .attr("fill", "url(#gradient)");

      // Define the color scale for the color bar
      const colorScaleBar = d3
        .scaleLinear()
        .range([0, colorBarHeight]) // Maps 1 to top and -1 to bottom
        .domain(similarityList); // Adjust the domain

      // Create the axis for the color bar with ticks
      const colorBarAxis = d3
        .axisRight(colorScaleBar)
        .ticks(3) // Create 3 ticks at -1, 0, and 1 or 0 and 1
        .tickFormat(d3.format(".1f")); // Format the ticks to show one decimal place

      // Append the axis to the color bar
      colorBarSvg
        .append("g")
        .attr("transform", `translate(${colorBarWidth}, 0)`)
        .call(colorBarAxis);
    }, [similarityDataHeatMap, similarity]);

    return (
      <div className="flex justify-center">
        <div
          id="heatmap"
          style={{ display: "flex", justifyContent: "center" }}
        />
        <div id="colorbar" style={{ marginLeft: "10px" }} />
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

        <p className={`text-sm mb-2 ${isExpanded ? "" : "line-clamp-3"}`}>
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

        <p className={`text-sm mb-2 ${isExpanded ? "" : "line-clamp-3"}`}>
          Dalam heatmap ini, setiap sel mewakili pasangan{" "}
          <span className="italic">user</span> atau{" "}
          <span className="italic">item</span>, dan nilai di dalam sel tersebut
          menggambarkan tingkat kemiripan antara keduanya. Semakin terang atau
          gelap warna yang ditampilkan, semakin mudah kita mengetahui tingkat
          kesamaan antara dua entitas tersebut.
        </p>

        {/* Tampilkan tombol jika teks belum lengkap */}
        {!isExpanded && (
          <button
            className="text-card_blue_primary mt-2 text-sm"
            onClick={toggleText}
          >
            Baca Selengkapnya
          </button>
        )}

        {/* Tombol untuk menutup teks */}
        {isExpanded && (
          <button
            className="text-card_blue_primary mt-2 text-sm"
            onClick={toggleText}
          >
            Tampilkan Lebih Sedikit
          </button>
        )}
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
