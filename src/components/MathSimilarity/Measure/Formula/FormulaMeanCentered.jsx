import { transposeMatrix } from "../../../../helper/helper";

export const getFormulaMeanCentered = (opsional) => {
  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ S_{User{(u,i)}} = r_{ui} -\\mu_{User(u)}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
        detail_formula: [
          `\\[ S_{User{(u,i)}} = \\textit{Mean-centered} \\ \\text{pada} \\ \\textit{user u} \\ \\text{terhadap} \\ \\textit{item i} \\] `,
          `\\[ r_{ui} = \\textit{Rating } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
          `\\[ \\mu_{User(u)} = \\textit{Mean rating} \\ \\text{pada} \\ \\textit{user} \\ u \\] `,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ S_{Item{(u,i)}} = r_{ui} -\\mu_{Item(i)}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`,
        detail_formula: [
          `\\[ S_{Item{(u,i)}} = \\textit{Mean-centered} \\ \\text{pada} \\ \\textit{item i} \\ \\text{terhadap} \\ \\textit{user u} \\] `,
          `\\[ r_{ui} = \\textit{Rating} \\ \\textit{user} \\ u \\text{ terhadap} \\ \\textit{item} \\ i \\]`,
          `\\[ \\mu_{Item(i)} = \\textit{Mean rating} \\ \\text{pada} \\ \\textit{item} \\ i \\] `,
        ],
      };
    default:
      return;
  }
};

export const getFormulaMeanCenteredIndex = (rowIndex, colIndex, opsional) => {
  switch (opsional) {
    case "user-based":
      return `\\[S_{(u_{${rowIndex + 1}}, i_{${colIndex + 1}})} = 
      r_{u_{${rowIndex + 1}}, i_{${colIndex + 1}}} - \\mu_{User(u_{${
        rowIndex + 1
      }})}\\]`;

    case "item-based":
      return `\\[S_{(u_{${rowIndex + 1}}, i_{${colIndex + 1}})} = 
      r_{u_{${rowIndex + 1}}, i_{${colIndex + 1}}} - \\mu_{Item(i_{${
        colIndex + 1
      }})}\\]`;

    default:
      return;
  }
};

export const getFormulaMeanCenteredValue = (
  rowIndex,
  colIndex,
  data,
  result,
  opsional,
  selectedValue
) => {
  const selectedValueRating =
    rowIndex !== null && colIndex !== null
      ? opsional === "user-based"
        ? transposeMatrix(data)[colIndex][rowIndex]
        : data[rowIndex][colIndex]
      : null;

  const selectedMeanValue =
    rowIndex !== null
      ? result["mean-list"][opsional === "user-based" ? rowIndex : colIndex]
      : null;

  return {
    formula: `\\[ S_{${rowIndex + 1}${
      colIndex + 1
    }} = ${selectedValueRating} - ${selectedMeanValue.toFixed(2)} \\]`,
    result: `\\[ S_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue.toFixed(
      2
    )} \\]`,
  };
};
