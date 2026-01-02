import MobileMenu from "./MobileMenu";

/**
 * # MobileMenu Component
 *
 * Menu navigasi untuk tampilan mobile (layar < 640px).
 *
 * ## Fitur:
 * - Menu vertikal dengan link navigasi
 * - Tampil/sembunyi berdasarkan state `isOpen`
 * - Highlight aktif berdasarkan route saat ini
 * - Dropdown menu untuk halaman similaritas
 * - Tombol panduan tutorial
 *
 * ## Props:
 * - `isOpen` (boolean): Mengontrol visibilitas menu
 * - `isActive` (function): Fungsi untuk menentukan style menu aktif
 * - `openModal` (function): Callback untuk membuka modal panduan
 */
export default {
  title: "Navigate/Navbar/MobileMenu",
  component: MobileMenu,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        component:
          "MobileMenu adalah komponen menu navigasi vertikal yang ditampilkan pada layar mobile.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Mengontrol apakah menu ditampilkan atau tidak",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isActive: {
      description: "Fungsi untuk menentukan class CSS menu yang aktif",
      table: {
        type: { summary: "(path: string) => string" },
      },
    },
    openModal: {
      description: "Callback function untuk membuka modal panduan",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-gray-800">
        <Story />
      </div>
    ),
  ],
};

/**
 * Menu dalam keadaan terbuka
 */
export const Open = {
  name: "Menu Terbuka",
  args: {
    isOpen: true,
    isActive: (path) =>
      path === "/" ? "bg-blue-home text-white" : "text-black",
    openModal: () => console.log("Modal opened"),
  },
  parameters: {
    docs: {
      description: {
        story: "MobileMenu dalam keadaan terbuka (isOpen=true).",
      },
    },
  },
};

/**
 * Menu dalam keadaan tertutup
 */
export const Closed = {
  name: "Menu Tertutup",
  args: {
    isOpen: false,
    isActive: (path) =>
      path === "/" ? "bg-blue-home text-white" : "text-black",
    openModal: () => console.log("Modal opened"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "MobileMenu dalam keadaan tertutup (isOpen=false). Komponen tidak merender apapun.",
      },
    },
  },
};

/**
 * Menu dengan halaman Tutorial aktif
 */
export const TutorialActive = {
  name: "Tutorial Aktif",
  args: {
    isOpen: true,
    isActive: (path) =>
      path === "/tutorial" ? "bg-blue-home text-white" : "text-black",
    openModal: () => console.log("Modal opened"),
  },
  parameters: {
    docs: {
      description: {
        story: "MobileMenu dengan menu Tutorial dalam keadaan aktif.",
      },
    },
  },
};
