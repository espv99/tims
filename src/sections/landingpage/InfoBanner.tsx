import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>Información General</CardTitle>
        <CardDescription>
          El Ingeniero/a en Tecnologías de la Información posee la capacidad de utilizar de manera eficiente y efectiva las tecnologias de la informacion, lo cual contribuye significativamente a mejorar el rendimiento de las organizaciones adaptandose a la tendencias tecnologicas locales, regionales y nacionales. Ademas debe demostrar actitudes, destrezas y habilidades para gestionar proyectos de TI aplicando principios eticos, legales y financieros en la toma de decisiones tanto en empresas publicas como privadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Título</h3>
            <p>{title}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Duración</h3>
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
      </CardContent>
    </Card>
  );
};

export default InfoBanner;
