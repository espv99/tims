import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import InfoBanner from "@/components/landingpage/InfoBanner";
import VisionMisionBanner from "@/components/landingpage/visionMisionBanner";
import OccupationalField from "@/components/landingpage/occupationalField";
import PdfReaderWrapper from "@/components/landingpage/PdfReaderWrapper";

export default function Home() {

  return (
    <div className="relative w-full font-sans items-center m-auto justify-items-center bg-white text-black dark:bg-black dark:text-white">
      <Header/>
      <h1 className="text-2xl font-bold p-4 md:text-5xl max-w-5xl">Carrera en Ingenieria de Tecnologias de la Informacion</h1>
      <VisionMisionBanner />
      <InfoBanner/>
      <OccupationalField/>
      <PdfReaderWrapper/>
      <Footer/>

    </div>
  );
}
