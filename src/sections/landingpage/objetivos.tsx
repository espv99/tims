import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ObjetivosProps {
  title?: string;
  generalText?: string;
  specificObjectives?: { title: string; description: string }[];
}

const Objetivos: React.FC<ObjetivosProps> = ({
  title = 'Objetivos',
  generalText = 'Integrar fundamentos  científicos-metodológicos  inherentes a  las tecnologías de  la información y comunicación, impulsando el crecimiento social, productivo y tecnológico a nivel local, regional y nacional.',
  specificObjectives = [
    {
      title: 'Al Conocimiento y Saberes:',
      description:
        'Dominar los fundamentos científicos,  saberes,  técnicas y  metodologías de  las  ciencias básicas,  programación  y  manejo  de  la  información  para  dar  solución  a problemas relacionados a  las  Tics, con identidad  propia  partiendo  de  los  saberes  ancestrales, contribuyendo a los procesos de desarrollo sustentable del entorno con calidad, eficiencia y ética profesional.',
    },
    {
      title: 'A la Pertinencia:',
      description:
        'Plantear soluciones integrales de sistemas de la información y comunicación para resolver problemas del entorno en sus diversas concepciones, contribuyendo a la transformación de la  matriz  productiva  del  país  atendiendo  los  sectores  estratégicos,  automatizando procesos productivos y de servicios que favorezcan el buen vivir de los ciudadanos.',
    },
    {
      title: 'A los Aprendizajes:',
      description:
        'Aplicar habilidades,  metodologías  y  herramientas  tecnológicas  en  el  desempeño  como ingeniero en Tecnologías de la Información, con calidad humana y profesionalismo para dar soluciones a necesidades del contexto.',
    },
    {
      title: 'A la Ciudadanía Integral:',
      description:
        'Establecer un vínculo con la ciudadanía mediante el uso de tecnologías de la información y comunicación fomentando   una   cultura   informática   responsable,   solidaria   y participativa.',
    },
    {
      title: 'Otros:',
      description:
        'Elevar el  nivel  de  participación  de  grupos  multidisciplinarios  dentro  de  proyectos investigativos  de Tecnologías  de  la  Información,  vinculantes  a  la  colectividad  que empleen de forma eficiente recursos tecnológicos y procesos institucionales, mejorando el nivel de vida de los diferentes actores.',
    },
  ],
}) => {
  return (
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm md:text-base mb-2">General</h3>
          <p className="text-sm md:text-base">{generalText}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-base mb-2">Específicos</h3>
          <ul className="space-y-2">
            {specificObjectives.map((item, index) => (
              <li key={index} className="text-sm md:text-base">
                <span className="font-semibold">{item.title}</span> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Objetivos;
