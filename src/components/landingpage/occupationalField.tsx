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
  item0 = 'Son Fundamentales en la gestion y optimizacion de sistemas de informacion dentro de las organizaciones publicas y privadas.',
  item1 = 'Se desempena en roles clave como analistas de sistemas, administradores de bases de datos, disenadores de redes y seguridad informatica, entre otros.',
  item2 = ' Su expertise abarca desde la implementacion de soluciones tecnologicas innovadoras hasta la direccion estrategica de proyectos de TI, asegurando la eficiencia operativa y el cumplimiento de objetivos empresariales.',
  item3 = ' Ademas, estan preparados para enfrentar desafios constantes derivados de la rapida evolucion tecnologica, adaptandose y aplicando conocimientos actualizados en areas como inteligencia artificial, el big data y la ciberseguridad.',
}) => {
  return (
    <section className="relative mt-30 w-full px-4 mx-0">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Tarjeta Campo Ocupacional */}
        <div className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-4 p-6">
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