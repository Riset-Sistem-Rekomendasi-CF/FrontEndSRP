export const getFormulaSimilarity = (similarity, opsional) => {
  switch (similarity) {
    case "Pearson Correlation Coefficient":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ PCC_{${
              opsional.split("-")[0]
            }}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{i\\in I_{u} \\cap I_{i}} s_{ui}^{2}}\\sqrt{\\sum_{i\\in I_{v} \\cap I_{i}} s_{vi}^{2}}} \\]`,
            detail_formula: [
              `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{ rating } \\text{oleh } \\textit{user} \\ u \\]`,
              `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{ rating } \\textit{item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ PCC_{${
              opsional.split("-")[0]
            }}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{uj}}} \\]`,
            detail_formula: [
              `\\[ U_{ij} = \\text{Kumpulan } \\textit{user} \\text{ yang telah merating pada } \\textit{item} \\text{ yang sama oleh } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
              `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{ rating } \\textit{item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
            ],
          };
        default:
          return;
      }

    case "Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ Cosine_{${
              opsional.split("-")[0]
            }}\\left(u,v\\right) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}}r_{ui}r_{vi}}{\\sqrt{\\sum_{u\\in I_{u}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in I_{v}}r^{2}_{vi}}} \\]`,
            detail_formula: [
              `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{rating } \\text{oleh } \\textit{user} \\ u \\]`,
              `\\[ r_{ui} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[  Cosine_{${
              opsional.split("-")[0]
            }}\\left(i,j\\right) = \\frac{\\sum_{u\\in U_{ij}}r_{ui}r_{uj}}{\\sqrt{\\sum_{u\\in U_{i}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{j}}r^{2}_{uj}}} \\]`,
            detail_formula: [
              `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\textit{item} \\ i \\]`,
              `\\[ r_{ui} = \\text{Nilai } \\textit{rating } \\text{pada}  \\textit{user } \\ u \\text{ pada } \\textit{item} \\ i \\]`,
            ],
          };
        default:
          return;
      }
    case "Adjusted Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ ACosine_{${
              opsional.split("-")[0]
            }}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{u \\in I_{u} \\cap I_{v}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in I_{u} \\cap I_{v}} s_{vi}^{2}}} \\]`,
            detail_formula: [
              `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{item } \\ i \\]`,
              `\\[ I_{u} = \\text{Himpunan } \\textit{item } \\text{ yang telah diberi } \\textit{ rating } \\text{oleh} \\textit{ user } \\ u \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ ACosine_{${
              opsional.split("-")[0]
            }}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u \\in U_{i} \\cap U_{j}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in U_{i} \\cap U_{j}} s_{uj}^{2}}} \\]`,
            detail_formula: [
              `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{ item } \\ i \\]`,
              `\\[ U_{i} = \\text{Himpunan } \\textit{ user } \\text{ yang memberi } \\textit{rating } \\textit{ item } \\ i \\]`,
            ],
          };

        default:
          return;
      }
    case "Bhattacharyya Coefficient":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[  BC_{${
              opsional.split("-")[0]
            }}(u,v) = \\sum_a \\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
            detail_formula: [
              `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
              `\\[ P = \\text{Menghitung probabilitas} \\]`,
              `\\[ r_{i*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ BC_{${
              opsional.split("-")[0]
            }}(i,j) = \\sum_a \\sqrt{P\\left(r_{*i}=a\\right)\\times P\\left(r_{*j}=a\\right)}  \\]`,
            detail_formula: [
              `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
              `\\[ P = \\text{Menghitung probabilitas} \\]`,
              `\\[ r_{*i} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
            ],
          };
        default:
          return;
      }
    default:
      return;
  }
};

/**
 * List of Formula Similarity per Index
 *
 * @param {Int} rowIndex
 * @param {Int} colIndex
 * @param {string} opsional
 * @param {string} similarity
 * @returns string
 */
