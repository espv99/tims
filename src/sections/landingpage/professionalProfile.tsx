import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfessionalProfileProps {
  title?: string;
  description?: string;
  items?: { title: string; description: string }[];
}

const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({
  title = 'Perfil Profesional',
  description = 'El Ingeniero/a en Tecnologías de la Información, Sede Morona será capaz de mejorar el desempeño de las organizaciones en función de las tendencias tecnológicas en el contexto local, regional y nacional con bases sólidas en datos, redes, plataformas tecnológicas, ciencias administrativas y procesos de negocio. Un gestionador de proyectos TI con toma de decisiones estratégicos.',
  items = [
    {
      title: 'Conocimientos técnicos sólidos:',
      description:
        'Conocimientos profundos de programación, bases de datos, redes, seguridad informática, inteligencia artificial, multimedia, entre otros temas vinculados a las tecnologías de la información.',
    },
    {
      title: 'Habilidades de resolución de problemas:',
      description:
        'Capacidad para identificar problemas y proponer soluciones de manera efectiva y eficiente, al menor costo.',
    },
    {
      title: 'Habilidades de comunicación:',
      description:
        'Destrezas para comunicar de manera efectiva, las posibles alternativas de solución, a personas con diferentes niveles de conocimiento técnico.',
    },
    {
      title: 'Habilidades de liderazgo y colaboración:',
      description:
        'Capacidad para trabajar en equipo y liderar proyectos de tecnologías de la información.',
    },
    {
      title: 'Adaptabilidad y flexibilidad:',
      description:
        'Capacidad para adaptarse a diferentes entornos laborales en un ambiente que evoluciona constantemente demostrando flexibilidad en el aprendizaje de nuevas tecnologías y herramientas.',
    },
    {
      title: 'Pensamiento crítico y creativo:',
      description:
        'Capacidad crítica para el análisis de la información y creatividad para proponer soluciones innovadoras.',
    },
    {
      title: 'Conocimientos de negocios:',
      description:
        'Capacidad para encontrar nichos de mercado y necesidades que requieran una solución basada en tecnologías de la información.',
    },
    {
      title: 'Ética profesional:',
      description:
        'Compromiso con la integridad, la confidencialidad y la privacidad de la información.',
    },
  ],
}) => {
  return (
    <Card className="mx-4 my-4 max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm md:text-base">{description}</p>
        <p className="text-sm md:text-base font-semibold mb-2">
          El perfil profesional del ingeniero en tecnologías de la información incluye las siguientes características y habilidades:
        </p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm md:text-base">
              <span className="font-semibold">{item.title}</span> {item.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProfessionalProfile;
