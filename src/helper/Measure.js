/**
 * 
 * @param {Array} data 
 * @return {Array} result
 */
export const multiply = (data) => {
    if (data.length === 0) {
        return 0
    }

    var result = 1
    data.forEach(val => {
        result *= val
    })

    return result
}

export const sum = (data) => {
    return data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    )
}