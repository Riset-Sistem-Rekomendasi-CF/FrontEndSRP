import { Helmet } from "react-helmet";
import CardBanner from "../../components/Card/Home/CardBanner";
import CardStepper from "../../components/Card/Home/CardStepper";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import Navbar from "../../components/Navigate/Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

/**
 * Layout component untuk halaman detail similarity
 */
export default function DetailLayout({
  title,
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalUrl,
  pageTitle,
  bannerHeading1,
  bannerHeading2,
  bannerParagraph,
  bannerBgColor,
  bannerImage,
  steps,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Back Button */}
            <div className="mb-6" data-aos="fade-right">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <ArrowBackIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Kembali</span>
              </button>
            </div>

            {/* Page Title */}
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-down">
              <div className="inline-block">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent pb-2">
                  {pageTitle}
                </h1>
                <div className="h-1 w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-2" />
              </div>
              <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Pelajari konsep dan implementasi {pageTitle} dalam sistem
                rekomendasi
              </p>
            </div>

            {/* Banner Card */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <CardBanner
                  heading1={bannerHeading1}
                  heading2={bannerHeading2}
                  paragraph={bannerParagraph}
                  bgColor={bannerBgColor}
                  imgSrc={bannerImage}
                />
              </div>
            </div>

            {/* Steps Section */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-8 sm:mt-12 lg:mt-16"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  📚 Langkah-langkah Perhitungan
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Ikuti panduan step-by-step berikut untuk memahami perhitungan
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
                <CardStepper steps={steps} />
              </div>
            </div>

            {/* Footer Info */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-8 sm:mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 text-sm">
                  💡 Tip: Klik pada setiap langkah untuk melihat detail
                  perhitungan
                </span>
              </div>
            </div>
          </div>
        </div>

        <BackToTopButtonHome />
      </div>
    </>
  );
}
