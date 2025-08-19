const mathjaxConfig = {
    loader: { load: ['[tex]/amsmath', '[tex]/amsfonts', '[tex]/color', "input/asciimath", "output/chtml"] },
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: { '[+]': ['amsmath', 'amsfonts', 'color'] },
    },
    // svg: {
    //     fontCache: 'global'
    // }
    chtml:{
        scale : 1, // Set scale to 1 for better performance
        displayAlign: 'left', // Align display equations to the left
    }
    
};

export default mathjaxConfig