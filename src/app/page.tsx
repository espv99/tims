import Header from '@/sections/header/Header';
import Footer from '@/sections/footer/Footer';
import InfoBanner from '@/sections/landingpage/InfoBanner';
import OccupationalField from '@/sections/landingpage/occupationalField';
import ProfessionalProfile from '@/sections/landingpage/professionalProfile';
import Objetivos from '@/sections/landingpage/objetivos';
import ProyectosVinculacion from '@/sections/landingpage/proyectosVinculacion';
import ProyectosInvestigacion from '@/sections/landingpage/proyectosInvestigacion';
import PdfReaderWrapper from '@/sections/landingpage/PdfReaderWrapper';
import Video from '@/sections/landingpage/Video';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-full font-sans bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="w-full bg-[#001b55]">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
          <span className="inline-block bg-[#d79b05]/20 text-[#d79b05] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            ESPOCH · Sede Morona Santiago
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            Ingeniería en Tecnologías
            <br className="hidden md:block" /> de la Información
          </h1>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Forma profesionales capaces de gestionar y optimizar sistemas de información, adaptados a las tendencias
            tecnológicas del entorno local, regional y nacional.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#informacion"
              className="bg-[#d79b05] hover:bg-[#c48a04] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Conoce la carrera
            </a>
            <Link
              href="/timeline"
              className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Ver Cronograma
            </Link>
          </div>
        </div>
        <div className="pb-12 flex justify-center px-4">
          <Video src="./media/videopr.mp4" title="Video de la carrera" />
        </div>
      </section>

      {/* Main content */}
      <main id="informacion" className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col gap-0">
        <InfoBanner />
        <ProfessionalProfile />
        <OccupationalField />
        <Objetivos />
        <ProyectosVinculacion />
        <ProyectosInvestigacion />
        <PdfReaderWrapper />
      </main>

      <Footer />
    </div>
  );
}