export const FormulaSimilarityIndex = (
  rowIndex,
  colIndex,
  opsional,
  similarity,
  isNotation
) => {
  switch (similarity) {
    case "Pearson Correlation Coefficient":
      switch (opsional) {
        case "user-based":
          return !isNotation
            ? `\\[ PCC_{user}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${rowIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
            : `\\[ PCC_{user}(u_${rowIndex + 1},u_${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${rowIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`;

        case "item-based":
          return !isNotation
            ? `\\[ PCC_{item}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
            : `\\[ PCC_{item}(i_${rowIndex + 1},i_${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`;

        default:
          return;
      }

    case "Cosine":
      switch (opsional) {
        case "user-based":
          return !isNotation
            ? `\\[ Cosine_{user}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} \\ r_{i${rowIndex + 1}} r_{i${
                colIndex + 1
              }}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} } \\ r_{i${
                rowIndex + 1
              }}^{2}}\\sqrt{\\sum_{i\\in I_{${colIndex + 1}}} \\ r_{i${
                colIndex + 1
              }}^{2}}} \\]`
            : `\\[ Cosine_{user}(u_${rowIndex + 1},u_${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} \\ r_{i${rowIndex + 1}} r_{i${
                colIndex + 1
              }}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} } \\ r_{i${
                rowIndex + 1
              }}^{2}}\\sqrt{\\sum_{i\\in I_{${colIndex + 1}}} \\ r_{i${
                colIndex + 1
              }}^{2}}} \\]`;
        case "item-based":
          return !isNotation
            ? `\\[ Cosine_{item}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} \\ r_{${rowIndex + 1}u} r_{${
                colIndex + 1
              }u}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} } \\ r_{${
                rowIndex + 1
              }u}^{2}}\\sqrt{\\sum_{u\\in U_{${colIndex + 1}}} \\ r_{${
                colIndex + 1
              }u}^{2}}} \\]`
            : `\\[ Cosine_{item}(i_${rowIndex + 1},i_${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} \\ r_{${rowIndex + 1}u} r_{${
                colIndex + 1
              }u}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} } \\ r_{${
                rowIndex + 1
              }u}^{2}}\\sqrt{\\sum_{u\\in U_{${colIndex + 1}}} \\ r_{${
                colIndex + 1
              }u}^{2}}} \\]`;
        default:
          return;
      }
    case "Adjusted Cosine":
      switch (opsional) {
        case "user-based":
          return !isNotation
            ? `\\[ ACosine_{user}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{i${rowIndex + 1}} s_{i${
                colIndex + 1
              }}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{i${rowIndex + 1}}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${colIndex + 1}}} s_{i${colIndex + 1}}^{2}}} \\]`
            : `\\[ ACosine_{user}(u_${rowIndex + 1},u_${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{i${rowIndex + 1}} s_{i${
                colIndex + 1
              }}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} s_{i${rowIndex + 1}}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${colIndex + 1}}} s_{i${colIndex + 1}}^{2}}} \\]`;

        case "item-based":
          return !isNotation
            ? `\\[ ACosine_{item}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
            : `\\[ ACosine_{item}(i_${rowIndex + 1},i_${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i} s_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`;
        default:
          return;
      }
    case "Bhattacharyya Coefficient":
      const ratings = [1, 2, 3, 4, 5]; // Daftar rating
      const sumTerms = ratings
        .map(
          (rating) =>
            `\\sqrt{P\\left(r_{${
              opsional === "user-based"
                ? `${rowIndex + 1}*`
                : `*${rowIndex + 1}`
            } }= ${rating}\\right)\\times P\\left(r_{${
              opsional === "user-based"
                ? `${colIndex + 1}*`
                : `*${colIndex + 1}`
            }}= ${rating}\\right)}`
        )
        .join(" + ");

      return `\\[  BC_{${opsional.split("-")[0]}}(${rowIndex + 1},${
        colIndex + 1
      }) =  ${sumTerms} \\]`;
    default:
      return;
  }
};

export const FormulaSimilarityNonZero = (
  rowIndex,
  colIndex,
  similarity,
  opsional,
  nonZeroIndexesCol1,
  nonZeroIndexesCol2,
  intersection
) => {
  // console.log("intersection", intersection);
  switch (similarity) {
    case "Pearson Correlation Coefficient":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection !== 0
                  ? intersection.join(", ")
                  : `\\text{Tidak ada selisih}`
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.map((val) => `i_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };

        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection !== 0
                ? intersection.join(", ")
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection !== 0
                ? intersection.map((val) => `u_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };
        default:
          return;
      }
    case "Cosine":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection !== 0
                ? intersection.join(", ")
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection !== 0
                ? intersection.map((val) => `i_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };

        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.join(", ")
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection !== 0
                ? intersection.map((val) => `u_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };
        default:
          return;
      }
    case "Adjusted Cosine":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.join(", ")
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } I_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.map((val) => `i_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };
        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.join(", ")
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } U_{${
              colIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${
              intersection.length !== 0
                ? intersection.map((val) => `u_{${val}}`)
                : `\\text{Tidak ada selisih}`
            } \\right\\}\\]`,
          };
        default:
          return;
      }
    default:
      return;
  }
};

export const FormulaSimilarityValue = (
  rowIndex,
  colIndex,
  dataSimilarityRow,
  dataSimilarityCol,
  intersection,
  selectedMean,
  similarity,
  opsional,
  isNotation,
  denominator,
  numerator
) => {
  switch (similarity) {
    case "Pearson Correlation Coefficient":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ PCC_{user}(${rowIndex + 1},${colIndex + 1}) = {\\frac{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(2)})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  dataSimilarityRow.length !== 0
                    ? `\\sqrt{${dataSimilarityRow
                        .map((val) => `(${val.toFixed(2)})^2`)
                        .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                        .map((val) => `(${val.toFixed(2)})^2`)
                        .join(" + ")}}`
                    : `0`
                }}} \\newline \\]`
              : `\\[ PCC_{user}(u_${rowIndex + 1},u_${colIndex + 1}) = \\frac{${
                  intersection.length !== 0
                    ? `${intersection
                        .map(
                          (val) =>
                            `(s_{${val + 1}${rowIndex + 1}} \\times s_{${
                              val + 1
                            }${colIndex + 1}})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  intersection.length !== 0
                    ? `\\sqrt{${intersection
                        .map((val) => `(s_{${val + 1}${rowIndex + 1}})^2`)
                        .join(" + ")}} \\times \\sqrt{${intersection
                        .map((val) => `(s_{${val + 1}${colIndex + 1}})^2`)
                        .join(" + ")}}`
                    : `0`
                }} \\newline \\]`,
            process_formula: `\\[ PCC_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = \\frac{${numerator.toFixed(2)}}{${denominator.toFixed(
              2
            )}}  \\]`,
            result_formula: `\\[ PCC_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ PCC_{item}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(2)})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  intersection.length !== 0
                    ? `\\sqrt{${dataSimilarityRow
                        .map((val) => `(${val.toFixed(2)})^2`)
                        .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                        .map((val) => `(${val.toFixed(2)})^2`)
                        .join(" + ")}}`
                    : "0"
                }} \\newline \\]`
              : `\\[ PCC_{item}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  intersection.length === 0
                    ? "0"
                    : `${intersection
                        .map(
                          (val) =>
                            `(s_{${rowIndex + 1}${val + 1}} \\times s_{${
                              colIndex + 1
                            }${val + 1}})`
                        )
                        .join(" + ")}`
                }}{${
                  intersection.length === 0
                    ? "0"
                    : `\\sqrt{${intersection
                        .map((val) => `(s_{${rowIndex + 1}${val + 1}})^2`)
                        .join(" + ")}} \\times \\sqrt{${intersection
                        .map((val) => `(r_{${colIndex + 1}${val + 1}})^2`)
                        .join(" + ")}`
                }}} \\newline \\]`,
            process_formula: `\\[ PCC_{item}(${rowIndex + 1},${
              colIndex + 1
            }) = \\frac{${numerator.toFixed(2)}}{${denominator.toFixed(
              2
            )}}  \\]`,

            result_formula: `\\[ PCC_{item}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        default:
          return;
      }
    case "Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ Cosine_{user}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  dataSimilarityRow.length === 0
                    ? `0`
                    : `{${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(0)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(0)})`
                        )
                        .join(" + ")}}`
                }}{${
                  dataSimilarityRow.length === 0
                    ? `0`
                    : `\\sqrt{${dataSimilarityRow
                        .map((val) => `(${val.toFixed(0)})^2`)
                        .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                        .map((val) => `(${val.toFixed(0)})^2`)
                        .join(" + ")}}`
                }} \\newline \\]`
              : `\\[ Cosine_{user}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(r_{${val + 1}${rowIndex + 1}} \\times r_{${val + 1}${
                        colIndex + 1
                      }})`
                  )
                  .join(" + ")}}{\\sqrt{${dataSimilarityRow
                  .map((val) => `(r_{${val + 1}${rowIndex + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                  .map((val) => `(r_{${val + 1}${colIndex + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            process_formula: `\\[ Cosine_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = \\frac{${numerator.toFixed(2)}}{${denominator.toFixed(
              2
            )}}  \\]`,
            result_formula: `\\[ Cosine_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ Cosine_{item}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  dataSimilarityRow.length === 0
                    ? `0`
                    : `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(0)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(0)})`
                        )
                        .join(" + ")}`
                }}{${
                  dataSimilarityRow.length === 0
                    ? `0`
                    : `\\sqrt{${dataSimilarityRow
                        .map((val) => `(${val.toFixed(0)})^2`)
                        .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                        .map((val) => `(${val.toFixed(0)})^2`)
                        .join(" + ")}}`
                }} \\newline \\]`
              : `\\[ Cosine_{item}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val) =>
                      `(r_{${rowIndex + 1}${val + 1}} \\times r_{${
                        colIndex + 1
                      }${val + 1}})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(r_{${rowIndex + 1}${val + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(r_{${colIndex + 1}${val + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            process_formula: `\\[ Cosine_{user} = \\frac{${numerator.toFixed(
              2
            )}}{${denominator.toFixed(2)}}  \\]`,
            result_formula: `\\[ Cosine_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        default:
          return;
      }
    case "Adjusted Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ ACosine_{user}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(2)})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `\\sqrt{(${val.toFixed(
                              2
                            )})^2} +  \\sqrt{(${dataSimilarityCol[idx].toFixed(
                              2
                            )})^2}`
                        )
                        .join(" \\times ")}`
                    : `0`
                }} \\]`
              : `\\[ ACosine_{user}(u_${rowIndex + 1},u_${
                  colIndex + 1
                }) = \\frac{${
                  intersection.length !== 0
                    ? `${intersection
                        .map(
                          (val) =>
                            `(s_{${val + 1}${rowIndex + 1}} \\times s_{${
                              val + 1
                            }${colIndex + 1}})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  intersection.length !== 0
                    ? `\\sqrt{${intersection
                        .map((val) => `(s_{${val + 1}${rowIndex + 1}})^2`)
                        .join(" + ")}} \\times \\sqrt{${intersection
                        .map((val) => `(s_{${val + 1}${colIndex + 1}})^2`)
                        .join(" + ")}}`
                    : `0`
                }} \\newline \\]`,
            process_formula: `\\[ ACosine_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = \\frac{${numerator.toFixed(2)}}{${denominator.toFixed(
              2
            )}}  \\]`,
            result_formula: `\\[ ACosine_{user}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ ACosine_{item}(${rowIndex + 1},${colIndex + 1}) = \\frac{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                              idx
                            ].toFixed(2)})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{${
                  dataSimilarityRow.length !== 0
                    ? `${dataSimilarityRow
                        .map(
                          (val, idx) =>
                            `\\sqrt{(${val.toFixed(
                              2
                            )})^2} + \\sqrt{(${dataSimilarityCol[idx].toFixed(
                              2
                            )})^2}`
                        )
                        .join(" \\times ")}`
                    : `0`
                }} \\]`
              : `\\[ ACosine_{item}(i_${rowIndex + 1},i_${
                  colIndex + 1
                }) = \\frac{${
                  intersection.length !== 0
                    ? `${intersection
                        .map(
                          (val) =>
                            `(s_{${rowIndex + 1}${val + 1}} \\times s_{${
                              colIndex + 1
                            }${val + 1}})`
                        )
                        .join(" + ")}`
                    : `0`
                }}{\\sqrt{${
                  intersection.length !== 0
                    ? `${intersection
                        .map((val) => `(s_{${rowIndex + 1}${val + 1}})^2`)
                        .join(" + ")}} \\times \\sqrt{${intersection
                        .map((val) => `(r_{${colIndex + 1}${val + 1}})^2`)
                        .join(" + ")}`
                    : `0`
                }}} \\newline \\]`,
            process_formula: `\\[ ACosine_{item}(${rowIndex + 1},${
              colIndex + 1
            }) = \\frac{${numerator.toFixed(2)}}{${denominator.toFixed(
              2
            )}}  \\]`,
            result_formula: `\\[ ACosine_{item}(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        default:
          return;
      }
    case "Bhattacharyya Coefficient":
      const ratings = [1, 2, 3, 4, 5]; // Daftar rating
      const sumTerms = ratings
        .map((rating) => {
          const rowProb = dataSimilarityRow[rating - 1] || 0;
          const colProb = dataSimilarityCol[rating - 1] || 0;

          return `\\sqrt{\\left(${rowProb.toFixed(
            2
          )}\\right)\\times \\left(${colProb.toFixed(2)}\\right)}`;
        })
        .join(" + ");

      const productTerms = ratings
        .map((rating) => {
          const rowProb = dataSimilarityRow[rating - 1] || 0;
          const colProb = dataSimilarityCol[rating - 1] || 0;
          const product = Math.sqrt(rowProb * colProb);

          return `{\\left(${product.toFixed(2)}\\right)}`;
        })
        .join(" + ");

      return {
        formula: `\\[  BC_{${opsional.split("-")[0]}}(${rowIndex + 1},${
          colIndex + 1
        }) = ${sumTerms} \\]`,
        result_formula: `\\[  BC_{${opsional.split("-")[0]}}(${rowIndex + 1},${
          colIndex + 1
        }) = ${productTerms} \\]`,
      };
    default:
      return;
  }
};

export const IndexProbability = (rowIndex, colIndex, opsional) => {
  const ratings = [1, 2, 3, 4, 5];
  const sumTerms = ratings
    .map(
      (rating) =>
        `\\sqrt{P\\left(r_{${
          rowIndex + 1
        }}= ${rating}\\right)\\times P\\left(r_{${
          colIndex + 1
        }}= ${rating}\\right)}`
    )
    .join(" + "); // Menggabungkan dengan tanda tambah

  return `\\[  BC_{${opsional.split("-")[0]}}(${rowIndex + 1},${
    colIndex + 1
  }) =  ${sumTerms} \\]`;
};
