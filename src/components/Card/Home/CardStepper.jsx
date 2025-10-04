import React from "react";

export default function CardStepper({ steps }) {
  return (
    <div className="w-full p-4 md:p-8 bg-white">
      {/* Main Content */}
      <main className="w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {steps.map((step, index) => (
          <section
            key={step.id || index}
            className="step-section p-4 md:p-6 bg-white font-poppins border-b last:border-b-0"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
              {step.title}
            </h2>
            <div className="text-gray-700 text-base md:text-lg font-semibold">
              {step.description}
            </div>
            <div className="mt-4 text-gray-600 text-justify text-sm md:text-base">
              {step.content && <div className="mb-2">{step.content}</div>}
              {step.additionalInfo && <div>{step.additionalInfo}</div>}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
