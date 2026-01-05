import GifKoalaPage from "../../../assets/vidioAsset/NewKoala.gif";
import { faqs } from "../../../data";

const About = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white overflow-x-hidden font-poppins dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout: 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Kolom 1: Heading */}
          <div className="text-center md:text-start text-base sm:text-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-5 md:mb-6 text-blue-home font-semibold">
              <span className="curved-underline">
                Tentang Aplikasi
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M0 20 Q 50 0, 100 20"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-md font-medium text-black dark:text-white text-center md:text-start leading-relaxed">
              Koala Edu RecSys (KoalaERS) adalah platform pembelajaran berbasis
              website yang dirancang untuk meningkatkan pemahaman pengguna
              mengenai perhitungan fungsi similaritas pada sistem rekomendasi
              berbasis Collaborative Filtering pada metode User-Based dan
              Item-Based.
            </p>

            <img
              src={GifKoalaPage}
              alt="Gif Koala"
              className="w-full max-w-xs sm:max-w-sm md:max-w-none mx-auto md:mx-0 h-auto mt-4"
            />
          </div>

          {/* Kolom 2: Pertanyaan dan Jawaban */}
          <div className="text-start col-span-1 md:col-span-2 space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="space-y-2 sm:space-y-3 md:space-y-4 hover:bg-card_yellow_primary hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-3 sm:p-4 rounded-lg"
              >
                <div className="text-base sm:text-lg md:text-xl font-semibold dark:text-white text-gray-800">
                  {faq.question}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
