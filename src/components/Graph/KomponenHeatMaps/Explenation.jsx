export const ExplanationSectionHeatMap = ({ opsional }) => {
  return (
    <div className="mt-6 text-justify max-w-xl w-full px-4 sm:px-0">
      <h2 className="text-sm sm:text-lg md:text-xl text-center font-bold mb-3">
        Cara Membaca Heatmap Hasil Similaritas
      </h2>

      <p className={`text-sm mb-2`}>
        <a
          className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
          href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          HeatMap
        </a>{" "}
        ini digunakan untuk memvisualisasikan tingkat kemiripan antara{" "}
        <span className="italic">{opsional}</span> berdasarkan data. Setiap sel
        dalam heatmap menunjukkan nilai kemiripan antara dua entitas, dengan
        skala warna yang membantu agar cepat memahami seberapa mirip atau tidak
        mirip dua entitas tersebut.
      </p>

      <p className={`text-sm mb-2`}>
        Dalam heatmap ini, setiap sel mewakili pasangan{" "}
        <span className="italic">user</span> atau{" "}
        <span className="italic">item</span>, dan nilai di dalam sel tersebut
        menggambarkan tingkat kemiripan antara keduanya. Semakin terang atau
        gelap warna yang ditampilkan, semakin mudah kita mengetahui tingkat
        kesamaan antara dua entitas tersebut.
      </p>
    </div>
  );
};
