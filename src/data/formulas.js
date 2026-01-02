// ==================== PCC (Pearson Correlation Coefficient) ====================
export const formulaPCC = {
  user: {
    formula: `\\[ PCC_{${"{user}"}}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{i\\in I_{u} \\cap I_{i}} s_{ui}^{2}}\\sqrt{\\sum_{i\\in I_{v} \\cap I_{i}} s_{vi}^{2}}} \\]`,
    detail_formula: [
      `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{ rating } \\text{oleh } \\textit{user} \\ u \\]`,
      `\\[ U_{ij} = \\text{Kumpulan } \\textit{user} \\text{ yang telah merating pada } \\textit{item} \\text{ yang sama oleh } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
      `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{ rating } \\textit{item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
    ],
  },
  item: {
    formula: `\\[ PCC_{${"item"}}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{uj}}} \\]`,
    detail_formula: [
      `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{ rating } \\textit{item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
    ],
  },
};

// ==================== Cosine Similarity ====================
export const formulaCosine = {
  user: {
    formula: `\\[ Cosine_{${"user"}}\\left(u,v\\right) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}}r_{ui}r_{vi}}{\\sqrt{\\sum_{u\\in I_{u}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in I_{v}}r^{2}_{vi}}} \\]`,
    detail_formula: [
      `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{rating } \\text{oleh } \\textit{user} \\ u \\]`,
      `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\textit{item} \\ i \\]`,
      `\\[ r_{ui} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
    ],
  },
  item: {
    formula: `\\[  Cosine_{${"item"}}\\left(i,j\\right) = \\frac{\\sum_{u\\in U_{ij}}r_{ui}r_{uj}}{\\sqrt{\\sum_{u\\in U_{i}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{j}}r^{2}_{uj}}} \\]`,
    detail_formula: [
      `\\[ r_{ui} = \\text{Nilai } \\textit{rating } \\text{pada}  \\textit{user } \\ u \\text{ pada } \\textit{item} \\ i \\]`,
    ],
  },
};

// ==================== Adjusted Cosine ====================
export const formulaACos = {
  user: {
    formula: `\\[ ACosine_{${"user"}}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{u \\in I_{u} \\cap I_{v}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in I_{u} \\cap I_{v}} s_{vi}^{2}}} \\]`,
    detail_formula: [
      `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{item } \\ i \\]`,
      `\\[ U_{i} = \\text{Himpunan } \\textit{ user } \\text{ yang memberi } \\textit{rating } \\textit{ item } \\ i \\]`,
      `\\[ I_{u} = \\text{Himpunan } \\textit{item } \\text{ yang telah diberi } \\textit{ rating } \\text{oleh} \\textit{ user } \\ u \\]`,
    ],
  },
  item: {
    formula: `\\[ ACosine_{${"item"}}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u \\in U_{i} \\cap U_{j}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in U_{i} \\cap U_{j}} s_{uj}^{2}}} \\]`,
    detail_formula: [
      `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{ item } \\ i \\]`,
    ],
  },
};

// ==================== Bhattacharyya Coefficient (BC) ====================
export const formulaBC = {
  user: {
    formula: `\\[  BC_{${"user"}}(u,v) = \\sum_a \\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
    detail_formula: [
      `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
      `\\[ P = \\text{Menghitung probabilitas} \\]`,
      `\\[ r_{ij*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
      `\\[ r_{uv*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
    ],
  },
  item: {
    formula: `\\[ BC_{${"item"}}(i,j) = \\sum_a \\sqrt{P\\left(r_{*i}=a\\right)\\times P\\left(r_{*j}=a\\right)}  \\]`,
    detail_formula: [
      `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
      `\\[ P = \\text{Menghitung probabilitas} \\]`,
    ],
  },
};

// ==================== Prediction Formulas ====================
export const formulaPrediction = {
  user: {
    formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{u} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{uv}* s_{vi}}{\\sum_{v \\in  X_{u}(i)}\\mid Sim_{uv} \\mid} \\]`,
    detail_formula: [
      `\\[ s_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} u \\]`,
      `\\[ s_{uj} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} j \\]`,
      `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
      `\\[ X_{u}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\]`,
    ],
  },
  item: {
    formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{i} +\\frac{\\sum_{j\\in X_{i}(u)} Sim_{uv}* s_{uj}}{\\sum_{j \\in X_{i}(u)}\\mid Sim_{ij} \\mid} \\]`,
    detail_formula: [
      `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
      `\\[ X_{i}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{item} \\ i \\text{ untuk } \\textit{user} \\ u \\]`,
    ],
  },
};
