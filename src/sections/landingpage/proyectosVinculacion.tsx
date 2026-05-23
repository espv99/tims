import React from 'react';

interface ProyectosVinculacionProps {
  items?: string[];
}

const defaultItems = [
  'Fortalecimiento del proceso educativo de las unidades educativas del distrito 14D01 a través del análisis y factibilidad de nuevos bachilleratos técnicos en la provincia Morona Santiago.',
  'Aporte a la agenda de transformación digital en el cantón Morona enfocado a las instituciones educativas.',
  '"NUWA KAKARAM" — el emprendimiento como una alternativa para disminuir la violencia de género en la provincia Morona Santiago.',
];

function LinkIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

const ProyectosVinculacion: React.FC<ProyectosVinculacionProps> = ({ items = defaultItems }) => {
  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-[#001b55] pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#001b55] dark:text-foreground">
          Proyectos de Vinculación
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Vinculación con la comunidad y el entorno</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-[#001b55]/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0 text-[#d79b05] mt-0.5">
              <LinkIcon />
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosVinculacion;
