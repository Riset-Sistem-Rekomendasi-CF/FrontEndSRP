import React from "react";

export default function CardStepper({ steps }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white ">
      {/* Main Content */}
      <main className="flex-1 border border-gray-300 rounded-sm">
        {steps.map((step, index) => (
          <section
            key={step.id || index} // Gunakan step.id jika tersedia, jika tidak pakai index
            className="step-section p-6 bg-white rounded-sm shadow-sm font-poppins"
          >
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <div className="text-black tex-md font-semibold">
              {step.description}
            </div>
            <div className="mt-4 text-black text-justify">
              {step.content && <div>{step.content}</div>}
              {step.additionalInfo && <div>{step.additionalInfo}</div>}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
