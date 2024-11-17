import { useState, useEffect } from 'react';
import { getACosine, getBC, getCosine, getPearsonPC } from './api';

export const getInitialData = (data, opsional) => ({
    data: data,
    k: 2,
    opsional: opsional
});

const handleSimilarityFunction = similarity => {
    switch (similarity) {
        case "Pearson Correlation Coefficient":
            return getPearsonPC
        case "Vector Cosine":
            return getCosine
        case "Adjusted Vector Cosine":
            return getACosine
        case "Bhattacharyya Coefficient Similarity":
            return getBC
        default:
            return
    }
}

export const AllSimilaritas = (data, similaritas) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callSimilaritas = handleSimilarityFunction(similaritas)
                const response = await callSimilaritas(data);
                setResult(response.data);
                setError(null);
            } catch (err) {
                setError(err.response ? err.response.data.detail : 'Something went wrong');
                setResult(null);
            }
        };

        fetchData();
    }, [data, similaritas]);

    return { result, error };
};