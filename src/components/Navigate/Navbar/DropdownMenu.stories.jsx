import SimilarityDropdown from "./DropdownMenu";

/**
 * # SimilarityDropdown Component
 *
 * Dropdown menu untuk navigasi ke halaman detail similaritas.
 *
 * ## Fitur:
 * - Toggle dropdown dengan klik
 * - Icon arrow up/down sesuai state
 * - Highlight menu aktif berdasarkan route
 * - Dark mode support
 * - Hover effect dengan transisi smooth
 *
 * ## Menu Items:
 * - PCC (Pearson Correlation Coefficient)
 * - COSINE (Cosine Similarity)
 * - ACOS (Adjusted Cosine Similarity)
 * - BC (Bhattacharyya Coefficient)
 */
export default {
  title: "Navigate/Navbar/SimilarityDropdown",
  component: SimilarityDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "SimilarityDropdown adalah komponen dropdown untuk navigasi ke berbagai halaman detail fungsi similaritas.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-gray-800 p-4 min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Dropdown dalam keadaan tertutup (default)
 */
export const Default = {
  name: "Default (Tertutup)",
  parameters: {
    docs: {
      description: {
        story:
          "SimilarityDropdown dalam keadaan default (tertutup). Klik untuk membuka dropdown.",
      },
    },
  },
};
