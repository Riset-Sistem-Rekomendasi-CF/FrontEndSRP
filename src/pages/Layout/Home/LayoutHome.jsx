import Navbar from "../../../components/Navigate/Navbar/Navbar";

const LayoutHome = ({ children }) => {
  return (
    <div className="text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      {children}
    </div>
  );
};

export default LayoutHome;
