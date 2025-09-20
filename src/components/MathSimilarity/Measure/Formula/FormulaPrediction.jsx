import { transposeMatrix } from "../../../../helper/helper";
import { sum } from "../../../../helper/Measure";

export const getFormulaPrediction = (similarity, opsional) => {
  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "item-based"
        : "user-based"
      : opsional;

  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ {\\hat{r}^{User}_{u,i}} = \\mu_{User(u)} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{User}(u,v)* S_{User(v,i)}}{\\sum_{v \\in  X_{u}(i)}\\mid Sim_{User}(u,v) \\mid} \\]`,
        arg_max: `\\[ TopK_{u}(i)=\\ \\begin{matrix}k_{User}\\\\argmax\\ \\\\v\\ \\in\\ \\ U_{i}\\\\\\end{matrix}{Sim_{User}(u,v)}\\  \\]`,
        detail_ArgMax: [
          `\\[ 
          \\begin{array}{ll}
          TopK_{u}(I) &: \\text{Tetangga terdekat dari } \\textit{user} \\ \\text{target} \\\\
          k_{User} &:  \\text{Jumlah tetangga terdekat dari nilai} \\ \\textit{similarity} \\\\
          Sim_{User}(u,v) &:  \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v 
          \\end{array}\\]`,
        ],
        detail_formula: [
          `\\[ 
          \\begin{array}{ll}
          S_{User(v,i)} &: \\textit{Mean-Centerd} \\text{ pada } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\\\
          Sim_{User}(u,v) &: \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\\\
          X_{u}(j) &: \\text{Himpunan tetangga (TopK) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\\\
          \\mu_{User(u)} &: \\text{Rata-rata rating dari } \\textit{user} \\ u 
          \\end{array}\\]`,
        ],
        TopN: `\\[  TopN_u=\\ \\begin{matrix}N\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`,
        detailTopN_formula: [
          `\\[
          \\begin{array}{ll}
          N &: \\text{Data jumlah rekomendasi } \\text{ pada himpunan } \\textit{ item } \\text{ target }  {\\hat{r}}_{ui} \\\\
         {\\hat{r}_{ui}} &: \\text{Hasil prediksi } \\textit{rating similarity} \\text{ antara } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ v \\\\
         {\\hat{I}_u} &: \\text{Himpunan } \\textit{ item } \\text{yang belum di rating} 
          \\end{array}\\]`,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ {\\hat{r}^{Item}_{u,i}} = \\mu_{Item(i)} +\\frac{\\sum_{j\\in X_{i}(u)} Sim_{Item}(i,j)* S_{Item}(u,j)}{\\sum_{j \\in X_{i}(u)}\\mid Sim_{Item}(i,j) \\mid} \\]`,
        arg_max: `\\[  TopK_{u}(i)=\\ \\begin{matrix}k_{Item}\\\\argmax\\ \\\\j\\ \\in\\ I_{u}\\\\\\end{matrix}{ Sim_{Item}(i,j)}\\  \\]`,
        detail_ArgMax: [
          `\\[ 
          \\begin{array}{ll}
          TopK_{u}(I) &: \\text{Tetangga terdekat dari } \\textit{item} \\ \\text{target} \\\\
         k_{Item} &: \\text{Jumlah tetangga terdekat dari nilai} \\ \\textit{similarity} \\\\
         Sim_{Item}(i,j) &: \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j  
          \\end{array}\\]`,
        ],
        detail_formula: [
          `\\[ 
          \\begin{array}{ll}
          S_{Item}(u,j) &: \\textit{Mean-Centered} \\text{ pada } \\textit{item} \\ i \\text{ terhadap } \\textit{user} \\ u \\\\
         Sim_{Item}(i,j) &: \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j \\\\
         X_{i}(j) &: \\text{Himpunan tetangga (TopK) dari } \\textit{item} \\ i \\text{ untuk } \\textit{user} \\ u \\\\
         \\mu_{Item(i)} &: \\text{Rata-rata rating dari } \\textit{item} \\ i \\\\
          \\end{array}\\]`,
        ],
        TopN: `\\[  TopN_u=\\ \\begin{matrix}n\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`,
        detailTopN_formula: [
          `\\[
          \\begin{array}{ll}
          N &: \\text{Data jumlah rekomendasi } \\text{ pada himpunan } \\textit{ item } \\text{ target }  {\\hat{r}}_{ui} \\\\
         {\\hat{r}_{ui}} &: \\text{Hasil prediksi } \\textit{rating similarity} \\text{ antara } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ v \\\\
         {\\hat{I}_u} &: \\text{Himpunan } \\textit{ item } \\text{yang belum di rating} 
          \\end{array}\\]`,
        ],
      };
    default:
      return;
  }
};

