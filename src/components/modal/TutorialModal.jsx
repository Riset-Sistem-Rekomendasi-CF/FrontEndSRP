export const TutorialModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Tutorial {title}
        </h2>

        <img
          src={content}
          alt="Video Tutorial Cover"
          className="w-full rounded-md mb-4 object-cover"
        />

        <p className="text-gray-700 text-justify font-medium">
          Ini adalah tutorial untuk memberikan informasi tambahan terkait {""}
          {title} cara perhitungan.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
