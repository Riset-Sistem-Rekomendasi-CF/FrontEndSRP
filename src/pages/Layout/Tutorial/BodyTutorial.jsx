import React from "react";

const BodyTutorial = ({ header, subheader, id, children }) => {
  return (
    <section id={id} className="max-w-4xl mx-auto text-center py-10">
      <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins py-5 sm:py-6 md:py-8 lg:py-10">
        {header}
      </h1>
      <p className="font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-poppins my-3 sm:my-4 md:my-5 lg:my-6">
        {subheader}
      </p>

      <div>{children}</div>
    </section>
  );
};

export default BodyTutorial;
