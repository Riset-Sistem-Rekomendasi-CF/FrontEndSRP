// Data rating untuk TabelView (tutorial) - format dengan "?" untuk nilai 0
export const tutorialRatingData = [
  ["5", "?", "4", "3", "5", "4"],
  ["4", "5", "?", "3", "2", "3"],
  ["?", "3", "?", "2", "1", "?"],
  ["1", "2", "2", "?", "3", "4"],
  ["1", "?", "1", "2", "3", "3"],
];

// Data rating numerik untuk perhitungan (Tutorial.jsx)
// 0 = tidak ada rating (missing value)
export const tutorialNumericData = [
  [5, 0, 4, 3, 5, 4],
  [4, 5, 0, 3, 2, 3],
  [0, 3, 0, 2, 1, 0],
  [1, 2, 2, 0, 3, 4],
  [1, 0, 1, 2, 3, 3],
];

// Data rating untuk TabelStatis (dengan user index)
export const staticRatingData = [
  ["1", "5", "0", "4", "3", "5", "4"],
  ["2", "4", "5", "0", "3", "2", "3"],
  ["3", "0", "3", "0", "2", "1", "0"],
  ["4", "1", "2", "2", "0", "3", "4"],
  ["5", "1", "0", "1", "2", "3", "3"],
];

// Headers untuk tabel statis
export const staticTableHeaders = ["U/I", "1", "2", "3", "4", "5", "6"];

// Sparsity info untuk tutorial
export const tutorialSparsityInfo = {
  numerator: 7,
  denominator: 30,
  get percentage() {
    return ((this.numerator / this.denominator) * 100).toFixed(2);
  },
};

// Contoh data irisan untuk demo
export const sampleIntersectionData = {
  userBased: {
    I13: "{ 4,3,5 }",
    U11: 5,
    U13: 4,
  },
};
