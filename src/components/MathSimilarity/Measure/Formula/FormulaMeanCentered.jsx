export const getFormulaMeanCentered = (opsional) => {
  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ S_{User{(u,i)}} = r_{ui} -\\mu_{User(u)}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
        detail_formula: [
          `\\[ 
           \\begin{array}{ll}
          S_{User{(u,i)}} & : \\text{Mean-centered} \\ \\text{pada} \\ \\text{user u} \\ \\text{terhadap} \\ \\text{item i} \\\\
          r_{ui} & : \\text{Rating } \\text{user} \\ u \\text{ terhadap } \\text{item} \\ i \\\\
          \\mu_{User(u)} & : \\text{Mean rating} \\ \\text{pada} \\ \\text{user} \\ u
           \\end{array}\\]`,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ S_{Item{(u,i)}} = r_{ui} -\\mu_{Item(i)}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`,
        detail_formula: [
          `\\[ 
          \\begin{array}{ll}
          S_{Item{(u,i)}} &  : \\text{Mean-centered} \\ \\text{pada} \\ \\text{item i} \\ \\text{terhadap} \\ \\text{user u} \\\\
          r_{ui} & : \\text{Rating} \\ \\text{user} \\ u \\text{ terhadap} \\ \\text{item} \\ i \\\\
         \\mu_{Item(i)} &  : \\text{Mean rating} \\ \\text{pada} \\ \\text{item} \\ i  
          \\end{array}\\]`,
        ],
      };
    default:
      return;
  }
};

// detail mean centered

export const getDetailFormulaMeanCenterdIndex = (
  rowIndex,
  colIndex,
  opsional,
  similarity
) => {
  const isAdjustedCosine =
    similarity === "Adjusted Cosine" && opsional === "item-based";

  const i = isAdjustedCosine ? colIndex + 1 : rowIndex + 1;
  const u = isAdjustedCosine ? rowIndex + 1 : colIndex + 1;

  let symbolLine = "";
  let ratingLine = "";
  let meanLine = "";

  if (isAdjustedCosine) {
    symbolLine = `S_{(i_${i}, u_${u})} & : \\text{Mean-centered pada item } ${i} \\text{ terhadap user } ${u}`;
    ratingLine = `r_{i_${i}, u_${u}} & : \\text{Rating item } ${i} \\text{ oleh user } ${u}`;
    meanLine = `\\mu_{Item(i_${i})} & : \\text{Mean rating pada item } ${i}`;
  } else if (opsional === "user-based") {
    symbolLine = `S_{(u_${i}, i_${u})} & : \\text{Mean-centered pada user } ${i} \\text{ terhadap item } ${u}`;
    ratingLine = `r_{u_${i}, i_${u}} & : \\text{Rating user } ${i} \\text{ terhadap item } ${u}`;
    meanLine = `\\mu_{User(u_${i})} & : \\text{Mean rating pada user } ${i}`;
  } else if (opsional === "item-based") {
    symbolLine = `S_{(i_${i}, u_${u})} & : \\text{Mean-centered pada item } ${i} \\text{ terhadap user } ${u}`;
    ratingLine = `r_{i_${i}, u_${u}} & : \\text{Rating item } ${i} \\text{ oleh user } ${u}`;
    meanLine = `\\mu_{Item(i_${i})} & : \\text{Mean rating pada item } ${i}`;
  }

  return [
    `\\[
\\begin{array}{ll}
${symbolLine} \\\\
${ratingLine} \\\\
${meanLine}
\\end{array}
\\]`,
  ];
};

export const getFormulaMeanCenteredIndex = (
  rowIndex,
  colIndex,
  opsional,
  similarity
) => {
  // Case khusus untuk Adjusted Cosine + user-based
  if (opsional === "item-based" && similarity === "Adjusted Cosine") {
    return `\\[S_{(i_{${colIndex + 1}}, u_{${rowIndex + 1}})} = 
      r_{i_{${colIndex + 1}}, u_{${rowIndex + 1}}} - \\mu_{Item(i_{${
      colIndex + 1
    }})}\\]`;
  }

  switch (opsional) {
    case "user-based":
      return `\\[S_{(u_{${rowIndex + 1}}, i_{${colIndex + 1}})} = 
      r_{u_{${rowIndex + 1}}, i_{${colIndex + 1}}} - \\mu_{User(u_{${
        rowIndex + 1
      }})}\\]`;

    case "item-based":
      return `\\[S_{(i_{${rowIndex + 1}}, u_{${colIndex + 1}})} = 
      r_{i_{${rowIndex + 1}}, u_{${colIndex + 1}}} - \\mu_{Item(i_{${
        rowIndex + 1
      }})}\\]`;

    default:
      return "";
  }
};

export const getFormulaMeanCenteredValue = (
  rowIndex,
  colIndex,
  dataOnly,
  result,
  opsional,
  selectedValue,
  similarity, // Prop ini sekarang diterima
  isNotation
) => {
  // FIX: Buat flag untuk mendeteksi kasus khusus
  const isAdjustedCosineUserBased =
    (similarity === "Adjusted Cosine" && opsional !== "user-based") ||
    ((similarity === "Cosine" ||
      similarity === "Pearson Correlation Coefficient" ||
      similarity === "Bhattacharyya Coefficient") &&
      opsional === "item-based");

  // Ambil mean list yang sesuai
  const meanList =
    similarity === "Adjusted Cosine"
      ? result?.["mean-list-brother"]
      : result?.["mean-list"];

  // FIX: Ambil nilai rating dengan menukar indeks jika kasus khusus
  const selectedValueRating = isAdjustedCosineUserBased
    ? dataOnly?.[colIndex]?.[rowIndex] // Indeks ditukar karena dataOnly adalah matriks transpose
    : dataOnly?.[rowIndex]?.[colIndex];

  // FIX: Ambil nilai mean yang sesuai dengan logika baru
  const selectedMeanValue = (() => {
    if (rowIndex == null || colIndex == null || !meanList) return null;

    if (isAdjustedCosineUserBased) {
      return meanList[colIndex]; // ✅ pakai colIndex karena mean berdasarkan ITEM
    }

    return opsional === "item-based" ? meanList[colIndex] : meanList[rowIndex];
  })();

  // FIX: Siapkan variabel untuk label dan indeks formula secara dinamis
  const mainEntity = isAdjustedCosineUserBased
    ? "item"
    : opsional.split("-")[0];

  // Untuk Adjusted Cosine User-Based, row merepresentasikan item, col merepresentasikan user
  const mainIndex = isAdjustedCosineUserBased ? rowIndex + 1 : rowIndex + 1;
  const secondaryIndex = isAdjustedCosineUserBased
    ? colIndex + 1
    : colIndex + 1;

  // FIX: entity untuk mean label harus sesuai dengan jenis mean yang digunakan
  const meanEntity = isAdjustedCosineUserBased
    ? "item"
    : opsional === "item-based"
    ? "item"
    : "user";

  // FIX: meanIndex harus sesuai dengan index yang digunakan untuk mengambil mean
  const meanIndex = isAdjustedCosineUserBased
    ? colIndex + 1
    : opsional === "item-based"
    ? colIndex + 1
    : rowIndex + 1;

  const indexLabel =
    similarity === "Adjusted Cosine" && opsional !== "user-based"
      ? `S_{${mainEntity}(${secondaryIndex},${mainIndex})}`
      : `S_{${mainEntity}(${mainIndex},${secondaryIndex})}`;

  const ratingLabel = `r_{${mainIndex},${secondaryIndex}}`;
  const meanLabel = `\\mu_{${meanEntity}(${meanIndex})}`;

  const formulaString = `\\[ ${indexLabel} = ${ratingLabel} - ${meanLabel} \\]`;
  const resultStringWithValue = `\\[ ${indexLabel} = ${selectedValueRating?.toFixed(
    2
  )} - ${selectedMeanValue?.toFixed(2)} \\]`;

  return {
    formula: !isNotation ? resultStringWithValue : formulaString,
    result: `\\[ ${indexLabel} = ${selectedValue?.toFixed(2)} \\]`,
  };
};
