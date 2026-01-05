import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

/**
 * # ThemeToggle Component
 *
 * Tombol untuk mengubah tema website antara light mode dan dark mode.
 *
 * ## Fitur:
 * - Toggle antara light mode dan dark mode
 * - Icon berubah sesuai tema aktif (sun/moon)
 * - Menyimpan preferensi tema di localStorage
 * - Mendukung system preference (prefers-color-scheme)
 * - Hover effect dengan transisi smooth
 *
 * ## Accessibility:
 * - aria-label yang jelas untuk screen reader
 * - Kontras warna yang baik
 */

// Mock component untuk Storybook (tanpa context dependency)
const ThemeToggleMock = ({ isDarkMode = false, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <LightModeIcon className="text-yellow-400" />
      ) : (
        <DarkModeIcon className="text-gray-700" />
      )}
    </button>
  );
};

// Interactive wrapper untuk demo
const ThemeToggleDemo = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className={`p-8 rounded-lg transition-colors duration-200 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <ThemeToggleMock
          isDarkMode={isDark}
          onToggle={() => setIsDark(!isDark)}
        />
        <span className={isDark ? "text-white" : "text-gray-800"}>
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </div>
  );
};

export default {
  title: "Toggle/ThemeToggle",
  component: ThemeToggleMock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ThemeToggle adalah tombol untuk mengubah tema website antara light mode dan dark mode.",
      },
    },
  },
  argTypes: {
    isDarkMode: {
      control: "boolean",
      description: "Status tema saat ini (true = dark mode)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onToggle: {
      action: "toggled",
      description: "Callback function saat tombol diklik",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

/**
 * Light mode (default)
 */
export const LightMode = {
  name: "Light Mode",
  args: {
    isDarkMode: false,
  },
  parameters: {
    docs: {
      description: {
        story: "ThemeToggle dalam keadaan light mode. Menampilkan icon bulan.",
      },
    },
  },
};

/**
 * Dark mode
 */
export const DarkMode = {
  name: "Dark Mode",
  args: {
    isDarkMode: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-800 p-4 rounded">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "ThemeToggle dalam keadaan dark mode. Menampilkan icon matahari.",
      },
    },
  },
};

/**
 * Interactive demo dengan toggle yang berfungsi
 */
export const Interactive = {
  name: "Interactive Demo",
  render: () => <ThemeToggleDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Demo interaktif ThemeToggle. Klik tombol untuk melihat perubahan tema.",
      },
    },
  },
};
