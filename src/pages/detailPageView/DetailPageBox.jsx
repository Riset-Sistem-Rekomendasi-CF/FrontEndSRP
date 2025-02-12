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

export default function DetailPageBox({
  method,
  similarity,
  data,
  sectionIdDetail,
  headers,
  columns,
  funnyMode
}) {
  const scrollToSectionDetail = (sectionIdDetail) => {
    const element = document.getElementById(sectionIdDetail);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const renderContent = () => {

    if (!method) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p className="mb-5">
            <SdCardAlertIcon fontSize="large" />
            Silakan pilih metode fungsi similaritas yang ingin digunakan.
          </p>
          <button
            onClick={() => scrollToSectionDetail("metode_ratingTutorial")}
            className="animate-bounce mt-4 text-black rounded-lg hover:underline transition duration-300"
          >
            <KeyboardCapslockIcon className="mr-2" />
            Pilih Metode Similaritas
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
          <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Pilih Fungsi Similaritas
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
          <p className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Pilih Metode dan Fungsi Similaritas
          </p>
        </div>
      );
    } else if (checkEmptyRowOrColumn(data)) {
      return (
        <div className="text-center text-red-600 font-semibold">
          <p>
            Data yang Anda masukkan tidak valid. Terdapat baris atau kolom yang
            masih kosong. Silakan lengkapi data sebelum melanjutkan.
          </p>
          <p className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Perbaiki Data Rating
          </p>
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
            bgcolor: "#ffd25d",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid black",
            borderRadius: 10,
            margin: { xs: 1, sm: 2, md: 3 }, // Adjust margin based on screen size
            padding: { xs: 1, sm: 2, md: 3 }, // Responsive padding
            boxShadow: 1,
            width: "100%", // Make the Box take full width
            maxWidth: { xs: "100%", md: "100%" }, // Constrain max width on larger
            // screens
            overflow: "hidden",
          }}
        >
          <section className="max-w-full max-h-full mx-auto text-center px-4 sm:px-3 md:px-4 bg-box-grid-pattern animate-grid z-0">
            <h1 className=" text-black text-2xl sm:text-lg md:text-3xl font-bold font-poppins py-5 leading-snug break-words">
              Langkah-Langkah Penerapan <i>{method} Collaborative Filtering</i>{" "}
              dengan Metode
              <span className="italic"> {similarity}</span>
            </h1>
            {renderContent()}
          </section>
        </Box>
      </Container>
    </React.Fragment>
  );
}
