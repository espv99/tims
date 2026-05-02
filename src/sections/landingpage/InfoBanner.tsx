import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoBannerProps {
  title?: string;
  duration?: string;
  modality?: string;
  cost?: string;
  approvalInitial?: string;
  approvalUpdated?: string;
  coordinator?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({
  title = 'Ingeniero/a en Tecnologías de la Información',
  duration = '4 años',
  modality = 'Presencial',
  cost = 'Gratuito',
  approvalInitial = 'RPC-SO-30-No.544-2016',
  approvalUpdated = '650612A01-P-1401',
  coordinator = 'Ing. Paul Machado'
}) => {
  return (
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>Información General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm md:text-base">
          El Ingeniero/a en Tecnologías de la Información posee la capacidad de utilizar de manera eficiente y efectiva las tecnologias de la informacion, lo cual contribuye significativamente a mejorar el rendimiento de las organizaciones adaptandose a la tendencias tecnologicas locales, regionales y nacionales. Ademas debe demostrar actitudes, destrezas y habilidades para gestionar proyectos de TI aplicando principios eticos, legales y financieros en la toma de decisiones tanto en empresas publicas como privadas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Título</h3>
            <p className="text-sm md:text-base">{title}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Duración</h3>
            <p className="text-sm md:text-base">{duration}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Modalidad</h3>
            <p className="text-sm md:text-base">{modality}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Costo</h3>
            <p className="text-sm md:text-base">{cost}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Aprobación Inicial CES</h3>
            <p className="text-sm md:text-base">{approvalInitial}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Aprobación Actualizada CES</h3>
            <p className="text-sm md:text-base">{approvalUpdated}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-2">Coordinador</h3>
            <p className="text-sm md:text-base">{coordinator}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoBanner;
