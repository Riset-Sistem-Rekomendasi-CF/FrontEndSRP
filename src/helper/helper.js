/**
 * 
 * @param {number} long 
 * @param {object} range 
 * @returns {Array}
 */
export const makeArrayIndex = (long) => {
    return new Array.from({ length: long }, (_, index) => index)
}

/**
 * 
 * @param {number} long 
 * @param {object} range 
 * @returns {Array}
 */
const makeArrayWithRandomValue = (long, range = {}) => {
    return Array.from({ length: long }, () => Math.floor((Math.random()) * range.max) + range.min)
}

/**
 * 
 * @param {number} x panjang 
 * @param {number} y lebar 
 * @param {object} range  
 * @returns {Array}
 */
export const makeArray = (x, y, range = {}) => {
    return Array.apply(null, Array(x)).map(() => makeArrayWithRandomValue(y, range))
}

/**
 * 
 * @param {number} data 
 * @param {number} sparsityPersen 
 * @returns {Error}
 */
export const sparsityIndexDeterminate = (data, sparsityPersen) => {
    if (!data || data.length === 0 || !data[0] || data[0].length === 0) {
        throw new Error("Data tidak valid.");
    }

    const totalCells = data.length * data[0].length;
    const sparsityCount = Math.round(totalCells * (sparsityPersen / 100));

    // console.log("Sparsity Count:", sparsityCount, "Total Cells:", totalCells);

    const indices = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            indices.push([i, j]);
        }
    }

    let resultIndex = Array(data.length).fill().map(() => Array(data[0].length).fill(null));

    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    for (let k = 0; k < sparsityCount; k++) {
        const [i, j] = shuffledIndices[k];
        resultIndex[i][j] = j;
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (resultIndex[i][j] === null) {
                resultIndex[i][j] = 0;
            }
        }
    }

    return resultIndex;
};

export const makeSparsity = (panjang, lebar, sparsityPercent, rangeData) => {
    const result = makeArray(panjang, lebar, rangeData)
    const sparsityIndex = sparsityIndexDeterminate(result, sparsityPercent)
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (sparsityIndex[i][j] !== 0) {
                result[i][j] = 0
            }
        }
    }
    return result
}

export const transposeMatrix = data => {

    return data[0].map((col, i) => {
        return data.map(row => row[i])
    })
}