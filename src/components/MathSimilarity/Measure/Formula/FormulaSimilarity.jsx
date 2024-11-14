export const getFormulaSimilarity = (similarity, opsional) => {
  switch (similarity) {
    case "Pearson Correlation Coefficient (PCC)":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} S_{ui} S_{vi}}{\\sqrt{\\sum_{i\\in I_{u} \\cap I_{i}} S_{ui}^{2}}\\sqrt{\\sum_{i\\in I_{v} \\cap I_{i}} S_{vi}^{2}}} \\]`,
            detail_formula: [
              `\\[ I_{u} = \\text{Himpunan item yang telah diberi rating oleh user u} \\]`,
              `\\[ S_{ui} = \\text{Nilai mean-centered dari rating item i yang telah dinilai oleh user u } \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ PCC(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} S_{ui} S_{uj}}{\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} S^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} S^{2}_{uj}}} \\]`,
            detail_formula: [
              `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
              `\\[ S_{ui} = \\text{Nilai mean-centered dari rating item i yang telah dinilai oleh user u } \\]`,
            ],
          };
        default:
          return;
      }

    case "Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ Cosine\\left(u,v\\right) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}}r_{ui}r_{vi}}{\\sqrt{\\sum_{u\\in I_{u}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in I_{v}}r^{2}_{vi}}} \\]`,
            detail_formula: [
              `\\[ I_{u} = \\text{Himpunan item yang telah diberi rating oleh user u} \\] `,
              `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[  Cosine\\left(i,j\\right) = \\frac{\\sum_{u\\in U_{ij}}r_{ui}r_{uj}}{\\sqrt{\\sum_{u\\in U_{i}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{j}}r^{2}_{uj}}} \\]`,
            detail_formula: [
              `\\[ U_{i} = \\text{Himpunan user yang telah memberi rating item i} \\]`,
              `\\[ r_{ui} = \\text{Nilai rating pada user u pada item pada item i} \\]`,
            ],
          };
        default:
          return;
      }
    case "Adjusted Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[ ACosine(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} S_{ui} S_{vi}}{\\sqrt{\\sum_{u \\in I_{u} \\cap I_{v}} S_{ui}^{2}}\\sqrt{\\sum_{i \\in I_{u} \\cap I_{v}} S_{vi}^{2}}} \\]`,
            detail_formula: [
              `\\[ S_{ui} = \\text{Nilai mean-centered dari user u pada item i} \\] `,
              `\\[ I_{u} = \\text{Himpunan item yang telah diberi rating oleh user u} \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ ACosine(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} S_{ui} S_{uj}}{\\sqrt{\\sum_{u \\in U_{i} \\cap U_{j}} S_{ui}^{2}}\\sqrt{\\sum_{i \\in U_{i} \\cap U_{j}} S_{uj}^{2}}} \\]`,
            detail_formula: [
              `\\[ S_{ui} = \\text{Nilai mean-centered dari user u pada item i} \\] `,
              `\\[ U_{i} = \\text{Himpunan user yang memberi rating item i} \\]`,
            ],
          };

        default:
          return;
      }
    case "Bhattacharyya Coefficient Similarity (BC)":
      switch (opsional) {
        case "user-based":
          return {
            formula: `\\[  BC(u,v) = \\sum_a \\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
            detail_formula: [
              `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai rating} \\] `,
              `\\[ P = \\text{Menghitung probabilitas } \\]`,
              `\\[ r_{i*} = \\text{Seluruh nilai rating item yang telah diberi oleh user i} \\]`,
            ],
          };
        case "item-based":
          return {
            formula: `\\[ BC(i,j) = \\sum_a \\sqrt{P\\left(r_{*i}=a\\right)\\times P\\left(r_{*j}=a\\right)}  \\]`,
            detail_formula: [
              `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai rating} \\] `,
              `\\[ P = \\text{Menghitung probabilitas } \\]`,
              `\\[ r_{*i} = \\text{Seluruh nilai rating item yang telah diberi oleh user i} \\]`,
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
    case "Pearson Correlation Coefficient (PCC)":
      switch (opsional) {
        case "user-based":
          return !isNotation
            ? `\\[ PCC_{user}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i} S_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${rowIndex + 1}}} S_{${colIndex + 1}i}^{2}}} \\]`
            : `\\[ PCC_{user}(u_${rowIndex + 1},u_${
                colIndex + 1
              }) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i} S_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${
                rowIndex + 1
              }} \\cap I_{${rowIndex + 1}}} S_{${colIndex + 1}i}^{2}}} \\]`;

        case "item-based":
          return !isNotation
            ? `\\[ PCC_{item}(${rowIndex + 1},${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i} S_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} S_{${colIndex + 1}i}^{2}}} \\]`
            : `\\[ PCC_{item}(i_${rowIndex + 1},i_${
                colIndex + 1
              }) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i} S_{${
                colIndex + 1
              }i}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${
                colIndex + 1
              }}} S_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${
                rowIndex + 1
              }} \\cap U_{${colIndex + 1}}} S_{${colIndex + 1}i}^{2}}} \\]`;

        default:
          return;
      }

    case "Vector Cosine":
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
    case "Adjusted Vector Cosine":
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
    case "Bhattacharyya Coefficient Similarity (BC)":
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

      return `\\[  BC(${rowIndex + 1},${colIndex + 1}) =  ${sumTerms} \\]`;
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
  console.log("intersection", intersection);
  switch (similarity) {
    case "Pearson Correlation Coefficient (PCC)":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
            I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.join(", ")} \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }
            I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `i_{${val}}`
            )} \\right\\}\\]`,
          };

        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
            U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.join(", ")} \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }
            U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `u_{${val}}`
            )} \\right\\}\\]`,
          };
        default:
          return;
      }
    case "Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
            I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.join(", ")} \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }
            I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `i_{${val}}`
            )} \\right\\}\\]`,
          };

        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${
              intersection.length !== 0 ? intersection.join(", ") : `0`
            } \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }
            U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `u_{${val}}`
            )} \\right\\}\\]`,
          };
        default:
          return;
      }
    case "Adjusted Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
        I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.join(", ")} \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } I_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ dan } 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `i_{${val}}`
            )} \\right\\} \\text{ maka }
        I_{${rowIndex + 1}} \\cap I_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `i_{${val}}`
            )} \\right\\}\\]`,
          };
        case "item-based":
          return {
            FormulaWithValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.join(
              ", "
            )} \\right\\} \\text{ dan } 
        U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(
              ", "
            )} \\right\\} \\text{ maka }
        U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.join(", ")} \\right\\}\\]`,
            FormulaWithoutValue: `\\[ \\text{Karena } U_{${
              rowIndex + 1
            }} = \\left\\{ ${nonZeroIndexesCol1.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ dan } 
        U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(
              (val) => `u_{${val}}`
            )} \\right\\} \\text{ maka }
        U_{${rowIndex + 1}} \\cap U_{${
              colIndex + 1
            }} = \\left\\{ ${intersection.map(
              (val) => `u_{${val}}`
            )} \\right\\}\\]`,
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
  isNotation
) => {
  switch (similarity) {
    case "Pearson Correlation Coefficient (PCC)":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ PCC_{user}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(2)})`
                  )
                  .join(" + ")}}{\\sqrt{${dataSimilarityRow
                  .map((val) => `(${val.toFixed(2)})^2`)
                  .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                  .map((val) => `(${val.toFixed(2)})^2`)
                  .join(" + ")}}} \\newline \\]`
              : `\\[ Sim_{user}(u_${rowIndex + 1},u_${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val) =>
                      `(s_{${val + 1}${rowIndex + 1}} \\times s_{${val + 1}${
                        colIndex + 1
                      }})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(s_{${val + 1}${rowIndex + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(s_{${val + 1}${colIndex + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ Sim_{item}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(2)})`
                  )
                  .join(" + ")}}{\\sqrt{${dataSimilarityRow
                  .map((val) => `(${val.toFixed(2)})^2`)
                  .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                  .map((val) => `(${val.toFixed(2)})^2`)
                  .join(" + ")}}} \\newline \\]`
              : `\\[ Sim_{item}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val) =>
                      `(s_{${rowIndex + 1}${val + 1}} \\times s_{${
                        colIndex + 1
                      }${val + 1}})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(s_{${rowIndex + 1}${val + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(r_{${colIndex + 1}${val + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        default:
          return;
      }
    case "Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ Cosine_{user}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(0)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(0)})`
                  )
                  .join(" + ")}}{\\sqrt{${dataSimilarityRow
                  .map((val, idx) => `(${val.toFixed(0)})^2`)
                  .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                  .map((val, idx) => `(${val.toFixed(0)})^2`)
                  .join(" + ")}}} \\newline \\]`
              : `\\[ Cosine_{user}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val, idx) =>
                      `(r_{${val + 1}${rowIndex + 1}} \\times r_{${val + 1}${
                        colIndex + 1
                      }})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(r_{${val + 1}${rowIndex + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(r_{${val + 1}${colIndex + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ Cosine_{item}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(0)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(0)})`
                  )
                  .join(" + ")}}{\\sqrt{${dataSimilarityRow
                  .map((val, idx) => `(${val.toFixed(0)})^2`)
                  .join(" + ")}} \\times \\sqrt{${dataSimilarityCol
                  .map((val, idx) => `(${val.toFixed(0)})^2`)
                  .join(" + ")}}} \\newline \\]`
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
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        default:
          return;
      }
    case "Adjusted Vector Cosine":
      switch (opsional) {
        case "user-based":
          return {
            formula: !isNotation
              ? `\\[ ACosine_{user}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(2)})`
                  )
                  .join(" + ")}}{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `\\sqrt{(${val.toFixed(2)})^2 +  (${dataSimilarityCol[
                        idx
                      ].toFixed(2)})^2}`
                  )
                  .join(" \\times ")}} \\]`
              : `\\[ ACosine_{user}(u_${rowIndex + 1},u_${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val) =>
                      `(s_{${val + 1}${rowIndex + 1}} \\times s_{${val + 1}${
                        colIndex + 1
                      }})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(s_{${val + 1}${rowIndex + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(s_{${val + 1}${colIndex + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };
        case "item-based":
          return {
            formula: !isNotation
              ? `\\[ ACosine_{item}(${rowIndex + 1},${
                  colIndex + 1
                }) = \\frac{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `(${val.toFixed(2)} \\times ${dataSimilarityCol[
                        idx
                      ].toFixed(2)})`
                  )
                  .join(" + ")}}{${dataSimilarityRow
                  .map(
                    (val, idx) =>
                      `\\sqrt{(${val.toFixed(2)})^2 +  (${dataSimilarityCol[
                        idx
                      ].toFixed(2)})^2}`
                  )
                  .join(" \\times ")}} \\]`
              : `\\[ ACosine_{item}(i_${rowIndex + 1},i_${
                  colIndex + 1
                }) = \\frac{${intersection
                  .map(
                    (val) =>
                      `(s_{${rowIndex + 1}${val + 1}} \\times s_{${
                        colIndex + 1
                      }${val + 1}})`
                  )
                  .join(" + ")}}{\\sqrt{${intersection
                  .map((val) => `(s_{${rowIndex + 1}${val + 1}})^2`)
                  .join(" + ")}} \\times \\sqrt{${intersection
                  .map((val) => `(r_{${colIndex + 1}${val + 1}})^2`)
                  .join(" + ")}}} \\newline \\]`,
            result_formula: `\\[ Sim(${rowIndex + 1},${
              colIndex + 1
            }) = ${selectedMean.toFixed(4)} \\]`,
          };

        default:
          return;
      }
    case "Bhattacharyya Coefficient Similarity (BC)":
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
        formula: `\\[  BC(${rowIndex + 1},${colIndex + 1}) = ${sumTerms} \\]`,
        result_formula: `\\[  BC(${rowIndex + 1},${
          colIndex + 1
        }) = ${productTerms} \\]`,
      };
    default:
      return;
  }
};

export const IndexProbability = (rowIndex, colIndex) => {
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

  return `\\[  BC(${rowIndex + 1},${colIndex + 1}) =  ${sumTerms} \\]`;
};
