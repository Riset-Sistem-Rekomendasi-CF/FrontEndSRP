import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function HeatMapVisualDataSim({ opsional, result, similarity }) {
  const RenderingHeatMap = () => {
    const similarityDataHeatMap = result["similarity"];
    const [scale, setScale] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);
    const heatmapWrapperRef = useRef(null);

    const handleZoomIn = () => {
      setScale((prev) => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
      setScale((prev) => Math.max(prev - 0.2, 0.5));
    };

    const handleReset = () => {
      setScale(1);
    };

    const handleFullscreen = () => {
      if (!isFullscreen) {
        if (containerRef.current?.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      };
    }, []);

    useEffect(() => {
      d3.select("#heatmap").select("svg").remove();
      d3.select("#colorbar").select("svg").remove();

      const numCells = similarityDataHeatMap.length;

      // Responsive cell size based on screen width
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;
      const baseCellSize = isMobile ? 50 : isTablet ? 65 : 80;
      const cellSize = baseCellSize;

      const margin = { top: 30, right: 20, bottom: 50, left: 60 };
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
        .style("max-width", "100%")
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

      // Draw cells
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
        .attr("fill", (d) => colorScale(d))
        .attr("rx", 4)
        .attr("ry", 4)
        .style("stroke", "#fff")
        .style("stroke-width", 2);

      // Draw text labels
      const fontSize = Math.min(x.bandwidth(), y.bandwidth()) * 0.18;
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
        .attr("fill", "#1a1a1a")
        .style("font-size", `${fontSize}px`)
        .style("font-weight", "600");

      // X axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", isMobile ? "10px" : "12px")
        .style("font-weight", "500");

      // Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", isMobile ? "10px" : "12px")
        .style("font-weight", "500");

      // COLOR BAR
      const colorBarWidth = 25;
      const colorBarHeight = Math.min(height, 300);

      const colorBarSvg = d3
        .select("#colorbar")
        .append("svg")
        .attr("viewBox", `0 0 ${colorBarWidth + 60} ${colorBarHeight + 40}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("max-width", "80px")
        .style("height", "auto")
        .append("g")
        .attr("transform", `translate(10, 20)`);

      let colorScaleBar;
      let gradient;

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
          .attr("id", "gradient-heatmap")
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color: #6A5AE0; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "50%")
          .attr("style", "stop-color: #69b3a2; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color: #68FF64; stop-opacity: 1");
      } else {
        colorScaleBar = d3
          .scaleLinear()
          .range([colorBarHeight, 0])
          .domain([0, 1]);

        gradient = colorBarSvg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient-heatmap")
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color: #6A5AE0; stop-opacity: 1");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color: #68FF64; stop-opacity: 1");
      }

      colorBarSvg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", colorBarWidth)
        .attr("height", colorBarHeight)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", "url(#gradient-heatmap)");

      colorBarSvg
        .append("g")
        .attr("transform", `translate(${colorBarWidth}, 0)`)
        .call(d3.axisRight(colorScaleBar).ticks(5).tickFormat(d3.format(".1f")))
        .selectAll("text")
        .style("font-size", "11px");
    }, [similarityDataHeatMap]);

    return (
      <div
        ref={containerRef}
        className={`flex flex-col items-center w-full ${
          isFullscreen ? "bg-white p-4" : ""
        }`}
      >
        {/* Zoom Controls */}
        <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-gray-100 rounded-lg shadow-sm">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all"
            title="Zoom Out"
          >
            <ZoomOutIcon className="text-gray-700" fontSize="small" />
          </button>

          <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all"
            title="Zoom In"
          >
            <ZoomInIcon className="text-gray-700" fontSize="small" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all"
            title="Reset Zoom"
          >
            <RestartAltIcon className="text-gray-700" fontSize="small" />
          </button>

          <button
            onClick={handleFullscreen}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <FullscreenExitIcon className="text-gray-700" fontSize="small" />
            ) : (
              <FullscreenIcon className="text-gray-700" fontSize="small" />
            )}
          </button>
        </div>

        {/* Heatmap Container */}
        <div
          ref={heatmapWrapperRef}
          className="flex flex-col sm:flex-row justify-start items-start gap-4 w-full p-4 "
        >
          {/* Scrollable Heatmap Area */}
          <div
            className="overflow-auto flex-1 border rounded-lg bg-white"
            style={{
              maxHeight: isFullscreen ? "75vh" : "450px",
              maxWidth: "100%",
            }}
          >
            <div
              id="heatmap"
              className="inline-block p-4"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                minWidth: scale > 1 ? `${280 * scale}px` : "280px",
              }}
            />
          </div>

          {/* Color Bar - Fixed position */}
          <div
            id="colorbar"
            className="flex justify-center items-start flex-shrink-0 sticky top-0"
            style={{
              minWidth: "70px",
            }}
          />
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-500 mt-3 text-center">
          {scale > 1
            ? "Scroll untuk melihat seluruh heatmap"
            : "Gunakan tombol zoom untuk memperbesar"}
        </p>
      </div>
    );
  };

  const ExplanationSectionHeatMap = () => {
    return (
      <div className="mt-6 text-justify max-w-xl w-full px-4 sm:px-0">
        <h2 className="text-sm sm:text-lg md:text-xl text-center font-bold mb-3">
          Cara Membaca Heatmap Hasil Similaritas
        </h2>

        <p className="text-sm mb-2">
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

        <p className="text-sm mb-2">
          Dalam heatmap ini, setiap sel mewakili pasangan{" "}
          <span className="italic">user</span> atau{" "}
          <span className="italic">item</span>, dan nilai di dalam sel tersebut
          menggambarkan tingkat kemiripan antara keduanya. Semakin terang atau
          gelap warna yang ditampilkan, semakin mudah kita mengetahui tingkat
          kesamaan antara dua entitas tersebut.
        </p>

        {/* Color Legend */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Keterangan Warna:</h3>
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-[#6A5AE0]"></span>
              <span>
                {similarity === "Adjusted Cosine" ||
                similarity === "Pearson Correlation Coefficient"
                  ? "1 (Sangat Mirip)"
                  : "1 (Sangat Mirip)"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-[#69b3a2]"></span>
              <span>
                {similarity === "Adjusted Cosine" ||
                similarity === "Pearson Correlation Coefficient"
                  ? "0 (Netral)"
                  : "0.5 (Sedang)"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-[#68FF64]"></span>
              <span>
                {similarity === "Adjusted Cosine" ||
                similarity === "Pearson Correlation Coefficient"
                  ? "-1 (Berlawanan)"
                  : "0 (Tidak Mirip)"}
              </span>
            </div>
          </div>
        </div>
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
