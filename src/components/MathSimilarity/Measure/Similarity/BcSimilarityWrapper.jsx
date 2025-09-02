import BcSimilarityFrequency from "./BcSimilarityFrequency";
import BcSimilarityProbibility from "./BcSimilarityProbability";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function BcSimilarityWrapper({
  dataOnly,
  selectedIndex,
  opsional,
  isNotation,
  similarity,
}) {
  if (similarity !== "Bhattacharyya Coefficient") return null;

  return (
    <div className="w-full mt-4 mb-4">
      <div className="">
        <div className="w-full flex flex-col items-center">
          <BcSimilarityFrequency
            dataOnly={dataOnly}
            selectedIndex={selectedIndex}
            opsional={opsional}
            isNotation={isNotation}
          />
        </div>
        <div className="w-full items-center">
          <BcSimilarityProbibility
            dataOnly={dataOnly}
            selectedIndex={selectedIndex}
            opsional={opsional}
            isNotation={isNotation}
          />
        </div>
      </div>
      <div className="bg-blue-200 rounded-md shadow-sm p-2 mt-4">
        {/* keternagan */}
        <CampaignIcon className="inline-block align-text-top mr-1" />
        <p className="text-justify font-poppins">
          Untuk perhitungan Bhattacharyya Coefficient yaitu mencari frekuensi
          setiap user dan item, lalu dari frekuensi tersebut dicari probabilitas
          dari masing-masing user dan item. Setelah itu, baru dapat dihitung
          Bhattacharyya Coefficient-nya.
        </p>
      </div>
    </div>
  );
}
