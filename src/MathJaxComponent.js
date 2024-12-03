import React, { useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import mathjaxConfig from './mathjax-config';

const MathJaxComponent = ({ children }) => {

    // useEffect(() => {
    //     console.log("undone");

    //     if (window.MathJax) {
    //         window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    //         console.log("done");
    //     }
    // }, [children])

    return (
        <MathJaxContext options={mathjaxConfig}>
            <MathJax dynamic inline>
                {children}
            </MathJax>
        </MathJaxContext>
    );
};


export default MathJaxComponent






