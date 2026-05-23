import React from 'react';

interface ObjetivosProps {
  generalText?: string;
  specificObjectives?: { title: string; description: string }[];
}

const defaultSpecific = [
  {
    title: 'Al Conocimiento y Saberes',
    description:
      'Dominar los fundamentos científicos, saberes, técnicas y metodologías de las ciencias básicas, programación y manejo de la información para dar solución a problemas relacionados a las TICs, contribuyendo a los procesos de desarrollo sustentable del entorno.',
  },
  {
    title: 'A la Pertinencia',
    description:
      'Plantear soluciones integrales de sistemas de la información y comunicación para resolver problemas del entorno, contribuyendo a la transformación de la matriz productiva del país y automatizando procesos productivos.',
  },
  {
    title: 'A los Aprendizajes',
    description:
      'Aplicar habilidades, metodologías y herramientas tecnológicas en el desempeño como ingeniero en TI, con calidad humana y profesionalismo para dar soluciones a necesidades del contexto.',
  },
  {
    title: 'A la Ciudadanía Integral',
    description:
      'Establecer un vínculo con la ciudadanía mediante el uso de TIC, fomentando una cultura informática responsable, solidaria y participativa.',
  },
  {
    title: 'Investigación Multidisciplinaria',
    description:
      'Elevar el nivel de participación de grupos multidisciplinarios dentro de proyectos investigativos de TI, mejorando el nivel de vida de los diferentes actores de la sociedad.',
  },
];

const Objetivos: React.FC<ObjetivosProps> = ({
  generalText = 'Integrar fundamentos científicos-metodológicos inherentes a las tecnologías de la información y comunicación, impulsando el crecimiento social, productivo y tecnológico a nivel local, regional y nacional.',
  specificObjectives = defaultSpecific,
}) => {
  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-[#d79b05] pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#001b55] dark:text-foreground">Objetivos</h2>
        <p className="text-muted-foreground text-sm mt-1">General y específicos de la carrera</p>
      </div>

      {/* General */}
      <div className="bg-[#001b55] text-white rounded-xl p-6 md:p-8 mb-6">
        <span className="text-[#d79b05] text-xs font-bold uppercase tracking-widest mb-3 block">
          Objetivo General
        </span>
        <p className="text-base md:text-lg leading-relaxed">{generalText}</p>
      </div>

      {/* Specific */}
      <div className="space-y-3">
        {specificObjectives.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-[#001b55]/30 transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-[#001b55]/8 dark:bg-primary/10 rounded-full flex items-center justify-center text-[#001b55] dark:text-primary font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Objetivos;
