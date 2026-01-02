// Untuk PCC dan ACos (range -1 sampai 1)
export const ratingExplanationPCC = [
  {
    value: "1",
    description:
      "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
  },
  {
    value: "0",
    description:
      "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
  },
  {
    value: "-1",
    description:
      "Nilai -1 menunjukkan hubungan negatif sempurna, di mana kedua user atau item memiliki pola rating yang bertentangan. Contohnya, jika user A tidak menyukai suatu item, user C mungkin justru menyukai item tersebut.",
  },
];

// Untuk Cosine dan BC (range 0 sampai 1)
export const ratingExplanationCosine = [
  {
    value: "1",
    description:
      "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
  },
  {
    value: "0",
    description:
      "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
  },
];

// Rating values untuk BC Similarity
export const bcRatings = [
  { value: 1, ratingDesc: 1 },
  { value: 2, ratingDesc: 2 },
  { value: 3, ratingDesc: 3 },
  { value: 4, ratingDesc: 4 },
  { value: 5, ratingDesc: 5 },
];

// Default rating range
export const defaultRatingRange = [1, 2, 3, 4, 5];
