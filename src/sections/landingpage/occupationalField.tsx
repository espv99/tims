import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>{visionTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="text-sm md:text-base">{item0}</li>
          <li className="text-sm md:text-base">{item1}</li>
          <li className="text-sm md:text-base">{item2}</li>
          <li className="text-sm md:text-base">{item3}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default OccupationalField;