import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProyectosInvestigacionProps {
  title?: string;
  rows?: { label: string; value: string }[];
}

const ProyectosInvestigacion: React.FC<ProyectosInvestigacionProps> = ({
  title = 'Proyectos de investigacion',
  rows = [
    { label: 'PROYECTO', value: 'INFLUENCIA DE E-LEARNING COMO HERRAMIENTA DE MEJORAMIENTO DE LA EDUCACIÓN CONTINUA EN MACAS.' },
    { label: 'GRUPOS DE INVESTIGACIÓN', value: 'GIDES, SEGINTE, TIGECON' },
    { label: 'LINEAS DE INVESTIGACIÓN', value: 'Tecnología de la información y comunicación' },
  ],
}) => {
  return (
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full border-collapse text-sm md:text-base">
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="font-semibold py-2 pr-4 align-top">{row.label}</td>
                <td className="py-2">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ProyectosInvestigacion;
