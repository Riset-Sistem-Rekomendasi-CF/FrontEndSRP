export default function CardBanner({
  heading2,
  heading1,
  paragraph,
  bgColor,
  imgSrc,
}) {
  return (
    <section className=" py-8 font-poppins">
      <div className="container mx-auto px-4 rounded-xl">
        {/* Card Container */}
        <div
          className={`max-w-7xl mx-auto ${bgColor}  flex flex-col md:flex-row overflow-hidden`}
        >
          {/* Image Section (Left) */}
          <div className="w-full md:w-1/3">
            <img
              src={imgSrc}
              alt="Example"
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          {/* Content Section (Right) */}
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              {heading2}
            </h2>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {heading1}
            </h1>
            <p className="text-base sm:text-lg text-white">{paragraph}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
