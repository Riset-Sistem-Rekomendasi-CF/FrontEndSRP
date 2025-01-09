import React from "react";

export default function CardStepper({ steps }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white ">
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-5 mt-4 md:mt-0 border border-gray-300 rounded-sms">
        {steps.map((step) => (
          <section className="step-section p-6 bg-white rounded-sm shadow-sm font-poppins">
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-black tex-md font-semibold">
              {step.description}
            </p>
            <div className="mt-4 text-black text-justify">
              {/* Dynamic content area */}
              {step.content && <p>{step.content}</p>}
              {step.additionalInfo && <div>{step.additionalInfo}</div>}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
