import React, { useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import mathjaxConfig from './mathjax-config';
import debounce from 'lodash.debounce';

const MathJaxComponent = ({ children }) => {
    useEffect(() => {
        const debouncedRender = debounce(() => {
            if (window.MathJax) {
                window.MathJax.typesetPromise && window.MathJax.typesetPromise();
            }
        }, 300); // Debouncing selama 300ms

        debouncedRender();

        return () => debouncedRender.cancel();
    }, [children]);

    return (
        <MathJaxContext options={mathjaxConfig}>
            <MathJax dynamic inline>
                {children}
            </MathJax>
        </MathJaxContext>
    );
};

export default MathJaxComponent;



