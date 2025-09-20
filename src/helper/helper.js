import { useState, useEffect } from 'react';
import { sum } from "./Measure"

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

    // Buat daftar semua indeks matriks
    const indices = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            indices.push([i, j]);
        }
    }

    // Shuffle (acak) indeks
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    // Inisialisasi matriks hasil
    let resultIndex = Array(data.length).fill().map(() => Array(data[0].length).fill(null));

    // Isi sparsity sesuai dengan jumlah yang dihitung
    for (let k = 0; k < sparsityCount; k++) {
        const [i, j] = shuffledIndices[k];
        resultIndex[i][j] = "?"; // Gunakan "?" sebagai tanda sparsity
    }

    // Kembalikan matriks hasil
    return resultIndex;
};

export const makeSparsityArray = (panjang, lebar, sparsityPercent, rangeData) => {
    // Buat data awal
    const result = makeArray(panjang, lebar, rangeData);

    // Tentukan indeks sparsity
    const sparsityIndex = sparsityIndexDeterminate(result, sparsityPercent);

    // Gunakan indeks sparsity untuk mengubah data
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (sparsityIndex[i][j] === "?") {
                result[i][j] = 0; // Ubah elemen menjadi 0 jika sparsity
            }
        }
    }
    return result;
};

export const makeSparsity = (panjang, lebar, sparsityPercent, rangeData) => {
    let index = 0
    while (index < 100) {
        const array = makeSparsityArray(panjang, lebar, sparsityPercent, rangeData)
        if (!checkEmptyRowOrColumn(array)) {
            return array
        }
        index++
    }
    return false
}


export const checkEmptyRowOrColumn = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (sum(data[i]) === 0) {
            return true
        }
    }

    for (let i = 0; i < transposeMatrix(data).length; i++) {
        if (sum(transposeMatrix(data)[i]) === 0) {
            return true
        }
    }


    return false
}

export const transposeMatrix = data => {
    return data[0].map((col, i) => {
        return data.map(row => row[i])
    })
}

export const intersection = (data1, data2) => {
    return data1.filter(val => data2.includes(val))
}

export const intersectionIndex = (data1, data2) => {
    return data1
        .map((val, idx) => data2.includes(val) ? idx : -1)
        .filter(idx => idx !== -1)
}

/**
 * 
 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {*} array 
 * @returns Array
 */
export const shuffle = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array
}