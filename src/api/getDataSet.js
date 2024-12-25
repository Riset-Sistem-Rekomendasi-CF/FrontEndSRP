import { useState, useEffect } from 'react';
import { getACosine, getBC, getCosine, getPearsonPC } from './api';

export const getInitialData = (data, opsional, k = 2) => ({
    data: data,
    k: k,
    opsional: opsional
});

const handleSimilarityFunction = similarity => {
    switch (similarity) {
        case "Pearson Correlation Coefficient":
            return getPearsonPC
        case "Cosine":
            return getCosine
        case "Adjusted Cosine":
            return getACosine
        case "Bhattacharyya Coefficient":
            return getBC
        default:
            return
    }
}

export const AllSimilaritas = (data, similaritas) => {
    const [result, setResult] = useState([]); // Inisialisasi dengan array kosong
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Untuk mencegah memory leaks

        const fetchData = async () => {
            try {
                const callSimilaritas = handleSimilarityFunction(similaritas);
                const response = await callSimilaritas(data);

                if (isMounted) {
                    setResult(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response ? err.response.data.detail : "Something went wrong");
                    setResult([]);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [data, similaritas]);

    return { result, error };
};
