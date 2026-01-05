// import React, { useEffect } from 'react';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';
// import mathjaxConfig from './mathjax-config';
// import debounce from 'lodash.debounce';

// const MathJaxComponent = ({ children }) => {
//     useEffect(() => {
//         const debouncedRender = debounce(() => {
//             if (window.MathJax) {
//                 window.MathJax.typesetPromise && window.MathJax.typesetPromise();
//             }
//         }, 300); // Debouncing selama 300ms

//         debouncedRender();

//         return () => debouncedRender.cancel();
//     }, [children]);

//     return (
//         <MathJaxContext options={mathjaxConfig}>
//             <MathJax dynamic inline>
//                 {children}
//             </MathJax>
//         </MathJaxContext>
//     );
// };

// export default MathJaxComponent;

// export default MathJaxComponent;

import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "./mathjax-config";

const MathJaxComponent = ({ children, className }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [children]);

  if (!children || typeof children !== "string") return null;

  return (
    <MathJaxContext version={3} config={mathjaxConfig}>
      {!ready ? (
        <div className="flex justify-center items-center h-10">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        <div className={className}>
          <MathJax dynamic>{children}</MathJax>
        </div>
      )}
    </MathJaxContext>
  );
};

export default MathJaxComponent;
