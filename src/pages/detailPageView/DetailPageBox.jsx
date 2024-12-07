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

export default function DetailPageBox({ method, similarity, data }) {
  const renderContent = () => {
    // console.log("detailPage", data);
    // console.log("detailPage", data.length === 0);

    if (!method) {
      return <p>Pilih Fungsi Similaritas untuk {method}.</p>;
    } else if (!similarity) {
      return (
        <p className="flex items-center text-xl font-semibold font-poppins text-red-600">
          <SdCardAlertIcon className="mr-2" />
          Silakan pilih metode dan fungsi similaritas terlebih dahulu.
        </p>
      );
    } else if (data.length === 0) {
      return <p>Silakan isi data terlebih dahulu.</p>;
    } else if (checkEmptyRowOrColumn(data)) {
      return (
        <p>
          Data tidak valid silakan generate lagi. Terdapat baris atau kolom yang
          tidak terisi
        </p>
      );
    }

    const initialData = getInitialData(data, method.toLowerCase());

    return (
      <>
        <MeanMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
        />
        <MeanCenteredMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
        />
        <SimilarityMeasure
          opsional={method.toLowerCase()}
          similarity={similarity}
          initialData={initialData}
        />
        <PredictionMeasure
          dataRating={data}
          opsional={method.toLowerCase()}
          similarity={similarity}
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
              <BackToTopButton />
            </div>
          </section>
        </Box>
      </Container>
    </React.Fragment>
  );
}
