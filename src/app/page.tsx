import Header from "@/sections/header/Header";
import Footer from "@/sections/footer/Footer";
import InfoBanner from "@/sections/landingpage/InfoBanner";
//import VisionMisionBanner from "@/components/landingpage/visionMisionBanner";
import OccupationalField from "@/sections/landingpage/occupationalField";
import PdfReaderWrapper from "@/sections/landingpage/PdfReaderWrapper";
import Video from "@/sections/landingpage/Video";

export default function Home() {

  return (
    <div className="relative w-full font-sans items-center m-auto justify-items-center bg-white text-black dark:bg-black dark:text-white">
      <Header/>
      <h1 className="text-2xl font-bold p-4 md:text-5xl max-w-5xl">Carrera en Ingeniería de Tecnologías de la Información</h1>
      <Video src="./media/videopr.mp4" title="Video de la carrera"/>
      <InfoBanner/>
      <OccupationalField/>
      <PdfReaderWrapper/>
      <Footer/>

    </div>
  );
}
