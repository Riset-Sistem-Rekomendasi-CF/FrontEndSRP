
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import LegendTable from "../tabelData/LegendTable";



export function ScatterPlotData({opsional, result}){
    const similarityData = result['reduced-data'];
    console.log("ini adalh reduce data ", similarityData)
    // Mengubah objek menjadi array 2D
    const dataPlotVisual = Object.entries(similarityData).map(([key, value]) => [parseFloat(key), parseFloat(value)]);
    const ScatterPlot = () => {
        // Create a reference for the container
        const containerRef = useRef(null);
        const [size, setSize] = useState({ width: 400, height: 400 });

        useEffect(() => {
            // Function to update size based on window width
            const updateSize = () => {
                const width = containerRef.current?.offsetWidth || 500;
                const height = width; // Keep the aspect ratio 1:1
                setSize({ width, height });
            };

            // Initial size update
            updateSize();

            // Resize event listener
            window.addEventListener('resize', updateSize);

            // Clean up the event listener on unmount
            return () => window.removeEventListener('resize', updateSize);
        }, []);

        useEffect(() => {
            // Clear previous SVG if present
            d3.select('#scatterplot').select('svg').remove();

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = size.width - margin.left - margin.right;
            const height = size.height - margin.top - margin.bottom;

            const svg = d3.select('#scatterplot')
                .append('svg')
                .attr('width', size.width)
                .attr('height', size.height)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Prepare the data for scatter plot
            const data = dataPlotVisual.map((row, index) => ({
                x: row[0],  // Using first element of row for x
                y: row[1],  // Using second element of row for y
                label: `${opsional === "user-based" ? "user" : "item"}-${index + 1}`
            }));

            // Create scales
            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x))
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y))
                .range([height, 0]);

            // Add x-axis
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

            // Add y-axis
            svg.append('g')
                .call(d3.axisLeft(yScale));

            // Add grid lines
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

            // Add circles for each data point and a line to each point
            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', 5)
                .attr('fill', 'steelblue')
                .on('mouseover', function (event, d) {
                    d3.select(this).attr('fill', 'orange'); // Change color on hover
                    svg.append('text')
                        .attr('x', xScale(d.x) + 10)
                        .attr('y', yScale(d.y) - 10)
                        .attr('class', 'tooltip')
                        .text(d.label);
                })
                .on('mouseout', function () {
                    d3.select(this).attr('fill', 'steelblue'); // Reset color
                    svg.selectAll('.tooltip').remove(); // Remove tooltip
                });

            // Draw lines from (0, 0) to each point
            data.forEach(d => {
                svg.append('line')
                    .attr('x1', xScale(0))
                    .attr('y1', yScale(0))
                    .attr('x2', xScale(d.x))
                    .attr('y2', yScale(d.y))
                    .attr('stroke', 'red')
                    .attr('stroke-width', 1);
            });

            // Add labels around the nodes (circles)
            svg.selectAll('text.label')
                .data(data)
                .enter()
                .append('text')
                .attr('x', d => xScale(d.x))
                .attr('y', d => yScale(d.y) - 10) // Position label slightly above the node
                .attr('class', 'label')
                .attr('text-anchor', 'middle')  // Center the text horizontally
                .attr('font-size', '12px')
                .attr('fill', 'black')
                .text(d => d.label);

        }, [size]); // Re-run effect when size changes

        return (
            <>
                <div id="scatterplot" ref={containerRef}
                     style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}/>
                <div className="mt-6 text-center w-full">
                    <p className="font-bold text-xl mb-4">Keterangan:</p>
                    <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4 justify-center">
                        <li className="flex items-center">
                            <div
                                className="w-5 h-5 rounded-full bg-blue-200 border border-1 border-black mr-2"></div>
                            Titik <span className="italic"> {opsional}</span>
                        </li>
                    </ul>
                </div>


            </>

        );
    };


    // console.log("ini array 2d", dataPlotVisual)


    const ExplanationSectionScatterPlot = () => {
        const [isExpanded, setIsExpanded] = useState(false);

        // Fungsi untuk toggle teks
        const toggleText = () => setIsExpanded(!isExpanded);

        return (
            <div className="mt-6 text-justify max-w-full md:max-w-xl mx-auto px-4">
                <h2 className="text-xl text-center font-bold mb-3">
                    Cara Membaca Scatter Plot 2D
                </h2>
                <p className={`text-sm mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Plot ini menggunakan <b>
                    <a className='no-underline hover:underline text-card_blue_primary decoration-card_blue_primary '
                       href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
                       target="_blank"
                       rel="noopener noreferrer">
                        Multidimensional Scaling (MDS)
                    </a></b>, yaitu teknik reduksi dimensi yang mengubah data kompleks ke dalam
                    dimensi
                    lebih rendah (misalnya 2D atau 3D) sambil mempertahankan jarak antar objek. MDS
                    membantu memvisualisasikan kemiripan antar objek, sehingga memudahkan analisis
                    hubungan antar <i>user</i>.
                </p>
                <p className={`text-sm mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Scatter plot ini menunjukkan hubungan antara dua variabel yang diambil dari data
                    kemiripan pengguna.
                    Setiap titik mewakili <i>user</i>, dan posisi titik tersebut menunjukkan posisi dari
                    variabel yang dipilih.
                </p>
                <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Tooltip akan muncul ketika Anda mengarahkan kursor ke setiap titik, menampilkan
                    label <span className='italic'>user</span> atau <span className='italic'>item</span>.
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
        <div>
            <div className='flex flex-col my-5 font-poppins items-center'>
                <ScatterPlot/>
                <ExplanationSectionScatterPlot/>
            </div>
        </div>
    )
};


export function ScatterPlotDataFilter({opsional, result}) {
    const similarityDataFilter = result['reduced-data'];
    console.log("ini adalh reduce data ", similarityDataFilter)
    // Mengubah objek menjadi array 2D
    const dataFilterPlot = Object.entries(similarityDataFilter).map(([key, value]) => [parseFloat(key), parseFloat(value)]);
    // console.log("ini array 2d", dataFilterPlot)
    const ScatterPlotFilter = () => {


        const size = 400;
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = size - margin.left - margin.right;
        const height = size - margin.top - margin.bottom;

        useEffect(() => {
            // Clear previous SVG if present
            d3.select('#scatterplot').select('svg').remove();

            const svg = d3.select('#scatterplot')
                .append('svg')
                .attr('width', size)
                .attr('height', size)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Prepare the data for scatter plot
            const data = dataFilterPlot.map((row, index) => ({
                x: row[0],
                y: row[1],
                label: `${opsional === "user-based" ? "user" : "item"}-${index + 1} `
            }));

            // Calculate Euclidean distance between points (except for the selected user)
            const calculateDistance = (d1, d2) => {
                return Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));
            };

            // Select the index of the user (e.g., User 3, which is index 2)
            const selectedUserIndex = 2;

            // Find the distances to the selected user and sort them
            const distances = data.map((d, i) => ({
                index: i,
                distance: calculateDistance(data[selectedUserIndex], d)
            }));

            // Sort the distances and find the nearest neighbors
            const nearestNeighbors = distances
                .filter(d => d.index !== selectedUserIndex) // Remove the selected user itself
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 2); // Get 2 nearest neighbors

            // Create scales
            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x))
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y))
                .range([height, 0]);

            // Add x-axis
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

            // Add y-axis
            svg.append('g')
                .call(d3.axisLeft(yScale));

            // Add grid lines
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

            // Add circles for each data point
            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', 5)
                .attr('fill', (d, i) => {
                    if (i === selectedUserIndex) return 'red'; // Highlight selected user
                    if (nearestNeighbors.some(n => n.index === i)) return 'green'; // Nearest neighbors
                    return 'steelblue'; // Default color
                })
                .on('mouseover', function (event, d) {
                    d3.select(this).attr('fill', 'orange'); // Change color on hover
                    svg.append('text')
                        .attr('x', xScale(d.x) + 10)
                        .attr('y', yScale(d.y) - 10)
                        .attr('class', 'tooltip')
                        .text(d.label);
                })
                .on('mouseout', function () {
                    svg.selectAll('.tooltip').remove(); // Remove tooltip
                });

            // Draw lines from (0, 0) to each point
            data.forEach(d => {
                svg.append('line')
                    .attr('x1', xScale(0))
                    .attr('y1', yScale(0))
                    .attr('x2', xScale(d.x))
                    .attr('y2', yScale(d.y))
                    .attr('stroke', 'red')
                    .attr('stroke-width', 1);
            });

            // Add labels around the nodes (circles)
            svg.selectAll('text.label')
                .data(data)
                .enter()
                .append('text')
                .attr('x', d => xScale(d.x))
                .attr('y', d => yScale(d.y) - 10) // Position label slightly above the node
                .attr('class', 'label')
                .attr('text-anchor', 'middle')  // Center the text horizontally
                .attr('font-size', '12px')
                .attr('fill', 'black')
                .text(d => d.label);

        }, []);

        return (
            <>
                <div id="scatterplot" style={{margin: '0 auto'}}/>
                <div className="mt-6 text-center w-full">
                    <p className="font-bold text-xl mb-4">Keterangan:</p>
                    <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4 justify-center">

                        <li className="flex items-center">
                            <div
                                className="w-5 h-5 rounded-full bg-red-500 border border-1 border-black mr-2"></div>
                            Titik <span className="italic">user</span> target
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-5 h-5 rounded-full bg-blue-200 border border-1 border-black mr-2"></div>
                            Titik <span className="italic">User</span>
                        </li>

                        <li className="flex items-center">
                            <div
                                className="w-5 h-5 rounded-full bg-green-500 border border-1 border-black mr-2"></div>
                            Titik tetangga terdekat
                        </li>
                    </ul>
                </div>
            </>


        )
            ;
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
                    Plot ini menggunakan <b>
                    <a className='no-underline hover:underline text-card_blue_primary decoration-card_blue_primary '
                       href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
                       target="_blank"
                       rel="noopener noreferrer">
                        Multidimensional Scaling (MDS)
                    </a></b>, yaitu teknik reduksi dimensi yang mengubah data kompleks ke dalam dimensi
                    lebih rendah (misalnya 2D atau 3D) sambil mempertahankan jarak antar objek. MDS
                    membantu memvisualisasikan kemiripan antar objek, sehingga memudahkan analisis
                    hubungan antar <i>user</i>.
                </p>
                <p className={`text-sm mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Scatter plot ini menunjukkan hubungan antara dua variabel yang diambil dari data
                    kemiripan pengguna.
                    Setiap titik mewakili <i>user</i>, dan posisi titik tersebut menunjukkan posisi dari
                    variabel yang dipilih.
                </p>
                <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
                    Tooltip akan muncul ketika Anda mengarahkan kursor ke setiap titik, menampilkan
                    label <span className='italic'>user</span> atau <span className='italic'>item</span>.
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
            <ScatterPlotFilter/>
            <ExplanationSectionScatterPlotFilter/>
        </div>
    )
}