export const getFormualDetailIndex = (
  rowIndex,
  colIndex,
  opsional,
  similarity
) => {
  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "item-based"
        : "user-based"
      : opsional;
  switch (opsionalModify) {
    case "user-based":
      return [
        `\\[ 
        \\begin{array}{ll}
        S_{User(${rowIndex + 1},${colIndex + 1
        })} &: \\text{Mean-Centered pada user} \\ ${rowIndex + 1
        } \\ \\text{terhadap item} \\ ${colIndex + 1} \\\\
        Sim_{User(${rowIndex + 1
        },v)} &: \\text{Nilai similarity antara user} \\ ${rowIndex + 1
        } \\ \\text{dan user} \\ v \\\\
        X_{u}(j) &: \\text{Himpunan tetangga (TopK) dari user} \\ ${rowIndex + 1
        } \\ \\text{untuk item} \\ ${colIndex + 1} \\\\
        \\mu_{User(${rowIndex + 1})} &: \\text{Rata-rata rating dari user} \\ ${rowIndex + 1
        } 
      \\end{array}\\]`,
      ];
    case "item-based":
      return [
        `\\[ 
        \\begin{array}{ll}
        S_{Item(${rowIndex + 1},${colIndex + 1
        })} &: \\text{Mean-Centered pada item} \\ ${colIndex + 1
        } \\ \\text{terhadap user} \\ ${rowIndex + 1} \\\\
        Sim_{Item(${colIndex + 1
        },j)} &: \\text{Nilai similarity antara item} \\ ${colIndex + 1
        } \\ \\text{dan item} \\ j \\\\
        X_{i}(j) &: \\text{Himpunan tetangga (TopK) dari item} \\ ${colIndex + 1
        } \\ \\text{untuk user} \\ ${rowIndex + 1} \\\\
        \\mu_{Item(${colIndex + 1})} &: \\text{Rata-rata rating dari item} \\ ${colIndex + 1
        } 
      \\end{array}\\]`,
      ];
    default:
      return;
  }
};

export const getFormulaArgMax = (
  rowIndex,
  colIndex,
  opsional,
  similarity,
  topSimilarity,
  kValue
) => {
  switch (opsional) {
    case "user-based":
      return `\\[  TopK_{${rowIndex + 1}}(${colIndex + 1
        })=\\ \\begin{matrix}${kValue}\\\\argmax\\ \\\\i \\in I_{${rowIndex + 1
        }} \\end{matrix}Sim(i,${colIndex + 1})\\ = \\ \\{ ${topSimilarity
          .map((sim) => sim.index + 1)
          .join(",")} \\} \\]`;
    case "item-based":
      return `\\[  TopK_{${colIndex + 1}}(${rowIndex + 1
        })=\\ \\begin{matrix}${kValue}\\\\argmax\\ \\\\u \\in U_{${colIndex + 1
        }} \\end{matrix}Sim(${rowIndex + 1},u)\\ = \\{ ${topSimilarity
          .map((sim) => sim.index + 1)
          .join(",")} \\} \\]`;
    default:
      return;
  }
};

export const getFormulaPredictionIndex = (
  rowIndex,
  colIndex,
  similarity,
  opsional
) => {
  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "item-based"
        : "user-based"
      : opsional;

  switch (opsionalModify) {
    case "user-based":
      return `\\[ {\\hat{r}_{${rowIndex + 1},${colIndex + 1}}} = \\mu_{${rowIndex + 1
        }} +\\frac{\\sum_{v\\in X_{${rowIndex + 1}}(${colIndex + 1})} Sim_{${rowIndex + 1
        }v} * s_{v${colIndex + 1}}}{\\sum_{v \\in X_{${rowIndex + 1}}(${colIndex + 1
        })}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`;
    case "item-based":
      return `\\[ {\\hat{r}_{${rowIndex + 1},${colIndex + 1}}} = \\mu_{${colIndex + 1
        }} +\\frac{\\sum_{v\\in X_{${colIndex + 1}}(${rowIndex + 1})} Sim_{v${rowIndex + 1
        }} * s_{${colIndex + 1}v}}{\\sum_{v \\in X_{${colIndex + 1}}(${rowIndex + 1
        })}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`;
    default:
      return;
  }
};

