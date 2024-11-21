import { transposeMatrix } from "../../../../helper/helper"

export const getFormulaPrediction = (similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return {
                formula: `\\[ {\\widetilde{r_{ui}}} = \\mu_{u} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{uv}* S_{vi}}{\\sum_{v \\in  X_{u}(j)}\\mid Sim_{uv} \\mid} \\]`,
                arg_max: `\\[  X_u(j)=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ \\ U_{i}\\\\\\end{matrix}{Sim_{ju}}\\  \\]`,
                detail_formula: [
                    `\\[ S_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} \\]`,
                    `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
                    `\\[ X_{u}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\]`
                ],
                TopN: `\\[  TopN_u=\\ \\begin{matrix}n\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`
            };
        case "item-based":
            return {
                formula: `\\[ {\\widetilde{r_{ui}}} = \\mu_{i} +\\frac{\\sum_{j\\in X_{i}(j)} Sim_{uv}* S_{uj}}{\\sum_{j \\in X_{i}(j)}\\mid Sim_{ij} \\mid} \\]`,
                arg_max: `\\[  N_{i}^u=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ I_{i}\\\\\\end{matrix}{ Sim_{ju}}\\  \\]`,
                detail_formula: [
                    `\\[ S_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} \\]`,
                    `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
                    `\\[ X_{i}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{item} \\ i \\text{ untuk } \\textit{user} \\ u \\]`
                ],
                TopN: `\\[  TopN_u=\\ \\begin{matrix}n\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`
            };
        default:
            return;
    }
}

export const getFormulaArgMax = (rowIndex, colIndex, opsional, similarity, topSimilarity) => {
    console.log(topSimilarity);
    switch (opsional) {
        case "user-based":
            return `\\[  N_{${(colIndex + 1)}}^{${(rowIndex + 1)}}=\\ \\begin{matrix}2\\\\argmax\\ \\\\u \\in U_{${(colIndex + 1)}} \\end{matrix}Sim(${(rowIndex + 1)},u)\\ = \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        case "item-based":
            return `\\[  N_{${(rowIndex + 1)}}^{${(colIndex + 1)}}=\\ \\begin{matrix}2\\\\argmax\\ \\\\i \\in I_{${(rowIndex + 1)}} \\end{matrix}Sim(i,${(colIndex + 1)})\\ = \\ \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        default:
            return;
    }
}

export const getFormulaPredictionIndex = (rowIndex, colIndex, similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\mu_{${rowIndex + 1}} +\\frac{\\sum_{v\\in N_{${rowIndex + 1}}^{${colIndex + 1}}} Sim_{${rowIndex + 1}v} \\times s_{v${colIndex + 1}}}{\\sum_{v \\in N_{${rowIndex + 1}}^{${colIndex + 1}}}\\mid Sim_{v${colIndex + 1}} \\mid} \\]`
        case "item-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\mu_{${colIndex + 1}} +\\frac{\\sum_{v\\in N_{${(colIndex + 1)}}^{${(rowIndex + 1)}}} Sim_{v${rowIndex + 1}} \\times s_{${colIndex + 1}v}}{\\sum_{v \\in N_{${(colIndex + 1)}}^{${(rowIndex + 1)}}}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        default:
            return;
    }
}

export const getFormulaPredictionValue = (rowIndex, colIndex, similarValues, result, dataRating, similarity, opsional, isNotation) => {
    const resultMeanCentered = similarity === "Adjusted Vector Cosine" ? transposeMatrix(result["mean-centered-brother"]) : result["mean-centered"]
    const resultDataRating = similarity === "Adjusted Vector Cosine" ? transposeMatrix(dataRating) : (opsional === "user-based" ? dataRating : transposeMatrix(dataRating))
    console.log(resultDataRating, resultMeanCentered);

    const resultMean = similarity === "Adjusted Vector Cosine" ? (result["mean-list-brother"]) : result["mean-list"]
    console.log("similarValue", similarValues);


    switch (opsional) {
        case "user-based":
            if (!isNotation) {
                return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${resultMean[rowIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                    .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][colIndex].toFixed(2)}\\right)\\right)`
                    )).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                        .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                        .join(' + ')}} \\]`;
            } else {
                return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {\\mu_{${rowIndex + 1}}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                    .map(sim => (`\\left(Sim_{${sim.index + 1}${(colIndex + 1)}} \\times \\left(S_{${sim.index + 1}${(colIndex + 1)}}\\right)\\right)`
                    )).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                        .map(sim => `\\mid Sim_{${sim.index + 1}${(colIndex + 1)}} \\mid`)
                        .join(' + ')}} \\]`;
            }

        case "item-based":
            if (!isNotation) {

                return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${resultMean[colIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][rowIndex] !== 0)
                    .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][rowIndex].toFixed(2)}\\right)\\right)`))
                    .join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][rowIndex] !== 0)
                        .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                        .join(' + ')}} \\]`
            } else {
                return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {\\mu_{${rowIndex + 1}}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                    .map(sim => (`\\left(Sim_{${(rowIndex + 1)}${sim.index + 1}} \\times \\left(S_{${(rowIndex + 1)}${sim.index + 1}}\\right)\\right)`
                    )).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0)
                        .map(sim => `\\mid Sim_{${(rowIndex + 1)}${sim.index + 1}} \\mid`)
                        .join(' + ')}} \\]`;
            }
        default:
            return
    }
}