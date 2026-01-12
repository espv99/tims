import React from 'react';

interface InfoBannerProps {
  title?: string;
  duration?: string;
  modality?: string;
  cost?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({
  title = 'Ingeniero/a en Tecnologías de la Información',
  duration = '4 años',
  modality = 'Presencial', 
  cost = 'Gratuito'
}) => {
  return (
    <div className="w-full mt-10 max-w-5xl bg-primary-900 dark:bg-gray-900 p-6 rounded-lg shadow-md mx-0">
      <div className=" mx-0">
        <h2 className="text-2xl font-bold mb-4">Informacion General</h2>

        <p className='mb-5'>
          El Ingeniero/a en Tecnologías de la Información posee la capacidad de utilizar de manera eficiente y efectiva las tecnologias de la informacion, lo cual contribuye significativamente a mejorar el rendimiento de las organizaciones adaptandose a la tendencias tecnologicas locales, regionales y nacionales. Ademas debe demostrar actitudes, destrezas y habilidades para gestionar proyectos de TI aplicando principios eticos, legales y financieros en la toma de decisiones tanto en empresas publicas como privadas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Titulo</h3>
            <p>{title}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Duracion</h3>
            <p>{duration}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Modalidad</h3>
            <p>{modality}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Costo</h3>
            <p>{cost}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
