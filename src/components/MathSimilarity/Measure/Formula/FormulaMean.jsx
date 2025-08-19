import { sum } from "../../../../helper/Measure";

export const getFormulaMean = (opsional) => {
  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ \\mu_{User(u)} = \\frac{\\sum_{i\\in I_{u}} r_{ui}}{\\left|I_{u}\\right|} \\ \\ \\  \\forall u\\in\\left\\{1...m\\right\\} \\]`,
        formula_detail: [
          `\\[ \\mu_{User(u)} = \\textit{Mean rating} \\ \\text{pada} \\ \\textit{user} \\ u \\] `,
          `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi} \\textit{ rating } \\text{oleh} \\ \\textit{user} \\ u \\] `,
          `\\[ r_{uj} = \\text{Nilai} \\ \\textit{Rating } \\textit{user} \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ \\mu_{Item(i)} = \\frac{\\sum_{u\\in U_{i}} r_{ui}}{\\left|U_{i}\\right|}  \\ \\ \\   \\forall u\\in\\left\\{1...m\\right\\} \\]`,
        formula_detail: [
          `\\[ \\mu_{Item(i)} = \\textit{Mean rating} \\ \\text{pada} \\ \\textit{item} \\ i \\] `,
          `\\[ U_{i} = \\text{Himpunan} \\ \\textit{user} \\ \\text{yang telah memberikan} \\ \\textit{rating} \\ \\text{pada} \\ \\textit{item} \\ i \\] `,
          `\\[ r_{ui} = \\textit{Rating} \\ \\textit{user} \\ u \\text{ terhadap} \\ \\textit{item} \\ i \\]`,
        ],
      };
    default:
      return { formula: "", formula_detail: [] };
  }
};

export const getFormulaMeanIndex = (opsional, data, selectedIndex) => {
  // console.log((opsional, data, selectedIndex));

  switch (opsional) {
    case "user-based":
      return `\\[ \\mu_{User(${
        selectedIndex[0] + 1
      })} = \\frac{\\sum_{i\\in I_{u_{${selectedIndex[0] + 1}}}} r_{u_{${
        selectedIndex[0] + 1
      }},i}}{\\left|I_{u_{${
        selectedIndex[0] + 1
      }}}\\right|} \\ \\ \\   \\forall ${
        selectedIndex[0] + 1
      }\\in\\left\\{1...${data.length}\\right\\} \\]`;

    case "item-based":
      return `\\[ \\mu_{Item(${
        selectedIndex[0] + 1
      })} = \\frac{\\sum_{i\\in U_{${selectedIndex[0] + 1}}} r_{${
        selectedIndex[0] + 1
      }i}}{\\left|U_{${selectedIndex[0] + 1}}\\right|}   \\forall ${
        selectedIndex[0] + 1
      }\\in\\left\\{1...${data.length}\\right\\} \\]`;
    default:
      return;
  }
};

export const getFormulaMeanExpression = (
  opsional,
  isNotation,
  nonZeroIndices,
  ValueData,
  selectedIndex
) => {
  switch (opsional) {
    case "user-based":
      return `\\[ \\mu_{User(${selectedIndex[0] + 1})} = \\frac{(${
        !isNotation
          ? ValueData.join(" + ")
          : nonZeroIndices
              .map((idx) => `r_{${selectedIndex[0] + 1}${idx}}`)
              .join(" + ")
      })}{ | \\left\\{ ${
        !isNotation
          ? nonZeroIndices.join(" , ")
          : nonZeroIndices.map((_, ind) => `i_{${ind + 1}}`).join(" , ")
      } \\right\\} | }   \\]`;
    case "item-based":
      return `\\[ \\mu_{Item(${selectedIndex[0] + 1})} = \\frac{(${
        !isNotation
          ? ValueData.join(" + ")
          : nonZeroIndices
              .map((idx) => `r_{${idx}${selectedIndex[0] + 1}}`)
              .join(" + ")
      })}{ | \\left\\{ ${
        !isNotation
          ? nonZeroIndices.join(" , ")
          : nonZeroIndices.map((_, ind) => `u_{${ind + 1}}`).join(" , ")
      } \\right\\} | }   \\]`;
    default:
      return;
  }
};

export const getFormulaMeanValue = (
  opsional,
  isNotation,
  nonZeroIndices,
  ValueData,
  selectedIndex,
  selectedMean
) => {
  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ \\mu_{User(${selectedIndex[0] + 1})} = \\frac{${
          !isNotation
            ? ValueData.join(" + ")
            : nonZeroIndices
                .map((val) => `r_{${val}${selectedIndex[0] + 1}}`)
                .join(" + ")
        }}{ ${
          !isNotation ? ValueData.length : `|I_{${selectedIndex[0] + 1}}|`
        }}   \\]`,
        process_formal: `\\[ \\mu_{User(${
          selectedIndex[0] + 1
        })} = \\frac{${sum(ValueData)}}{${ValueData.length}} \\]`,
        result: `\\[ \\mu_{User(${
          selectedIndex[0] + 1
        })} = ${selectedMean.toFixed(2)} \\]`,
      };

    case "item-based":
      return {
        formula: `\\[ \\mu_{Item(${selectedIndex[0] + 1})} = \\frac{${
          !isNotation
            ? ValueData.join(" + ")
            : nonZeroIndices
                .map((val) => `r_{${selectedIndex[0] + 1}${val}}`)
                .join(" + ")
        }}{ ${
          !isNotation ? ValueData.length : `|U_{${selectedIndex[0] + 1}}|`
        }}   \\]`,
        process_formal: `\\[ \\mu_{Item(${
          selectedIndex[0] + 1
        })} = \\frac{${sum(ValueData)}}{${ValueData.length}} \\]`,
        result: `\\[ \\mu_{Item(${
          selectedIndex[0] + 1
        })} = ${selectedMean.toFixed(2)} \\]`,
      };
    default:
      return;
  }
};
