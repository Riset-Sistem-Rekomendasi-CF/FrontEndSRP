import React, { useRef, useMemo, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import ChartDataLabels from "chartjs-plugin-datalabels";

import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { Explanation } from "./KomponenChartPlot2D/Explanation";
import { AreaColors } from "./KomponenChartPlot2D/AreaColors";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

ChartJS.register(annotationPlugin, zoomPlugin, ChartDataLabels);

export default function ChartJsScatter2D({ result, opsional }) {
  const chartRef = useRef(null);
  const similarityData = result["reduced-data"];
  // for zoom reset
  const [isZoomed, setIsZoomed] = useState(false);

  const scatterPoints = useMemo(() => {
    return similarityData.map((row, index) => ({
      x: row[0],
      y: row[1],
      id: index + 1,
      label: `${opsional === "user-based" ? "User" : "Item"}-${index + 1}`,
    }));
  }, [similarityData, opsional]);

  const closePointIds = useMemo(() => {
    const threshold = 0.5;
    const closeIds = new Set();

    for (let i = 0; i < scatterPoints.length; i++) {
      for (let j = i + 1; j < scatterPoints.length; j++) {
        const dx = scatterPoints[i].x - scatterPoints[j].x;
        const dy = scatterPoints[i].y - scatterPoints[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          closeIds.add(scatterPoints[i].id);
          closeIds.add(scatterPoints[j].id);
        }
      }
    }
    return closeIds;
  }, [scatterPoints]);

  const sortPointsClockwise = (points) => {
    const center = {
      x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
      y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
    };

    return [...points].sort((a, b) => {
      const angleA = Math.atan2(a.y - center.y, a.x - center.x);
      const angleB = Math.atan2(b.y - center.y, b.x - center.x);
      return angleA - angleB;
    });
  };

  const clusterAreas = useMemo(() => {
    // untuk trehold 0.5
    // Union-Find
    const threshold = 0.5;
    const clusters = [];
    const visited = new Set();

    for (let i = 0; i < scatterPoints.length; i++) {
      if (visited.has(i)) continue;

      const cluster = [scatterPoints[i]];
      visited.add(i);

      for (let j = i + 1; j < scatterPoints.length; j++) {
        if (visited.has(j)) continue;
        const dx = scatterPoints[i].x - scatterPoints[j].x;
        const dy = scatterPoints[i].y - scatterPoints[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold) {
          cluster.push(scatterPoints[j]);
          visited.add(j);
        }
      }

      if (cluster.length > 1) {
        const ordered = sortPointsClockwise(cluster);
        ordered.push(ordered[0]); // close loop
        clusters.push(ordered);
      }
    }

    return clusters;
  }, [scatterPoints]);

  const xMin = Math.min(...scatterPoints.map((p) => p.x)) - 1;
  const xMax = Math.max(...scatterPoints.map((p) => p.x)) + 1;
  const yMin = Math.min(...scatterPoints.map((p) => p.y)) - 1;
  const yMax = Math.max(...scatterPoints.map((p) => p.y)) + 1;

  const data = useMemo(
    () => ({
      datasets: [
        // 🔵 Main points (User atau Item)
        {
          label: `Kumpulan ${opsional === "user-based" ? "User" : "Item"}`,
          data: scatterPoints,
          backgroundColor: (ctx) => {
            const point = ctx.raw;
            return closePointIds.has(point.id)
              ? "rgba(54, 162, 235, 0.9)" // Warna lebih cerah untuk highlight
              : "rgba(255, 99, 132, 0.6)"; // Warna default
          },
          borderColor: (ctx) => {
            const point = ctx.raw;
            return closePointIds.has(point.id)
              ? "rgba(54, 162, 235, 1)" // Border biru untuk highlight
              : "rgba(255, 99, 132, 1)"; // Border merah untuk lainnya
          },
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 10,
          datalabels: {
            align: "top",
            anchor: "end",
            color: "#111",
            font: {
              size: 11,
              weight: "bold",
            },
            formatter: (value) => value.label,
          },
        },

        // 🟨 Cluster area (filled polygon)
        ...clusterAreas.map((cluster, idx) => ({
          label: `Area ${idx + 1}`,
          data: cluster,
          type: "line",
          borderColor: AreaColors[idx % AreaColors.length].border,
          backgroundColor: AreaColors[idx % AreaColors.length].background,
          borderWidth: 3,
          fill: true, // bikin area tertutup
          pointRadius: 0,
          tension: 0.3,
          clip: false,
          datalabels: {
            display: false,
          },
        })),

        // 🔷 Highlight titik yang berdekatan (overlay dengan border lebih besar)
        {
          label: "Titik Terdekat",
          data: scatterPoints.filter((p) => closePointIds.has(p.id)),
          backgroundColor: "rgba(54, 162, 235, 0.4)", // semi transparan biru muda
          borderColor: "rgba(54, 162, 235, 1)", // border biru tegas
          borderWidth: 3,
          pointRadius: 10,
          pointHoverRadius: 14,
          showLine: false,
          datalabels: {
            display: false,
          },
        },
      ],
    }),
    [scatterPoints, closePointIds, clusterAreas, opsional]
  );

  const closePairs = useMemo(() => {
    const pairs = [];
    const threshold = 0.5;

    for (let i = 0; i < scatterPoints.length; i++) {
      for (let j = i + 1; j < scatterPoints.length; j++) {
        const pointA = scatterPoints[i];
        const pointB = scatterPoints[j];

        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold) {
          pairs.push({
            label1: pointA.label,
            label2: pointB.label,
            distance: dist.toFixed(3),
            x1: pointA.x,
            y1: pointA.y,
            x2: pointB.x,
            y2: pointB.y,
          });
        }
      }
    }

    return pairs;
  }, [scatterPoints]);

  const options = useMemo(
    () => ({
      responsive: true,
      scales: {
        x: { type: "linear", position: "bottom", min: xMin, max: xMax },
        y: { type: "linear", position: "left", min: yMin, max: yMax },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const label =
                data.datasets[tooltipItem.datasetIndex].data[
                  tooltipItem.dataIndex
                ].label;
              return `${label} - (${tooltipItem.raw.x.toFixed(
                2
              )}, ${tooltipItem.raw.y.toFixed(2)})`;
            },
          },
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            filter: (legendItem) =>
              legendItem.text !== "Nearby Points Highlight",
          },
        },

        datalabels: {
          display: true,
          align: "right",
          anchor: "end",
          color: "black",
          font: {
            size: 10,
            weight: "bold",
          },
          formatter: (value) => value.label,
        },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "xy",
          },
          limits: {
            x: { min: xMin, max: xMax },
            y: { min: yMin, max: yMax },
          },
          onZoomComplete: ({ chart }) => {
            setIsZoomed(true); // ✅ Selalu aktifkan saat zoom
          },
          onPanComplete: ({ chart }) => {
            setIsZoomed(true); // ✅ Pan juga trigger zoom aktif
          },
        },
      },
    }),
    [xMin, xMax, yMin, yMax, data]
  );

  const handleZoomIn = () => {
    const chart = chartRef.current;
    if (chart) chart.zoom(1.2);
  };

  const handleZoomOut = () => {
    const chart = chartRef.current;
    if (chart) chart.zoom(0.8);
  };

  const handleResetZoom = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.resetZoom();
      setIsZoomed(false);
    }
  };

  return (
    <div className="flex flex-col my-5 font-poppins items-center relative">
      <div className="w-full h-96 p-4 rounded-lg mb-5 relative">
        <div className="absolute top-1 right-1 z-10 flex gap-2 bg-white/80 rounded-lg p-1 mr-5">
          {isZoomed && (
            <IconButton
              size="small"
              onClick={handleResetZoom}
              aria-label="Reset Zoom"
              title="Reset Zoom"
              style={{
                opacity: isZoomed ? 1 : 0.3,
                pointerEvents: isZoomed ? "auto" : "none",
              }}
            >
              <CenterFocusStrongIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={handleZoomIn} aria-label="Zoom In">
            <ZoomInIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleZoomOut}
            aria-label="Zoom Out"
          >
            <ZoomOutIcon />
          </IconButton>
        </div>

        <Scatter
          key={JSON.stringify(scatterPoints)}
          data={data}
          options={options}
          ref={chartRef}
        />
      </div>
      <Explanation closePairs={closePairs} opsional={opsional} />
    </div>
  );
}
