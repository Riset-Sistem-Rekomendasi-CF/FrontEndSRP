import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import mathjaxConfig from './mathjax-config';

const MathJaxComponent = ({ children }) => {
    return (
        <MathJaxContext options={mathjaxConfig}>
            <MathJax>
                {children}
            </MathJax>
        </MathJaxContext>
    );
};


export default MathJaxComponent






