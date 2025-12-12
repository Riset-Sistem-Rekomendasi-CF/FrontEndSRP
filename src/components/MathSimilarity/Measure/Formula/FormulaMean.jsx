import { sum } from "../../../../helper/Measure";

export const getFormulaMean = (opsional) => {
  switch (opsional) {
    case "user-based":
      return {
        formula: `\\[ \\mu_{User(u)} = \\frac{\\sum_{i\\in I_{u}} r_{ui}}{\\left|I_{u}\\right|} \\ \\ \\  \\forall u\\in\\left\\{1...m\\right\\} \\]`,
        formula_detail: [
          `\\[
           \\begin{array}{ll}
      \\mu_{User(u)} &: \\text{Mean rating pada user } u \\\\
      I_{u} &: \\text{Himpunan item yang telah diberi rating oleh user } u \\\\
      r_{ui} &: \\text{Nilai Rating user terhadap item } i
    \\end{array}\\]`,
        ],
      };
    case "item-based":
      return {
        formula: `\\[ \\mu_{Item(i)} = \\frac{\\sum_{u\\in U_{i}} r_{ui}}{\\left|U_{i}\\right|}  \\ \\ \\   \\forall u\\in\\left\\{1...m\\right\\} \\]`,
        formula_detail: [
          `\\[
            \\begin{array}{ll}
              \\mu_{Item(i)} & : \\text{Mean rating pada item } i \\\\
              U_{i} & : \\text{Himpunan user yang telah memberikan rating pada item } i \\\\
              r_{ui} & : \\text{Rating user } u \\text{ terhadap item } i
            \\end{array}
          \\]`,
        ],
      };
    default:
      return { formula: "", formula_detail: [] };
  }
};

// detail rumus pada formula index
export const getDetailFormulaMeanIndex = (opsional, selectedIndex) => {
  switch (opsional) {
    case "user-based":
      return [
        `\\[
          \\begin{array}{ll}
            \\mu_{User(${
              selectedIndex[0] + 1
            })} & : \\text{Mean rating pada user } ${
          selectedIndex[0] + 1
        } \\ (u_{${selectedIndex[0] + 1}}) \\\\
            I_{u_{${
              selectedIndex[0] + 1
            }}} & : \\text{Himpunan item yang telah diberi rating oleh user } ${
          selectedIndex[0] + 1
        } \\ (u_{${selectedIndex[0] + 1}}) \\\\
            r_{u_{${
              selectedIndex[0] + 1
            }},i} & : \\text{Nilai rating user } u_{${
          selectedIndex[0] + 1
        }} \\ \\text{terhadap item } i
          \\end{array}
        \\]`,
      ];

    case "item-based":
      return [
        `\\[
          \\begin{array}{ll}
            \\mu_{Item(${
              selectedIndex[0] + 1
            })} & : \\text{Mean rating pada item } ${
          selectedIndex[0] + 1
        } \\ (i_{${selectedIndex[0] + 1}}) \\\\
            U_{${
              selectedIndex[0] + 1
            }} & : \\text{Himpunan user yang telah memberikan rating pada item } ${
          selectedIndex[0] + 1
        } \\ (i_{${selectedIndex[0] + 1}}) \\\\
            r_{u,${
              selectedIndex[0] + 1
            }} & : \\text{Rating user } u \\ \\text{terhadap item } ${
          selectedIndex[0] + 1
        }
          \\end{array}
        \\]`,
      ];

    default:
      return;
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
