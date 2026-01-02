const mathjaxConfig = {
  loader: {
    load: [
      "[tex]/amsmath",
      "[tex]/amsfonts",
      "[tex]/color",
      "input/asciimath",
      "output/chtml",
    ],
  },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    packages: { "[+]": ["amsmath", "amsfonts", "color"] },
    processEscapes: true,
    processEnvironments: true,
  },
  chtml: {
    scale: 1,
    displayAlign: "left",
  },
  startup: {
    typeset: true,
  },
};

export default mathjaxConfig;