export const getFormulaPredictionValue = (
  rowIndex,
  colIndex,
  similarValues,
  result,
  dataRating,
  similarity,
  opsional,
  isNotation,
  selectedValue
) => {
  const resultMeanCentered = result["mean-centered"]
  const resultDataRating = similarity
  const resultMean = result["mean-list"]

  switch (opsional) {
    case "user-based":
      const numeratorUser = sum(
        similarValues
          .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
          .map(
            (sim) =>
              sim.value.toFixed(4) *
              resultMeanCentered[sim.index][colIndex].toFixed(2)
          )
      );
      const denominatorUser = sum(
        similarValues
          .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
          .map((sim) => Math.abs(sim.value.toFixed(4)))
      );

      // console.log("resultMean[rowIndex]", resultMean[rowIndex]);
      // console.log("numeratorUser", numeratorUser);
      // console.log("denominatorUser", denominatorUser);
      return {
        formula: !isNotation
          ? `\\[ {\\hat{r}_{(${rowIndex + 1},${colIndex + 1})}} = {${resultMean[
            rowIndex
          ].toFixed(3)}} + \\frac{${similarValues
            .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
            .map(
              (sim) =>
                `\\left(${sim.value.toFixed(4)} * \\left(${resultMeanCentered[
                  sim.index
                ][colIndex].toFixed(2)}\\right)\\right)`
            )
            .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid ${sim.value.toFixed(4)} \\mid`)
              .join(" + ")}} \\]`
          : `\\[ {\\hat{r}_{(${rowIndex + 1},${colIndex + 1})}} = {\\mu_{${rowIndex + 1
          }}} + \\frac{${similarValues
            .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
            .map(
              (sim) =>
                `\\left(Sim_{${sim.index + 1}${colIndex + 1}} * \\left(s_{${sim.index + 1
                }${colIndex + 1}}\\right)\\right)`
            )
            .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid Sim_{${sim.index + 1}${colIndex + 1}} \\mid`)
              .join(" + ")}} \\]`,
        proses_formula: `\\[ \\hat{r}_{(${rowIndex + 1},${colIndex + 1
          })} = ${resultMean[rowIndex].toFixed(
            3
          )} + \\frac{${numeratorUser.toFixed(4)}}{${denominatorUser.toFixed(
            4
          )}} \\]`,
        result: `\\[ \\hat{r}_{(${rowIndex + 1},${colIndex + 1
          })} = ${selectedValue.toFixed(3)} \\]`,
      };

    case "item-based":
      const numeratorItem = sum(
        similarValues
          .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
          .map(
            (sim) =>
              sim.value.toFixed(4) *
              resultMeanCentered[sim.index][colIndex].toFixed(2)
          )
      );
      const denominatorItem = sum(
        similarValues
          .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
          .map((sim) => Math.abs(sim.value.toFixed(4)))
      );
      // console.log("resultMean[rowIndex]", resultMean[rowIndex]);
      // console.log("numeratorItem", numeratorItem);
      // console.log("denominatorItem", denominatorItem);

      return {
        formula: !isNotation
          ? `\\[ {\\hat{r}_{(${rowIndex + 1},${colIndex + 1})}} = {${resultMean[
            colIndex
          ].toFixed(3)}} + \\frac{${similarValues
            .filter((sim) => resultDataRating[sim.index][rowIndex] !== 0)
            .map(
              (sim) =>
                `\\left(${sim.value.toFixed(4)} * \\left(${resultMeanCentered[
                  sim.index
                ][rowIndex].toFixed(2)}\\right)\\right)`
            )
            .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][rowIndex] !== 0)
              .map((sim) => `\\mid ${sim.value.toFixed(4)} \\mid`)
              .join(" + ")}} \\]`
          : `\\[ {\\hat{r_{(${rowIndex + 1},${colIndex + 1})}}} = {\\mu_{${rowIndex + 1
          }}} + \\frac{${similarValues
            .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
            .map(
              (sim) =>
                `\\left(Sim_{${rowIndex + 1}${sim.index + 1}} * \\left(s_{${rowIndex + 1
                }${sim.index + 1}}\\right)\\right)`
            )
            .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid Sim_{${rowIndex + 1}${sim.index + 1}} \\mid`)
              .join(" + ")}} \\]`,
        proses_formula: `\\[ \\hat{r}_{${rowIndex + 1},${colIndex + 1
          }} = ${resultMean[colIndex].toFixed(
            3
          )} + \\frac{${numeratorItem.toFixed(4)}}{${denominatorItem.toFixed(
            4
          )}} \\]`,
        result: `\\[ \\hat{r}_{${rowIndex + 1},${colIndex + 1
          }} = ${selectedValue.toFixed(3)} \\]`,
      };

    default:
      return;
  }
};
