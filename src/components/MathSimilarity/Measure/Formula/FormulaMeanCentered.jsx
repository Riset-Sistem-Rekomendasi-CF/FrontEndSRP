import { transposeMatrix } from "../../../../helper/helper";

export const getFormulaMeanCentered = (opsional) => {

    switch (opsional) {
        case "user-based":
            return {
                formula: `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
                detail_formula: [
                    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                ]
            }
        case "item-based":
            return {
                formula: `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`,
                detail_formula: [
                    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                    `\\[ \\mu_{i} = \\text{Rata-rata pada user i} \\] `,
                ]
            }
        default:
            return;
    }
}

export const getFormulaMeanCenteredIndex = (rowIndex, colIndex, opsional) => {
    switch (opsional) {
        case "user-based":
            return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = r_{${colIndex + 1}${rowIndex + 1}} -\\mu_{${(rowIndex) + 1}} \\]`
        case "item-based":
            return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = r_{${rowIndex + 1}${colIndex + 1}} -\\mu_{${(colIndex) + 1}} \\]`

        default:
            return
    }
}

export const getFormulaMeanCenteredValue = (rowIndex, colIndex, data, result, opsional, similarity) => {

    const selectedValue = rowIndex !== null && colIndex !== null ?
        (
            (opsional === "user-based" ? transposeMatrix(data)[colIndex][rowIndex] : data[rowIndex][colIndex])
        )
        : null

    const selectedMeanValue = rowIndex !== null ? result['mean-list'][opsional === "user-based" ? rowIndex : colIndex] : null

    return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue} - ${selectedMeanValue} \\]`
}