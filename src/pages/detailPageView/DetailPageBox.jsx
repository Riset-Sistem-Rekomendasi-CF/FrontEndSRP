import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getInitialData } from "../../api/getDataSet";
import MeanMeasure from "../../components/MathSimilarity/Measure/Mean/MeanMeasure";
import MeanCenteredMeasure from "../../components/MathSimilarity/Measure/MeanCentered/MeanCenteredMeasure";
import SimilarityMeasure from "../../components/MathSimilarity/Measure/SimilarityMeasure";
import PredictionMeasure from "../../components/MathSimilarity/Measure/Prediction/PredictionMeasure";
import { checkEmptyRowOrColumn } from "../../helper/helper";
import { WarningPage } from "../ErorrPage/WarningPage";

export default function DetailPageBox({
  method,
  similarity,
  data,
  sectionIdDetail,
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

  // Pindahkan useMemo ke sini (di luar renderContent)
  const initialData = React.useMemo(() => {
    if (!method) return null;
    return getInitialData(data, method.toLowerCase());
  }, [data, method]);

  const renderContent = () => {
    if (!method) {
      return (
        <>
          <WarningPage
            title="Metode dan Fungsi Similaritas Belum Dipilih"
            children={
              <>
                <p className="mb-2">
                  Oppps...., Untuk melanjutkan proses perhitungan, silakan pilih
                  terlebih dahulu metode prediksi dan fungsi similaritas yang
                  ingin digunakan.
                </p>
              </>
            }
          />
        </>
      );
    } else if (!similarity) {
      return (
        <>
          <WarningPage
            title="Metode dan Fungsi Similaritas Belum Dipilih"
            children={
              <>
                <p className="mb-2">
                  Oppps...., Untuk melanjutkan proses perhitungan, silakan pilih
                  terlebih dahulu metode prediksi dan fungsi similaritas yang
                  ingin digunakan.
                </p>
              </>
            }
          />
        </>
      );
    } else if (data.length === 0) {
      return (
        <>
          <WarningPage
            title="Data Rating Masih Kosong"
            children={
              <>
                <p className="mb-2">
                  Oppps...., Untuk melanjutkan proses perhitungan, Data kosong!
                  Harap isi data rating terlebih dahulu untuk melanjutkan.
                </p>
              </>
            }
            onClickId={"data_ratingLatihan"}
            buttonText={"Isi Data Rating"}
          />
        </>
      );
    } else if (checkEmptyRowOrColumn(data)) {
      return (
        <>
          <WarningPage
            title="Data Rating Masih Kosong"
            children={
              <>
                <p className="mb-2">
                  Oppps...., Data yang Anda masukkan tidak valid. Terdapat baris
                  atau kolom yang masih kosong. Silakan lengkapi data sebelum
                  melanjutkan..
                </p>
              </>
            }
            onClickId={"data_ratingLatihan"}
            buttonText={"Perbaiki Data Rating"}
          />
        </>
      );
    }

    // Gunakan initialData yang sudah dihitung
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

  const isDataValid =
    method && similarity && data.length > 0 && !checkEmptyRowOrColumn(data);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        {isDataValid ? (
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
              mx: "auto",
              my: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 2, sm: 3, md: 4 },
              boxShadow: 1,
              width: "100%",
              maxWidth: {
                xs: "100%",
                sm: "100%",
                md: "900px",
                lg: "1100px",
                xl: "1280px",
              },
              overflow: "hidden",
            }}
          >
            <section className="max-w-full max-h-full mx-auto text-center px-1 sm:px-2 md:px-2 bg-box-grid-pattern animate-grid z-0">
              <h1 className="text-black text-2xl sm:text-lg md:text-3xl font-bold font-poppins py-5 leading-snug break-words">
                Langkah-Langkah Penerapan {method} Collaborative Filtering
                dengan Metode {similarity}
              </h1>
              {renderContent()}
            </section>
          </Box>
        ) : (
          renderContent()
        )}
      </Container>
    </React.Fragment>
  );
}
