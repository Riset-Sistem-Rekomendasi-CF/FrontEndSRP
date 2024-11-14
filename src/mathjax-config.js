 const mathjaxConfig = {
    loader: { load: ['[tex]/amsmath', '[tex]/amsfonts', '[tex]/color'] },
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: { '[+]': ['amsmath', 'amsfonts', 'color'] },
    },
    svg: {
        fontCache: 'global'
    }
};

export default mathjaxConfig