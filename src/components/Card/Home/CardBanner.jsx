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
          className={`max-w-7xl mx-auto ${bgColor} shadow-lg rounded-lg bg-box-grid-pattern animate-grid z-0 flex flex-col md:flex-row`}
        >
          {/* Image Section (Left) */}
          <div className="md:w-1/4 rounded-lg">
            <img
              src={imgSrc}
              alt="Image Example"
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>

          {/* Content Section (Right) */}

          <div className=" md:w-3/4 p-6 flex flex-col justify-center ">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {heading2}
            </h2>
            <h1 className="text-3xl font-bold text-white mb-4">{heading1}</h1>
            <p className="text-lg text-white">{paragraph}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
