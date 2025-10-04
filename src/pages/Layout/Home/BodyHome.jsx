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
      " text-black font-bold font-poppins mb-8 sm:mb-12 md:mb-16 ";
    switch (heading) {
      case "1":
        return (
          <h1 className={`${NameClass} text-3xl sm:text-4xl md:text-5xl`}>
            {children}
          </h1>
        );
      case "2":
        return (
          <h2 className={`${NameClass} text-2xl sm:text-3xl md:text-4xl`}>
            {children}
          </h2>
        );
      case "3":
        return (
          <h3 className={`${NameClass} text-xl sm:text-2xl md:text-3xl`}>
            {children}
          </h3>
        );
      case "4":
        return (
          <h4 className={`${NameClass} text-lg sm:text-xl md:text-2xl`}>
            {children}
          </h4>
        );
      case "5":
        return (
          <h5 className={`${NameClass} text-base sm:text-lg md:text-xl`}>
            {children}
          </h5>
        );
      default:
        return;
    }
  };

  /**
   * Subheader yang responsif
   */
  const SubHeaderElement = ({ typeOf, children }) => {
    return (
      <p
        className={`text-black text-sm font-medium sm:text-base font-poppins ${
          typeOf === "space" ? "my-4 sm:my-6 md:my-8" : "mb-8"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 my-8 sm:my-10">
            {children}
          </div>
        );
      case "gridAnggota":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-10">
            {children}
          </div>
        );
      case "casual":
        return (
          <p className={"text-base sm:text-lg font-poppins"}>{children}</p>
        );
      case "space":
        return <div className={"space-y-4"}>{children}</div>;
      default:
        return;
    }
  };

  return (
    <section
      id={idName}
      className={`${bgColor} min-h-screen mx-auto text-center py-10 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto text-center relative px-4 sm:px-6 lg:px-8">
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
