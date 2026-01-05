# KoalaERS - Flow & Project Documentation

## 📌 Deskripsi Project

KoalaERS adalah platform edukasi interaktif untuk mempelajari **Sistem Rekomendasi** dengan metode **Collaborative Filtering** (User-Based & Item-Based). Platform ini menyediakan tutorial dan kalkulator interaktif untuk 4 fungsi similaritas:

- **PCC** (Pearson Correlation Coefficient)
- **Cosine Similarity**
- **Adjusted Cosine**
- **BC** (Bhattacharyya Coefficient)

---

## 🗂️ Struktur Project

```
src/
├── api/                          # API Layer
│   ├── api.js                    # Axios instance & API endpoints
│   └── getDataSet.js             # Custom hooks untuk fetch data
│
├── assets/                       # Static assets
│   ├── icons/                    # Icon images
│   ├── images/                   # General images
│   └── vidioAsset/               # Video & GIF assets
│
├── data/                         # Static Data & Mock Data
│   ├── index.js                  # Central export untuk semua data
│   ├── faqs.js                   # Data FAQ untuk halaman About
│   ├── formulas.js               # Rumus matematika (PCC, Cosine, ACos, BC)
│   ├── mockRatingData.js         # Mock data rating untuk tutorial/demo
│   └── ratingExplanations.js     # Penjelasan nilai rating untuk tabel
│
├── components/                   # Reusable Components
│   ├── Card/                     # Card components (Home, Main)
│   ├── DetailPerhitungan/        # Full-page detail calculation views
│   │   ├── DetailPerhitunganMean.jsx
│   │   ├── DetailPerhitunganMeanCen.jsx
│   │   ├── DetailPerhitunganSimilarity.jsx
│   │   └── DetailPerhitunganPrediksi.jsx
│   ├── FloatingCalculator/       # Floating calculator widget
│   ├── Form/                     # Form components
│   │   ├── FormMeasure.jsx       # Main form untuk input matrix
│   │   └── MessageError/
│   ├── Graph/                    # Visualization components
│   │   ├── HeatMapVisual.jsx
│   │   ├── ScatterPlotVisual.jsx
│   │   └── ChartJsPlot.jsx
│   ├── hooks/                    # Custom hooks
│   ├── Loading/                  # Loading spinner
│   ├── MathSimilarity/           # Math formula components
│   │   ├── Measure/
│   │   │   ├── Mean/             # Mean calculation
│   │   │   ├── MeanCentered/     # Mean-centered calculation
│   │   │   ├── Similarity/       # Similarity functions (PCC, Cosine, etc)
│   │   │   ├── Prediction/       # Prediction calculation
│   │   │   └── Formula/          # Formula display components
│   │   └── DropdownFunction/
│   ├── modal/                    # Modal components
│   ├── Navigate/                 # Navigation components
│   │   └── Navbar/
│   ├── Steppers/                 # Stepper components per similarity
│   ├── tabelData/                # Table utilities
│   ├── table/                    # Table components
│   │   └── TableMatrix/          # Editable matrix table
│   ├── Toggle/                   # Toggle & switch components
│   └── Warm/                     # Warning components
│
├── context/                      # React Context
│   └── ThemeContext.jsx          # Dark/Light mode context
│
├── helper/                       # Utility functions
│   ├── helper.js                 # Matrix operations, sparsity, transpose
│   ├── Measure.js                # Math calculations
│   └── Formula/                  # Formula helpers
│
├── pages/                        # Page components
│   ├── Home/                     # Landing page
│   ├── Tutorial/                 # Tutorial page
│   ├── Exploration/              # Exploration/practice page
│   ├── DetailSimilarity/         # Detail pages per similarity
│   │   ├── DetailPagePCC.jsx
│   │   ├── DetailPageCosine.jsx
│   │   ├── DetailPageACos.jsx
│   │   └── DetailPageBC.jsx
│   ├── detailPageView/           # Detail page layouts
│   ├── ErorrPage/                # Error pages (404)
│   └── Layout/                   # Layout wrappers
│
├── styles/                       # CSS styles
├── App.js                        # Main app & routing
├── index.js                      # Entry point
└── mathjax-config.js             # MathJax configuration
```

