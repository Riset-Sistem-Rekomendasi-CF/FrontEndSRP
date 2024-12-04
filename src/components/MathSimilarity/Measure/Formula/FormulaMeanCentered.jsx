import { transposeMatrix } from "../../../../helper/helper";

export const getFormulaMeanCentered = (opsional) => {

    switch (opsional) {
        case "user-based":
            return {
                formula: `\\[ s_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
                detail_formula: [
                    `\\[ s_{ui} = \\text{Mean-Centered pada } \\textit{user} \\ u \\] `,
                    `\\[ r_{ui} = \\textit{Rating } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
                    `\\[ \\mu_{i} = \\text{Mean } \\textit{ rating } \\text{pada } \\textit{user} \\ u \\] `
                ]
            }
        case "item-based":
            return {
                formula: `\\[ s_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`,
                detail_formula: [
                    `\\[ s_{ui} = \\text{Mean-Centered pada } \\textit{user} \\ u \\] `,
                    `\\[ r_{ui} = \\textit{Rating } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
                    `\\[ \\mu_{i} =\\text{Mean } \\textit{ rating } \\text{pada} \\textit{item} \\ i \\] `
                ]
            }
        default:
            return;
    }
}


export const getFormulaMeanCenteredIndex = (rowIndex, colIndex, opsional) => {
    switch (opsional) {
        case "user-based":
            return `\\[ s_{${rowIndex + 1}${colIndex + 1}} = r_{${colIndex + 1}${rowIndex + 1}} -\\mu_{${(rowIndex) + 1}} \\]`
        case "item-based":
            return `\\[ s_{${rowIndex + 1}${colIndex + 1}} = r_{${rowIndex + 1}${colIndex + 1}} -\\mu_{${(colIndex) + 1}} \\]`

        default:
            return
    }
}

export const getFormulaMeanCenteredValue = (rowIndex, colIndex, data, result, opsional, selectedValue) => {

    const selectedValueRating = rowIndex !== null && colIndex !== null ?
        (
            (opsional === "user-based" ? transposeMatrix(data)[colIndex][rowIndex] : data[rowIndex][colIndex])
        )
        : null

    const selectedMeanValue = rowIndex !== null ? result['mean-list'][opsional === "user-based" ? rowIndex : colIndex] : null

    return {
        formula: `\\[ s_{${rowIndex + 1}${colIndex + 1}} = ${selectedValueRating} - ${selectedMeanValue.toFixed(2)} \\]`,
        result: `\\[ s_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue.toFixed(2)} \\]`
    }
}