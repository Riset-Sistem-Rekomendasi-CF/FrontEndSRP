import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { NewReleases } from "@mui/icons-material";

export function ScatterPlotDataFilter({ opsional, topSimilarities, result, rowIndex, colIndex, kValue }) {
    const similarityDataFilter = result['reduced-data'];

    // const FindTopSimInPlot = result['similarity'].map((row, colIndex)){
    //
    //     // yang digunakan untuk titik terdekat yang digunakan
    //     const isTopSimilarity = topSimilarities.some(top => top.index === colIndex);
    //
    // }


    // Mengubah objek menjadi array 2D
    const dataFilterPlot = Object.entries(similarityDataFilter).map(([key, value]) => [parseFloat(key), parseFloat(value)]);
    // console.log("ini array 2d", dataFilterPlot)
    const ScatterPlotFilter = () => {
        // State untuk ukuran plot, bisa dikelola secara terpisah di masing-masing komponen
        const [size] = useState(400);
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = size - margin.left - margin.right;
        const height = size - margin.top - margin.bottom;

        // Data untuk scatter plot, disesuaikan dengan kebutuhan
        const data = dataFilterPlot.map((row, index) => ({
            x: row[0],
            y: row[1],
            label: `${opsional === "user-based" ? "user" : "item"}-${index + 1} `
        }));

        useEffect(() => {
            // Clear previous SVG if present
            d3.select('#scatterplot').select('svg').remove();

            // Buat SVG baru
            const svg = d3.select('#scatterplot')
                .append('svg')
                .attr('width', size)
                .attr('height', size)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Fungsi untuk menghitung jarak Euclidean
            const calculateDistance = (d1, d2) => Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));

            // Pemilihan user atau item untuk analisis
            const selectedUserIndex = opsional === "user-based" ? rowIndex : colIndex;

            // Menghitung jarak dari titik yang dipilih
            const distances = data.map((d, i) => {
                console.log(d);

                return ({
                    index: i,
                    distance: calculateDistance(data[selectedUserIndex], d)
                })
            })

            // Menggabungkan distance dengan Top Similarity
            const distanceTopSimilarity = distances.filter((v) => {
                for (let i = 0; i < topSimilarities.length; i++) {
                    if (topSimilarities[i].index === v.index)
                        return topSimilarities[i].index === v.index
                }
            })

            // Mengurutkan dan memilih 2 tetangga terdekat
            const nearestNeighbors = distanceTopSimilarity
                .filter(d => d.index !== selectedUserIndex) // Menghapus user yang dipilih dari daftar
                .sort((a, b) => a.distance - b.distance)
            // .slice(0, kValue); // Ambil 2 tetangga terdekat

            console.log("nearest", nearestNeighbors);


            // Membuat skala untuk sumbu X dan Y
            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x))
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y))
                .range([height, 0]);

            // Menambahkan sumbu X
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

            // Menambahkan sumbu Y
            svg.append('g')
                .call(d3.axisLeft(yScale));

            // Menambahkan garis grid
            const xGrid = d3.axisBottom(xScale)
                .ticks(10)
                .tickSize(-height)
                .tickFormat('');

            const yGrid = d3.axisLeft(yScale)
                .ticks(10)
                .tickSize(-width)
                .tickFormat('');

            svg.append('g')
                .attr('class', 'grid')
                .attr('transform', `translate(0, ${height})`)
                .call(xGrid);

            svg.append('g')
                .attr('class', 'grid')
                .call(yGrid);

            // Menambahkan titik-titik ke scatter plot
            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', 5)
                .attr('fill', (d, i) => {
                    if (i === selectedUserIndex) return 'red'; // Warna untuk user yang dipilih
                    if (nearestNeighbors.some(n => n.index === i)) return 'green'; // Warna untuk tetangga terdekat
                    return 'steelblue'; // Warna default
                })
                .on('mouseover', (event, d) => {
                    d3.select(this).attr('fill', 'orange'); // Ubah warna saat hover
                    svg.append('text')
                        .attr('x', xScale(d.x) + 10)
                        .attr('y', yScale(d.y) - 10)
                        .attr('class', 'tooltip')
                        .text(d.label);
                })
                .on('mouseout', function () {
                    svg.selectAll('.tooltip').remove(); // Hapus tooltip saat mouseout
                });

            // Menambahkan garis dari titik origin (0,0) ke setiap titik
            data.forEach(d => {
                svg.append('line')
                    .attr('x1', xScale(0))
                    .attr('y1', yScale(0))
                    .attr('x2', xScale(d.x))
                    .attr('y2', yScale(d.y))
                    .attr('stroke', 'red')
                    .attr('stroke-width', 1);
            });

            // Menambahkan label di sekitar setiap titik
            svg.selectAll('text.label')
                .data(data)
                .enter()
                .append('text')
                .attr('x', d => xScale(d.x))
                .attr('y', d => yScale(d.y) - 10) // Posisi label sedikit di atas titik
                .attr('class', 'label')
                .attr('text-anchor', 'middle')  // Rata tengah horizontal
                .attr('font-size', '12px')
                .attr('fill', 'black')
                .text(d => d.label);

        }, []); // eslint-disable-line

        return (
            <>
                <div id="scatterplot" style={{ margin: '0 auto' }} />
                <div className="mt-6 text-center w-full">
                    <p className="font-semibold text-lg sm:text-xl mb-4">Keterangan:</p>
                    <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4 justify-center px-4">
                        <li className="flex items-center text-sm sm:text-base">
                            <div className="w-5 h-5 rounded-full bg-red-500 border border-1 border-black mr-2"></div>
                            Titik target
                        </li>
                        <li className="flex items-center text-sm sm:text-base">
                            <div className="w-5 h-5 rounded-full bg-green-500 border border-1 border-black mr-2"></div>
                            Titik tetangga terdekat
                        </li>
                    </ul>
                </div>
            </>
        );
    };


    const ExplanationSectionScatterPlotFilter = () => {
        const [isExpanded, setIsExpanded] = useState(false);

        // Fungsi untuk toggle teks
        const toggleText = () => setIsExpanded(!isExpanded);

        return (
            <div className="mt-6 text-justify max-w-full md:max-w-xl mx-auto px-4">
                <h2 className="text-xl text-center font-bold mb-3">
                    Cara Membaca Scatter Plot 2D
                </h2>

                <p className={`text-sm mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Scatter plot ini memvisualisasikan kemiripan antar <i>{opsional}</i>, dengan
                    warna
                    yang menunjukkan kelompok <i>{opsional}</i>:
                    <br />
                    <strong>Merah:</strong> Titik merah mewakili pengguna <i>target</i> yang sedang
                    dianalisis. Posisi titik merah menunjukkan posisi pengguna yang sedang dicari.
                    <br />
                    <strong>Hijau:</strong> Titik hijau menunjukkan <b>tetangga terdekat</b> dari
                    pengguna target. Ini adalah pengguna yang paling mirip dengan pengguna target
                    dalam hal preferensi atau perilaku.
                    <br />
                    <strong>Biru:</strong> Titik biru mewakili pengguna lain dalam sistem yang
                    <b>berbeda</b> atau memiliki kemiripan yang lebih rendah dibandingkan dengan
                    pengguna target.
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
        <div className='flex flex-col my-5 font-poppins items-center mx-auto'>
            <ScatterPlotFilter />
            <ExplanationSectionScatterPlotFilter />
        </div>
    )
}