---

## 🔄 Flow Aplikasi

### 1. Entry Point & Routing

```
index.js → App.js → Router
                      ├── /              → Home.jsx
                      ├── /tutorial      → Tutorial.jsx
                      ├── /eksplorasi    → Exploration.jsx
                      ├── /pccDetail     → DetailPagePCC.jsx
                      ├── /cosineDetail  → DetailPageCosine.jsx
                      ├── /acosDetail    → DetailPageACos.jsx
                      ├── /bcDetail      → DetailPageBC.jsx
                      └── /detail-*      → DetailPerhitungan*.jsx (full page)
```

### 2. Flow Data dari Input hingga Hasil

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INPUT                                     │
│  FormMeasure.jsx                                                        │
│  - Input: jumlah user (n), jumlah item (m), sparsity %                  │
│  - Generate matrix dengan helper.makeSparsity()                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         TABLE MATRIX                                     │
│  TableMatrix/index.jsx                                                  │
│  - User bisa edit nilai rating (1-5, atau 0 untuk unknown)              │
│  - Data disimpan di state parent (Tutorial/Exploration)                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      PILIH SIMILARITY & OPSIONAL                        │
│  - Similarity: PCC / Cosine / Adjusted Cosine / BC                      │
│  - Opsional: user-based / item-based                                    │
│  - K value (untuk top-K neighbors)                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           API CALL                                       │
│  getDataSet.js → AllSimilaritas()                                       │
│                                                                         │
│  const initialData = {                                                  │
│    data: [[rating matrix]],                                             │
│    k: 2,                                                                │
│    opsional: "user-based" | "item-based"                                │
│  }                                                                      │
│                                                                         │
│  handleSimilarityFunction(similarity) → returns API function            │
│    - "Pearson Correlation Coefficient" → getPearsonPC()                 │
│    - "Cosine" → getCosine()                                             │
│    - "Adjusted Cosine" → getACosine()                                   │
│    - "Bhattacharyya Coefficient" → getBC()                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API ENDPOINTS                                    │
│  api.js                                                                 │
│  BASE_URL: https://api.koalaers.trunojoyoan.com                         │
│                                                                         │
│  POST /api/v2/pearson  → getPearsonPC(data)                             │
│  POST /api/v2/cosine   → getCosine(data)                                │
│  POST /api/v2/acosine  → getACosine(data)                               │
│  POST /api/v2/bc       → getBC(data)                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        API RESPONSE                                      │
│  response.data berisi:                                                  │
│  {                                                                      │
│    "mean": [...],              // Mean rating per user/item             │
│    "mean-centered": [[...]],   // Mean-centered matrix                  │
│    "similarity": [[...]],      // Similarity matrix                     │
│    "prediction": [[...]],      // Prediction matrix                     │
│    "top-k": {...}              // Top-K neighbors                       │
│  }                                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      RENDER HASIL                                        │
│                                                                         │
│  1. MeanMeasure.jsx         → Tampilkan mean rating                     │
│  2. MeanCenteredMeasure.jsx → Tampilkan mean-centered matrix            │
│  3. SimilarityMeasure.jsx   → Tampilkan similarity matrix               │
│  4. PredictionMeasure.jsx   → Tampilkan prediction & top-N              │
│                                                                         │
│  Setiap komponen punya Modal untuk detail perhitungan:                  │
│  - ModalMean.jsx                                                        │
│  - ModalMeanCenteredMeasure.jsx                                         │
│  - ModalSimilarityMeasure.jsx                                           │
│  - ModalPredictionMeasure.jsx                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FULL PAGE VIEW                                      │
│  Dari modal, user bisa klik "Full Page" untuk buka tab baru             │
│                                                                         │
│  Data disimpan ke sessionStorage:                                       │
│  sessionStorage.setItem("similarityDetail", JSON.stringify(detailData)) │
│                                                                         │
│  Lalu buka: window.open("/detail-similarity", "_blank")                 │
│                                                                         │
│  Di halaman baru, data diambil dari sessionStorage                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔌 API Integration Detail

