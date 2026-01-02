import React from "react";

export default function CardStepper({ steps }) {
  return (
    <div className="w-full p-4 md:p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Main Content */}
      <main className="w-full boverflow-hidden">
        {steps.map((step, index) => (
          <section
            key={step.id || index}
            className="step-section p-4 md:p-6 bg-white dark:bg-gray-800 font-poppins border-b dark:border-gray-700 last:border-b-0 transition-colors duration-200"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {step.title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-semibold">
              {step.description}
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-400 text-justify text-sm md:text-base">
              {step.content && <div className="mb-2">{step.content}</div>}
              {step.additionalInfo && <div>{step.additionalInfo}</div>}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
