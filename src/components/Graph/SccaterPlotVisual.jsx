
import React, { useEffect } from 'react';
import * as d3 from 'd3';



export function ScatterPlotData({result}){
    const similarityData = result['reduced-data'];
    console.log("ini adalh reduce data ", similarityData)
    // Mengubah objek menjadi array 2D
    const dataPlotVisual = Object.entries(similarityData).map(([key, value]) => [parseFloat(key), parseFloat(value)]);
    // console.log("ini array 2d", dataPlotVisual)
     const ScatterPlot = () => {
        // Updated data

        const size = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
            const data = dataPlotVisual.map((row, index) => ({
                x: row[0],  // Using first element of row for x
                y: row[1],  // Using second element of row for y
                label: `User ${index + 1}`
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

        }, []);

        return (
            <div id="scatterplot" style={{ margin: '0 auto' }} />
        );
    };

    const ExplanationSectionScatterPlot = () => (
        <div className="mt-6 text-justify max-w-xl">
            <h2 className="text-xl text-center font-bold mb-3">Cara Membaca Scatter Plot 2D</h2>
            <p className='text-sm mb-2'>
                Plot ini menggunakan <b> <i> Multidimensional Scaling (MDS)</i></b> , yaitu teknik reduksi dimensi yang mengubah data kompleks ke dalam dimensi lebih rendah (misalnya 2D atau 3D) sambil mempertahankan jarak antar objek. MDS membantu memvisualisasikan kemiripan antar objek, sehingga memudahkan analisis hubungan antar user.
                <a className='no-underline hover:underline text-card_blue_primary decoration-card_blue_primary ' href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html" target="_blank"
                   rel="noopener noreferrer">
                    [Link Refrensi MDS Sklearn]
                </a>
            </p>
            <p className="text-sm mb-2">
                Scatter plot ini menunjukkan hubungan antara dua variabel yang diambil dari data kemiripan pengguna.
                Setiap titik mewakili pengguna, dan posisi titik tersebut menunjukkan posisi dari variabel yang dipilih.
            </p>
            <p className="text-sm">
                Tooltip akan muncul ketika Anda mengarahkan kursor ke setiap titik, menampilkan label <span className='italic'>user</span> atau <span className='italic'>item</span>.
            </p>
        </div>
    );



    return(
        <div>
            <div className='flex flex-col my-5 font-poppins items-center'>
                <ScatterPlot/>
                <ExplanationSectionScatterPlot/>
            </div>
        </div>
    )
};






export function ScatterPlotDataFilter({result}){
    const similarityDataFilter = result['reduced-data'];
    console.log("ini adalh reduce data ", similarityDataFilter)
    // Mengubah objek menjadi array 2D
    const dataFilterPlot = Object.entries(similarityDataFilter).map(([key, value]) => [parseFloat(key), parseFloat(value)]);
    // console.log("ini array 2d", dataFilterPlot)
    const ScatterPlotFilter = () => {


        const size = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
                label: `User ${index + 1}`
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
            <div id="scatterplot" style={{ margin: '0 auto' }} />
        );
    };

    const ExplanationSectionScatterPlotFilter = () => (
        <div className="mt-6 text-justify max-w-xl">
            <h2 className="text-xl text-center font-bold mb-3">Cara Membaca Scatter Plot 2D</h2>

            <p className="text-sm mb-2">
                Scatter plot ini menggunakan <b><i>Multidimensional Scaling (MDS)</i></b>, yaitu teknik reduksi dimensi yang mengubah data kompleks menjadi dimensi lebih rendah (seperti 2D atau 3D) sambil mempertahankan jarak antar objek. MDS memudahkan kita untuk melihat hubungan dan kemiripan antar pengguna.
                <a className='no-underline hover:underline text-card_blue_primary decoration-card_blue_primary'
                   href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
                   target="_blank"
                   rel="noopener noreferrer">
                    [Referensi MDS Sklearn]
                </a>
            </p>

            <p className="text-sm mb-2">
                Setiap titik pada scatter plot mewakili seorang <span className='italic'>user</span> atau <span className='italic'>item</span>, dengan posisinya yang menunjukkan hubungan antar variabel kemiripan. Titik yang lebih dekat berarti lebih mirip, sedangkan titik yang lebih jauh menunjukkan perbedaan yang lebih besar.
            </p>

            <p className="text-sm">
                Tooltip akan muncul saat Anda mengarahkan kursor ke titik, menampilkan label untuk <span className='italic'>user</span> atau <span className='italic'>item</span> tersebut.
            </p>
        </div>
    );


    return (
        <div className='flex flex-col my-5 font-poppins items-center mx-auto'>
            <ScatterPlotFilter/>
            <ExplanationSectionScatterPlotFilter/>
        </div>
    )
}