### Request Format

```javascript
// src/api/api.js
const API_URL = "https://api.koalaers.trunojoyoan.com";

// Contoh request body
{
  "data": [
    [5, 3, 0, 1],
    [4, 0, 0, 1],
    [1, 1, 0, 5],
    [1, 0, 0, 4],
    [0, 1, 5, 4]
  ],
  "k": 2,
  "opsional": "user-based"
}
```

### Custom Hook Usage

```javascript
// src/api/getDataSet.js
import { AllSimilaritas, getInitialData } from "./api/getDataSet";

// Di component
const initialData = getInitialData(matrixData, "user-based", 2);
const { result, error } = AllSimilaritas(
  initialData,
  "Pearson Correlation Coefficient"
);

// result berisi response dari API
// error berisi pesan error jika ada
```

---

## 🎨 State Management

### Global State

- **ThemeContext**: Dark/Light mode (localStorage)

### Local State (per page)

- **data**: Matrix rating dari user input
- **similarity**: Jenis fungsi similaritas yang dipilih
- **opsional**: user-based atau item-based
- **k**: Nilai K untuk top-K neighbors
- **result**: Response dari API

### Session Storage

- **similarityDetail**: Data untuk full-page view (dibuka di tab baru)
- **meanDetail**: Data untuk detail mean
- **meanCenteredDetail**: Data untuk detail mean-centered
- **predictionDetail**: Data untuk detail prediction

---

## 📦 Key Dependencies

| Package                        | Fungsi                      |
| ------------------------------ | --------------------------- |
| `axios`                        | HTTP client untuk API calls |
| `react-router-dom`             | Routing                     |
| `better-react-mathjax`         | Render formula matematika   |
| `chart.js` + `react-chartjs-2` | Visualisasi grafik          |
| `tailwindcss`                  | Styling                     |
| `@mui/icons-material`          | Icons                       |
| `aos`                          | Scroll animations           |
| `zustand`                      | State management (optional) |

---

## 📁 Folder Data (`src/data/`)

Semua data statis dan mock data dikumpulkan di folder `src/data/` untuk memudahkan maintenance:

| File                    | Isi                                                         |
| ----------------------- | ----------------------------------------------------------- |
| `faqs.js`               | Data FAQ untuk halaman About                                |
| `formulas.js`           | Rumus matematika LaTeX (PCC, Cosine, ACos, BC, Prediction)  |
| `mockRatingData.js`     | Mock data rating untuk tutorial dan demo                    |
| `ratingExplanations.js` | Penjelasan nilai rating (-1, 0, 1) untuk tabel interpretasi |
| `index.js`              | Central export untuk semua data                             |

### Cara Penggunaan

```javascript
// Import dari central index
import { faqs, formulaPCC, tutorialRatingData } from "../data";

// Atau import langsung dari file spesifik
import { faqs } from "../data/faqs";
```

---

## 🚀 Quick Start untuk Developer Baru

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Jalankan development server**

   ```bash
   npm start
   ```

3. **File penting untuk dipahami**:

   - `src/api/api.js` - Semua API endpoints
   - `src/api/getDataSet.js` - Custom hook untuk fetch
   - `src/components/Form/FormMeasure.jsx` - Input form utama
   - `src/helper/helper.js` - Utility functions (transpose, sparsity, dll)
   - `src/pages/Tutorial/Tutorial.jsx` - Halaman tutorial utama

4. **Untuk menambah fungsi similaritas baru**:
   - Tambah endpoint di `api.js`
   - Tambah case di `handleSimilarityFunction()` di `getDataSet.js`
   - Buat komponen stepper baru di `components/Steppers/`
   - Buat halaman detail di `pages/DetailSimilarity/`

---

## 📝 Notes

- API menggunakan FastAPI backend (Python)
- MathJax digunakan untuk render rumus matematika
- Gunakan `options` (bukan `config`) untuk prop MathJaxContext
- Data rating: 1-5 (valid), 0 (unknown/tidak diketahui)
- Maximum matrix: 15 users × 17 items
