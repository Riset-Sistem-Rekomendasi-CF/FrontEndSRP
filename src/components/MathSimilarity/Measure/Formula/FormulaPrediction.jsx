import { transposeMatrix } from "../../../../helper/helper";
import { sum } from "../../../../helper/Measure";

export const getFormulaPrediction = (similarity, opsional) => {
  const opsionalModify =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "item-based"
        : "user-based"
      : opsional;

  switch (opsionalModify) {
    case "user-based":
      return {
        formula: `\\[ {\\widetilde{r}_{uv}} = \\mu_{u} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{uv}* s_{vi}}{\\sum_{v \\in  X_{u}(i)}\\mid Sim_{uv} \\mid} \\]`,
        arg_max: `\\[  X_{u}(i)=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ \\ U_{i}\\\\\\end{matrix}{Sim_{ju}}\\  \\]`,
        detail_formula: [
          `\\[ \\mu_{user(u)} = \\text{Rata-rata } \\textit{rating } \\text{pada } \\textit{user u} \\] `,
          `\\[ s_{vi} = \\textit{Mean centered } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ v \\text{ pada } \\textit{item i} \\]`,
          `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
          `\\[ X_{u}(i) = \\text{Himpunan tetangga (top-k) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\]`,
        ],
        TopN: `\\[  TopN_u=\\ \\begin{matrix}N\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\widetilde{r}}_{ui}\\  \\]`,
        detailTopN_formula: [
          `\\[N = \\text{Data jumlah rekomendasi } \\text{ pada himpunan } \\textit{ item } \\text{ target }  {\\widetilde{r}}_{uv} \\]`,
          `\\[{\\widetilde{r}_{uv}} = \\text{Hasil prediksi } \\textit{rating similarity} \\text{ antara } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ v \\]`,
          `\\[{\\hat{I}_u} = \\text{Himpunan } \\textit{ item } \\text{yang belum di } \\textit{rating} \\]`,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{i} +\\frac{\\sum_{j\\in X_{i}(u)} Sim_{ij}* s_{uj}}{\\sum_{j \\in X_{i}(u)}\\mid Sim_{ij} \\mid} \\]`,
        arg_max: `\\[  X_{i}(u)=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ I_{i}\\\\\\end{matrix}{ Sim_{ju}}\\  \\]`,
        detail_formula: [
          `\\[ \\mu_{item(i)} = \\text{Rata-rata } \\textit{rating } \\text{pada } \\textit{item i} \\] `,
          `\\[ s_{uj} = \\textit{Mean centered } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada } \\textit{item j} \\]`,
          `\\[ Sim_{ij} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j \\]`,
          `\\[ X_{i}(u) = \\text{Himpunan tetangga (top-k) dari } \\textit{item} \\ i \\text{ untuk } \\textit{user} \\ u \\]`,
        ],
        TopN: `\\[  TopN_i=\\ \\begin{matrix}n\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\widetilde{r}}_{ui}\\  \\]`,
        detailTopN_formula: [
          `\\[N = \\text{Data jumlah rekomendasi } \\text{ pada himpunan } \\textit{ item } \\text{ target }  {\\widetilde{r}}_{ui} \\]`,
          `\\[{\\widetilde{r}_{ui}} = \\text{Hasil prediksi } \\textit{rating } \\text{ antara } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
          `\\[{\\hat{I}_u} = \\text{Himpunan } \\textit{ item } \\text{yang belum di }  \\textit{rating} \\]`,
        ],
      };
    default:
      return;
  }
};

export const getFormulaArgMax = (
  rowIndex,
  colIndex,
  opsional,
  similarity,
  topSimilarity
) => {
  switch (opsional) {
    case "user-based":
      return `\\[  X_{${rowIndex + 1}}(${
        colIndex + 1
      })=\\ \\begin{matrix}2\\\\argmax\\ \\\\i \\in I_{${
        rowIndex + 1
      }} \\end{matrix}Sim(i,${colIndex + 1})\\ = \\ \\{ ${topSimilarity
        .map((sim) => sim.index + 1)
        .join(",")} \\} \\]`;
    case "item-based":
      return `\\[  X_{${colIndex + 1}}(${
        rowIndex + 1
      })=\\ \\begin{matrix}2\\\\argmax\\ \\\\u \\in U_{${
        colIndex + 1
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
      return `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = \\mu_{${
        rowIndex + 1
      }} +\\frac{\\sum_{v\\in X_{${rowIndex + 1}}(${colIndex + 1})} Sim_{${
        rowIndex + 1
      }v} \\times s_{v${colIndex + 1}}}{\\sum_{v \\in X_{${rowIndex + 1}}(${
        colIndex + 1
      })}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`;
    case "item-based":
      return `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = \\mu_{${
        colIndex + 1
      }} +\\frac{\\sum_{v\\in X_{${colIndex + 1}}(${rowIndex + 1})} Sim_{v${
        rowIndex + 1
      }} \\times s_{${colIndex + 1}v}}{\\sum_{v \\in X_{${colIndex + 1}}(${
        rowIndex + 1
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
  const resultMeanCentered =
    similarity === "Adjusted Cosine"
      ? transposeMatrix(result["mean-centered-brother"])
      : result["mean-centered"];
  const resultDataRating =
    similarity === "Adjusted Cosine"
      ? transposeMatrix(dataRating)
      : opsional === "user-based"
      ? dataRating
      : transposeMatrix(dataRating);

  const resultMean =
    similarity === "Adjusted Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];

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
          ? `\\[ {\\widetilde{r}_{${rowIndex + 1}${
              colIndex + 1
            }}} = {${resultMean[rowIndex].toFixed(3)}} + \\frac{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map(
                (sim) =>
                  `\\left(${sim.value.toFixed(
                    4
                  )} \\times \\left(${resultMeanCentered[sim.index][
                    colIndex
                  ].toFixed(2)}\\right)\\right)`
              )
              .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid ${sim.value.toFixed(4)} \\mid`)
              .join(" + ")}} \\]`
          : `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = {\\mu_{${
              rowIndex + 1
            }}} + \\frac{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map(
                (sim) =>
                  `\\left(Sim_{${sim.index + 1}${
                    colIndex + 1
                  }} \\times \\left(s_{${sim.index + 1}${
                    colIndex + 1
                  }}\\right)\\right)`
              )
              .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid Sim_{${sim.index + 1}${colIndex + 1}} \\mid`)
              .join(" + ")}} \\]`,
        proses_formula: `\\[ \\widetilde{r}_{${rowIndex + 1}${
          colIndex + 1
        }} = ${resultMean[rowIndex].toFixed(
          3
        )} + \\frac{${numeratorUser.toFixed(4)}}{${denominatorUser.toFixed(
          4
        )}} \\]`,
        result: `\\[ \\widetilde{r}_{${rowIndex + 1}${
          colIndex + 1
        }} = ${selectedValue.toFixed(3)} \\]`,
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
          ? `\\[ {\\widetilde{r}_{${rowIndex + 1}${
              colIndex + 1
            }}} = {${resultMean[colIndex].toFixed(3)}} + \\frac{${similarValues
              .filter((sim) => resultDataRating[sim.index][rowIndex] !== 0)
              .map(
                (sim) =>
                  `\\left(${sim.value.toFixed(
                    4
                  )} \\times \\left(${resultMeanCentered[sim.index][
                    rowIndex
                  ].toFixed(2)}\\right)\\right)`
              )
              .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][rowIndex] !== 0)
              .map((sim) => `\\mid ${sim.value.toFixed(4)} \\mid`)
              .join(" + ")}} \\]`
          : `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {\\mu_{${
              rowIndex + 1
            }}} + \\frac{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map(
                (sim) =>
                  `\\left(Sim_{${rowIndex + 1}${
                    sim.index + 1
                  }} \\times \\left(s_{${rowIndex + 1}${
                    sim.index + 1
                  }}\\right)\\right)`
              )
              .join(" + ")}}{${similarValues
              .filter((sim) => resultDataRating[sim.index][colIndex] !== 0)
              .map((sim) => `\\mid Sim_{${rowIndex + 1}${sim.index + 1}} \\mid`)
              .join(" + ")}} \\]`,
        proses_formula: `\\[ \\widetilde{r}_{${rowIndex + 1}${
          colIndex + 1
        }} = ${resultMean[colIndex].toFixed(
          3
        )} + \\frac{${numeratorItem.toFixed(4)}}{${denominatorItem.toFixed(
          4
        )}} \\]`,
        result: `\\[ \\widetilde{r}_{${rowIndex + 1}${
          colIndex + 1
        }} = ${selectedValue.toFixed(3)} \\]`,
      };

    default:
      return;
  }
};
