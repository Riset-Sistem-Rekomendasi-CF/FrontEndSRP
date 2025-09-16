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
  opsional
) => {
  switch (opsional) {
    case "user-based":
      return [
        `\\[ 
        \\begin{array}{ll}
        S_{User{(u_{${rowIndex + 1}}, i_{${
          colIndex + 1
        }})}} &: \\text{Mean-centered} \\ \\text{pada} \\ \\text{user} \\ ${
          rowIndex + 1
        } \\ \\text{terhadap} \\ \\text{item} \\ ${colIndex + 1} \\\\
      r_{u_{${rowIndex + 1}}, i_{${
          colIndex + 1
        }}} &: \\text{Rating } \\text{user} \\ ${
          rowIndex + 1
        } \\text{ terhadap } \\text{item} \\ ${colIndex + 1} \\\\
       \\mu_{User(u_{${
         rowIndex + 1
       }})} &: \\text{Mean rating} \\ \\text{pada} \\ \\text{user} \\ ${
          rowIndex + 1
        }  \\end{array}\\] `,
      ];
    case "item-based":
      return [
        `\\[ 
        \\begin{array}{ll}
        S_{Item{(i_{${rowIndex + 1}}, u_{${
          colIndex + 1
        }})}} &: \\text{Mean-centered} \\ \\text{pada} \\ \\text{item} \\ ${
          rowIndex + 1
        } \\ \\text{terhadap} \\ \\text{user} \\ ${colIndex + 1} \\\\
        r_{i_{${rowIndex + 1}}, u_{${
          colIndex + 1
        }}} &: \\text{Rating} \\ \\text{pada item} \\ ${
          rowIndex + 1
        } \\text{ terhadap} \\ \\text{user} \\ ${colIndex + 1} \\\\
       \\mu_{Item(i_{${
         rowIndex + 1
       }})} &: \\text{Mean rating} \\ \\text{pada} \\ \\text{item} \\ ${
          rowIndex + 1
        } \\end{array}\\] `,
      ];
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
      return `\\[S_{(i_{${rowIndex + 1}}, u_{${colIndex + 1}})} = 
      r_{i_{${rowIndex + 1}}, u_{${colIndex + 1}}} - \\mu_{Item(i_{${
        rowIndex + 1
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
    rowIndex !== null && colIndex !== null
      ? result["mean-list"][rowIndex]
      : null;

  return {
    formula: `\\[ S_{(${rowIndex + 1},${
      colIndex + 1
    })} = ${selectedValueRating} - ${selectedMeanValue?.toFixed(2)} \\]`,
    result: `\\[ S_{(${rowIndex + 1},${
      colIndex + 1
    })} = ${selectedValue?.toFixed(2)} \\]`,
  };
};
