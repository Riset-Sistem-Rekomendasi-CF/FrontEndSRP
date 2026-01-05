import StepperTutorialButton from "./StepperTutorialButton";

/**
 * # StepperTutorialButton Component
 *
 * Tombol untuk membuka modal panduan penggunaan website.
 *
 * ## Fitur:
 * - Membuka modal stepper panduan saat diklik
 * - Auto-show modal untuk pengunjung pertama kali (localStorage)
 * - Icon play untuk visual yang menarik
 * - Warna kuning yang mencolok untuk menarik perhatian
 *
 * ## Behavior:
 * - Saat pertama kali mengunjungi website, modal akan otomatis terbuka
 * - Status kunjungan disimpan di localStorage dengan key "hasVisited"
 * - Klik tombol untuk membuka modal panduan kapan saja
 */
export default {
  title: "Navigate/Navbar/StepperTutorialButton",
  component: StepperTutorialButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "StepperTutorialButton adalah tombol untuk membuka modal panduan penggunaan website KoalaERS.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-gray-800 p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Tampilan default tombol panduan
 */
export const Default = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story:
          "Tombol panduan dalam keadaan default. Klik untuk membuka modal stepper.",
      },
    },
  },
};
