import Navbar from "./Navbar";

/**
 * # Navbar Component
 *
 * Komponen navigasi utama untuk website KoalaERS.
 *
 * ## Fitur:
 * - **Responsive**: Tampilan berbeda untuk desktop dan mobile
 * - **Sticky**: Navbar tetap di atas saat scroll
 * - **Auto-hide**: Navbar tersembunyi saat scroll ke bawah, muncul saat scroll ke atas
 * - **Dark Mode Support**: Mendukung tema gelap
 * - **Dropdown Menu**: Menu dropdown untuk halaman similaritas
 * - **Modal Panduan**: Tombol untuk membuka panduan penggunaan
 *
 * ## Menu Items:
 * - Beranda (/)
 * - Tutorial (/tutorial)
 * - Eksplorasi (/eksplorasi)
 * - Dropdown Similaritas (User-Based & Item-Based)
 */
export default {
  title: "Navigate/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Navbar adalah komponen navigasi utama yang responsive dengan dukungan dark mode dan auto-hide saat scroll.",
      },
    },
  },
};

/**
 * Tampilan default Navbar pada halaman Beranda
 */
export const Default = {
  name: "Default (Beranda)",
  parameters: {
    docs: {
      description: {
        story: "Navbar dalam keadaan default ketika berada di halaman Beranda.",
      },
    },
  },
};

/**
 * Navbar dengan viewport mobile untuk melihat hamburger menu
 */
export const Mobile = {
  name: "Mobile View",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Tampilan Navbar pada perangkat mobile dengan hamburger menu. Klik icon menu untuk melihat menu mobile.",
      },
    },
  },
};

/**
 * Navbar dengan viewport tablet
 */
export const Tablet = {
  name: "Tablet View",
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tampilan Navbar pada perangkat tablet.",
      },
    },
  },
};
