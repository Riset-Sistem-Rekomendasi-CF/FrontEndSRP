import { transposeMatrix } from "../../../../helper/helper"
import { sum } from "../../../../helper/Measure";

export const getFormulaPrediction = (similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return {
                formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{u} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{uv}* s_{vi}}{\\sum_{v \\in  X_{u}(i)}\\mid Sim_{uv} \\mid} \\]`,
                arg_max: `\\[  X_{u}(i)=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ \\ U_{i}\\\\\\end{matrix}{Sim_{ju}}\\  \\]`,
                detail_formula: [
                    `\\[ s_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} \\]`,
                    `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
                    `\\[ X_{u}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\]`
                ],
                TopN: `\\[  TopN_u=\\ \\begin{matrix}n\\\\argmax\\ \\\\i\\ \\in\\ \\ \\hat{I}_u \\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`
            };
        case "item-based":
            return {
                formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{i} +\\frac{\\sum_{j\\in X_{i}(u)} Sim_{uv}* s_{uj}}{\\sum_{j \\in X_{i}(u)}\\mid Sim_{ij} \\mid} \\]`,
                arg_max: `\\[  X_{i}(u)=\\ \\begin{matrix}k\\\\argmax\\ \\\\j\\ \\in\\ I_{i}\\\\\\end{matrix}{ Sim_{ju}}\\  \\]`,
                detail_formula: [
                    `\\[ s_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} \\]`,
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
    switch (opsional) {
        case "user-based":
            return `\\[  X_{${(rowIndex + 1)}}(${(colIndex + 1)})=\\ \\begin{matrix}2\\\\argmax\\ \\\\i \\in I_{${(rowIndex + 1)}} \\end{matrix}Sim(i,${(colIndex + 1)})\\ = \\ \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        case "item-based":
            return `\\[  X_{${(colIndex + 1)}}(${(rowIndex + 1)})=\\ \\begin{matrix}2\\\\argmax\\ \\\\u \\in U_{${(colIndex + 1)}} \\end{matrix}Sim(${(rowIndex + 1)},u)\\ = \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        default:
            return;
    }
}

export const getFormulaPredictionIndex = (rowIndex, colIndex, similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = \\mu_{${rowIndex + 1}} +\\frac{\\sum_{v\\in X_{${rowIndex + 1}}(${colIndex + 1})} Sim_{${rowIndex + 1}v} \\times s_{v${colIndex + 1}}}{\\sum_{v \\in X_{${rowIndex + 1}}(${colIndex + 1})}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        case "item-based":
            return `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = \\mu_{${colIndex + 1}} +\\frac{\\sum_{v\\in X_{${(colIndex + 1)}}(${(rowIndex + 1)})} Sim_{v${rowIndex + 1}} \\times s_{${colIndex + 1}v}}{\\sum_{v \\in X_{${(colIndex + 1)}}(${(rowIndex + 1)})}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        default:
            return;
    }
}

export const getFormulaPredictionValue = (rowIndex, colIndex, similarValues, result, dataRating, similarity, opsional, isNotation, selectedValue) => {
    const resultMeanCentered = similarity === "Adjusted Vector Cosine" ? transposeMatrix(result["mean-centered-brother"]) : result["mean-centered"]
    const resultDataRating = similarity === "Adjusted Vector Cosine" ? transposeMatrix(dataRating) : (opsional === "user-based" ? dataRating : transposeMatrix(dataRating))

    const resultMean = similarity === "Adjusted Vector Cosine" ? (result["mean-list-brother"]) : result["mean-list"]



    switch (opsional) {
        case "user-based":
            const numeratorUser = sum(similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => sim.value.toFixed(4) * resultMeanCentered[sim.index][colIndex].toFixed(2)))
            const denominatorUser = sum(similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => Math.abs(sim.value.toFixed(4))))

            console.log("resultMean[rowIndex]", resultMean[rowIndex]);
            console.log("numeratorUser", numeratorUser);
            console.log("denominatorUser", denominatorUser);
            return {
                formula: !isNotation ? `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = {${resultMean[rowIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][colIndex].toFixed(2)}\\right)\\right)`)).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`).join(' + ')}} \\]` : `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = {\\mu_{${rowIndex + 1}}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => (`\\left(Sim_{${sim.index + 1}${(colIndex + 1)}} \\times \\left(s_{${sim.index + 1}${(colIndex + 1)}}\\right)\\right)`)).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => `\\mid Sim_{${sim.index + 1}${(colIndex + 1)}} \\mid`).join(' + ')}} \\]`,
                proses_formula: `\\[ \\widetilde{r}_{${rowIndex + 1}${colIndex + 1}} = ${resultMean[rowIndex].toFixed(3)} + \\frac{${numeratorUser.toFixed(4)}}{${denominatorUser.toFixed(4)}} \\]`,
                result: `\\[ \\widetilde{r}_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue.toFixed(3)} \\]`
            };


        case "item-based":

            const numeratorItem = sum(similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => sim.value.toFixed(4) * resultMeanCentered[sim.index][colIndex].toFixed(2)))
            const denominatorItem = sum(similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => Math.abs(sim.value.toFixed(4))))
            console.log("resultMean[rowIndex]", resultMean[rowIndex]);
            console.log("numeratorItem", numeratorItem);
            console.log("denominatorItem", denominatorItem);

            return {
                formula: !isNotation ? `\\[ {\\widetilde{r}_{${rowIndex + 1}${colIndex + 1}}} = {${resultMean[colIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][rowIndex] !== 0).map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][rowIndex].toFixed(2)}\\right)\\right)`)).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][rowIndex] !== 0).map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`).join(' + ')}} \\]` : `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {\\mu_{${rowIndex + 1}}} + \\frac{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => (`\\left(Sim_{${(rowIndex + 1)}${sim.index + 1}} \\times \\left(s_{${(rowIndex + 1)}${sim.index + 1}}\\right)\\right)`)).join(' + ')}}{${similarValues.filter(sim => resultDataRating[sim.index][colIndex] !== 0).map(sim => `\\mid Sim_{${(rowIndex + 1)}${sim.index + 1}} \\mid`).join(' + ')}} \\]`,
                proses_formula: `\\[ \\widetilde{r}_{${rowIndex + 1}${colIndex + 1}} = ${resultMean[rowIndex].toFixed(3)} + \\frac{${numeratorItem.toFixed(4)}}{${denominatorItem.toFixed(4)}} \\]`,
                result: `\\[ \\widetilde{r}_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue.toFixed(3)} \\]`
            }

        default:
            return
    }
}