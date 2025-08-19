import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import { getInitialData } from "../../api/getDataSet";
import MeanMeasure from "../../components/MathSimilarity/Measure/Mean/MeanMeasure";
import MeanCenteredMeasure from "../../components/MathSimilarity/Measure/MeanCentered/MeanCenteredMeasure";
import SimilarityMeasure from "../../components/MathSimilarity/Measure/SimilarityMeasure";
import PredictionMeasure from "../../components/MathSimilarity/Measure/Prediction/PredictionMeasure";
import BackToTopButton from "../../components/Navigate/BackToTopNavigate";
import { checkEmptyRowOrColumn } from "../../helper/helper";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

export default function DetailPageBoxLatihan({
  method,
  similarity,
  data,
  headers,
  columns,
  funnyMode,
}) {
  const scrollToSectionDetail = (sectionIdDetail) => {
    const element = document.getElementById(sectionIdDetail);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const renderContent = () => {
    // console.log("detailPage", data);
    // console.log("detailPage", data.length === 0);

    if (!method) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p className="mb-5">
            <SdCardAlertIcon fontSize="large" />
            Silakan pilih metode fungsi similaritas yang ingin digunakan.
          </p>
          <button
            onClick={() => scrollToSectionDetail("data_ratingLatihan")}
            className="animate-bounce mt-4 text-black rounded-lg hover:underline transition duration-300"
          >
            <KeyboardCapslockIcon className="mr-2" />
            Buat Data Rating Latihan Terlebih Dahulu, dan Pilih Metode
            Similaritas
          </button>
        </div>
      );
    } else if (!similarity) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p>
            Mohon pilih metode dan fungsi similaritas terlebih dahulu untuk
            melanjutkan.
          </p>

          <button
            onClick={() => scrollToSectionDetail("metode_ratingLatihan")}
            className="animate-bounce mt-4 text-black rounded-lg hover:underline transition duration-300"
          >
            <KeyboardCapslockIcon className="mr-2" />
            Pilih Fungsi Similartias
          </button>
        </div>
      );
    } else if (data.length === 0) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p>
            Data kosong! Harap isi data rating terlebih dahulu untuk
            melanjutkan.
          </p>

          <button
            onClick={() => scrollToSectionDetail("data_ratingLatihan")}
            className="animate-bounce mt-4 text-black rounded-lg hover:underline transition duration-300"
          >
            <KeyboardCapslockIcon className="mr-2" />
            Buat Data Rating Latihan Terlebih Dahulu
          </button>
        </div>
      );
    } else if (checkEmptyRowOrColumn(data)) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p>
            Data yang Anda masukkan tidak valid. Terdapat baris atau kolom yang
            masih kosong. Silakan lengkapi data sebelum melanjutkan.
          </p>
          <button
            onClick={() => scrollToSectionDetail("metode_ratingLatihan")}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Pilih Fungsi Similaritas
          </button>
        </div>
      );
    }

    const initialData = getInitialData(data, method.toLowerCase());

    return (
      <>
        <MeanMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
          headers={headers}
          columns={columns}
          funnyMode={funnyMode}
        />
        <MeanCenteredMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
          headers={headers}
          columns={columns}
          funnyMode={funnyMode}
        />
        <SimilarityMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
          headers={headers}
          columns={columns}
          funnyMode={funnyMode}
        />
        <PredictionMeasure
          dataRating={data}
          opsional={method.toLowerCase()}
          similarity={similarity}
          headers={headers}
          columns={columns}
          funnyMode={funnyMode}
        />
      </>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        {" "}
        {/* Set maxWidth to "xl" or "false" for maximum width */}
        <Box
          sx={{
            bgcolor: "#FDF9ED",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: 1,
            margin: { xs: 1, sm: 2, md: 3 }, // Adjust margin based on screen size
            padding: { xs: 1, sm: 2, md: 4 }, // Responsive padding
            boxShadow: 3,
            width: "100%", // Make the Box take full width
            maxWidth: { xs: "100%", md: "100%" }, // Constrain max width on larger
            // screens
            overflow: "hidden",
          }}
        >
          <section className="max-w-full mx-auto text-center px-4 sm:px-3 md:px-4">
            <h1 className="text-xl sm:text-md md:text-2xl font-bold font-poppins py-5 leading-snug break-words">
              Langkah-Langkah Penerapan <i>{method} Collaborative Filtering</i>{" "}
              dengan Metode
              <span className="italic"> {similarity}</span>
            </h1>

            <div className="text-sm sm:text-base md:text-lg px-4 sm:px-10 py-5 font-poppins flex-1">
              {renderContent()}
            </div>
          </section>
        </Box>
      </Container>
    </React.Fragment>
  );
}
