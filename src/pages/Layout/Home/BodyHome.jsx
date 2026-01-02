const BodyHome = ({
  children,
  header,
  subheader,
  idName,
  hirarki = "1",
  type = "grid",
  bgColor,
}) => {
  const HeaderElement = ({ heading, children }) => {
    const NameClass =
      "text-black dark:text-white font-bold font-poppins mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight";
    switch (heading) {
      case "1":
        return (
          <h1
            className={`${NameClass} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}
          >
            {children}
          </h1>
        );
      case "2":
        return (
          <h2
            className={`${NameClass} text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
          >
            {children}
          </h2>
        );
      case "3":
        return (
          <h3
            className={`${NameClass} text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
          >
            {children}
          </h3>
        );
      case "4":
        return (
          <h4
            className={`${NameClass} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            {children}
          </h4>
        );
      case "5":
        return (
          <h5
            className={`${NameClass} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
          >
            {children}
          </h5>
        );
      default:
        return null;
    }
  };

  /**
   * Subheader yang responsif
   */
  const SubHeaderElement = ({ typeOf, children }) => {
    return (
      <p
        className={`text-black dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium font-poppins leading-relaxed max-w-4xl mx-auto ${
          typeOf === "space"
            ? "my-3 sm:my-4 md:my-6 lg:my-8"
            : "mb-4 sm:mb-6 md:mb-8"
        }`}
      >
        {children}
      </p>
    );
  };

  /**
   * Elemen konten utama yang responsif
   */
  const BodyContainElement = ({ typeOf, children }) => {
    switch (typeOf) {
      case "grid":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 my-6 sm:my-8 md:my-10">
            {children}
          </div>
        );
      case "gridAnggota":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 my-6 sm:my-8 md:my-10">
            {children}
          </div>
        );
      case "casual":
        return (
          <p className="text-sm sm:text-base md:text-lg font-poppins">
            {children}
          </p>
        );
      case "space":
        return <div className="space-y-3 sm:space-y-4">{children}</div>;
      default:
        return null;
    }
  };

  return (
    <section
      id={idName}
      className={`${bgColor} dark:bg-gray-900 min-h-screen mx-auto text-center py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6 lg:px-8 transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto text-center relative px-2 sm:px-4 md:px-6 lg:px-8">
        <HeaderElement heading={hirarki} typeOf={type}>
          {header}
        </HeaderElement>
        <SubHeaderElement typeOf={type}>{subheader}</SubHeaderElement>
        <BodyContainElement typeOf={type}>{children}</BodyContainElement>
      </div>
    </section>
  );
};

export default BodyHome;
