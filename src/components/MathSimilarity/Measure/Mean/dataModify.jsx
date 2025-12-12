import { transposeMatrix } from "../../../../helper/helper";

export const dataModify = (data, similarity, opsional) => {
  if (similarity === "Adjusted Cosine") {
    return opsional === "user-based" ? data : transposeMatrix(data);
  } else {
    return opsional === "user-based" ? data : transposeMatrix(data);
  }
};
