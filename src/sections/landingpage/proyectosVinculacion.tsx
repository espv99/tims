import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProyectosVinculacionProps {
  title?: string;
  items?: string[];
}

const ProyectosVinculacion: React.FC<ProyectosVinculacionProps> = ({
  title = 'Proyectos de vinculacion',
  items = [
    'Fortalecimiento del proceso educativo de las unidades educativas del distrito 14D01 a través del análisis y factibilidad de nuevos bachilleratos técnicos en la provincia Morona Santiago.',
    'Aporte la agenda de transformación digital en el cantón Morona enfocado a las instituciones educativas.',
    '"NUWA KAKARAM" el emprendimiento como una alternativa para disminuir la violencia de género en la provincia Morona Santiago',
  ],
}) => {
  return (
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm md:text-base">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProyectosVinculacion;
