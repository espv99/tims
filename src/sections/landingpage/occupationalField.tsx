import React from 'react';

interface OccupationalFieldProps {
  items?: string[];
}

const defaultItems = [
  'Fundamentales en la gestión y optimización de sistemas de información dentro de las organizaciones públicas y privadas.',
  'Se desempeñan en roles clave como analistas de sistemas, administradores de bases de datos, diseñadores de redes y seguridad informática.',
  'Su expertise abarca desde la implementación de soluciones tecnológicas innovadoras hasta la dirección estratégica de proyectos de TI, asegurando la eficiencia operativa.',
  'Preparados para enfrentar desafíos constantes derivados de la rápida evolución tecnológica, aplicando conocimientos en inteligencia artificial, big data y ciberseguridad.',
];

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const OccupationalField: React.FC<OccupationalFieldProps> = ({ items = defaultItems }) => {
  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-[#001b55] pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#001b55] dark:text-foreground">Campo Ocupacional</h2>
        <p className="text-muted-foreground text-sm mt-1">Áreas de desempeño profesional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 bg-card border border-border rounded-xl p-5 hover:border-[#001b55]/30 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-[#001b55] dark:text-primary mt-0.5">
              <CheckCircleIcon />
            </span>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OccupationalField;
