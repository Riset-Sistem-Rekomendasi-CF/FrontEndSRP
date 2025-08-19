import React from "react";

const FieldForm = React.memo(({ increment, children, header }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
          {increment}
        </div>
        <h1 className="text-2xl font-bold font-poppins py-10 px-3">{header}</h1>
      </div>
      {children}
    </div>
  );
});

const FormLayoutTutorial = ({ data, id }) => {
  return (
    <section id={id} className="max-w-6xl mx-auto text-center p-5">
      <h1 className="text-5xl sm:text-6xl font-bold font-poppins py-10">
        Pilih Metode Prediksi dan Fungsi Similaritas
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-around gap-8 sm:gap-10">
        {data.map((list, index) => {
          return (
            <FieldForm key={index} increment={index + 1} header={list.header}>
              {list.element}
            </FieldForm>
          );
        })}
      </div>
    </section>
  );
};

export default FormLayoutTutorial;
