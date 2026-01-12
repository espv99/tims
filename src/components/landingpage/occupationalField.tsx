import React from 'react';

interface occupationalFieldProps {
  visionTitle?: string;
  visionText?: string;
  item0?: string;
  item1?: string;
  item2?: string;
  item3?: string;
}

const OccupationalField: React.FC<occupationalFieldProps> = ({
  visionTitle = 'Campo Ocupacional',
  item0 = 'Son Fundamentales en la gestión y optimización de sistemas de información dentro de las organizaciones públicas y privadas.',
  item1 = 'Se desempena en roles clave como analistas de sistemas, administradores de bases de datos, diseñadores de redes y seguridad informática, entre otros.',
  item2 = ' Su expertise abarca desde la implementación de soluciones tecnológicas innovadoras hasta la dirección estratégica de proyectos de TI, asegurando la eficiencia operativa y el cumplimiento de objetivos empresariales.',
  item3 = ' Además, están preparados para enfrentar desafíos constantes derivados de la rapida evolución tecnológica, adaptándose y aplicando conocimientos actualizados en áreas como inteligencia artificial, el big data y la ciberseguridad.',
}) => {
  return (
    <section className="relative mt-10 w-full px-4 mx-0">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Tarjeta Campo Ocupacional */}
        <div className="rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{visionTitle}</h3>
              <ul>
                <li className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item0}</li>
                <li className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item1}</li>
                <li className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item2}</li>
                <li className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item3}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OccupationalField;