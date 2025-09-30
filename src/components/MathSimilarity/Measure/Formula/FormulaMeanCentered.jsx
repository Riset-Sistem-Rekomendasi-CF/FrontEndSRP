import { transposeMatrix } from "../../../../helper/helper";

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
  const isAdjustedCosine = similarity === "Adjusted Cosine";

  // Tentukan i dan u sesuai aturan transpose dan similarity
  const i = isAdjustedCosine ? colIndex + 1 : rowIndex + 1;
  const u = isAdjustedCosine ? rowIndex + 1 : colIndex + 1;

  switch (opsional) {
    case "user-based":
      if (isAdjustedCosine) {
        // Adjusted Cosine selalu item-user, tapi opsional user-based artinya ambil notasi yg benar sesuai transpose
        return [
          `\\[ 
          \\begin{array}{ll}
          S_{Item{(i_${i}, u_${u})}} &: \\text{Mean-centered} \\ \\text{pada} \\ \\text{item} \\ ${i} \\ \\text{terhadap} \\ \\text{user} \\ ${u} \\\\
          r_{i_${i}, u_${u}} &: \\text{Rating pada item } ${i} \\text{ terhadap user } ${u} \\\\
          \\mu_{Item(i_${i})} &: \\text{Mean rating pada item } ${i} 
          \\end{array}\\] `,
        ];
      } else {
        return [
          `\\[ 
          \\begin{array}{ll}
          S_{User{(u_${i}, i_${u})}} &: \\text{Mean-centered pada user } ${i} \\text{ terhadap item } ${u} \\\\
          r_{u_${i}, i_${u}} &: \\text{Rating user } ${i} \\text{ terhadap item } ${u} \\\\
          \\mu_{User(u_${i})} &: \\text{Mean rating pada user } ${i}
          \\end{array}\\] `,
        ];
      }

    case "item-based":
      if (isAdjustedCosine) {
        return [
          `\\[ 
          \\begin{array}{ll}
          S_{Item{(i_${i}, u_${u})}} &: \\text{Mean-centered pada item } ${i} \\text{ terhadap user } ${u} \\\\
          r_{i_${i}, u_${u}} &: \\text{Rating pada item } ${i} \\text{ terhadap user } ${u} \\\\
          \\mu_{User(u_${u})} &: \\text{Mean rating pada user } ${u} 
          \\end{array}\\] `,
        ];
      } else {
        return [
          `\\[ 
          \\begin{array}{ll}
          S_{Item{(i_${i}, u_${u})}} &: \\text{Mean-centered pada item } ${i} \\text{ terhadap user } ${u} \\\\
          r_{i_${i}, u_${u}} &: \\text{Rating pada item } ${i} \\text{ terhadap user } ${u} \\\\
          \\mu_{Item(i_${i})} &: \\text{Mean rating pada item } ${i} 
          \\end{array}\\] `,
        ];
      }

    default:
      return;
  }
};

export const getFormulaMeanCenteredIndex = (rowIndex, colIndex, opsional) => {
  switch (opsional) {
    case "user-based":
      return `\\[S_{(u_{${rowIndex + 1}}, i_{${colIndex + 1}})} = 
      r_{u_{${rowIndex + 1}}, i_{${colIndex + 1}}} - \\mu_{User(u_{${rowIndex + 1
        }})}\\]`;

    case "item-based":
      return `\\[S_{(i_{${rowIndex + 1}}, u_{${colIndex + 1}})} = 
      r_{i_{${rowIndex + 1}}, u_{${colIndex + 1}}} - \\mu_{Item(i_{${rowIndex + 1
        }})}\\]`;

    default:
      return;
  }
};

export const getFormulaMeanCenteredValue = (
  rowIndex,
  colIndex,
  dataOnly,
  result,
  opsional,
  selectedValue,
  isNotation
) => {

  // Koreksi indeks berdasarkan apakah data ditranspose
  const i = colIndex + 1;
  const u = rowIndex + 1;
  // const i = isAdjustedCosine ? colIndex + 1 : rowIndex + 1;
  // const u = isAdjustedCosine ? rowIndex + 1 : colIndex + 1;

  // Ambil nilai rating yang benar dari data (sudah ditranspose sebelumnya)
  const selectedValueRating = dataOnly[rowIndex][colIndex]

  // Ambil mean item jika Adjusted Cosine, lainnya default dari rowIndex
  const selectedMeanValue =
    rowIndex !== null && colIndex !== null
      ? opsional == "item-based"
        ? result["mean-list"][colIndex] // mean item berdasarkan index i
        : result["mean-list"][rowIndex]
      : null;

  // Notasi rumus
  const indexLabel = `S_{${opsional.split("-")[0]}(${rowIndex},${colIndex})}`;

  return {
    formula: !isNotation ? `\\[ ${indexLabel} = ${selectedValueRating} - ${selectedMeanValue?.toFixed(
      2
    )} \\]` : `\\[ ${indexLabel} = r_{${rowIndex},${colIndex}} - \\mu_{${opsional.split("-")[0]}(${opsional === "user-based" ? rowIndex : colIndex})} \\]`,
    result: `\\[ ${indexLabel} = ${selectedValue?.toFixed(2)} \\]`,
  };
};
