import DesktopMenu from "./DesktopMenu";

/**
 * # DesktopMenu Component
 *
 * Menu navigasi untuk tampilan desktop (layar >= 640px).
 *
 * ## Fitur:
 * - Menu horizontal dengan link navigasi
 * - Highlight aktif berdasarkan route saat ini
 * - Dropdown menu untuk halaman similaritas
 * - Tombol panduan tutorial
 * - Hover effect dengan transisi smooth
 *
 * ## Menu Items:
 * - Beranda
 * - Tutorial
 * - Eksplorasi
 * - Similaritas (Dropdown)
 * - Panduan (Button)
 */
export default {
  title: "Navigate/Navbar/DesktopMenu",
  component: DesktopMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DesktopMenu adalah komponen menu navigasi horizontal yang ditampilkan pada layar desktop.",
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
 * Tampilan default DesktopMenu
 */
export const Default = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "DesktopMenu dalam keadaan default dengan semua menu items.",
      },
    },
  },
};
