import React from 'react'
import { Header } from '@/sections/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MiembroDirectiva {
  nombre: string
  cargo: string
  email?: string
}

const directiva: MiembroDirectiva[] = [
  { nombre: 'Por definir', cargo: 'Presidente', email: '' },
  { nombre: 'Por definir', cargo: 'Vicepresidente', email: '' },
  { nombre: 'Por definir', cargo: 'Secretario/a', email: '' },
  { nombre: 'Por definir', cargo: 'Tesorero/a', email: '' },
  { nombre: 'Por definir', cargo: 'Vocal Principal', email: '' },
]

export default function ConsejoEstudiantilPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Consejo Estudiantil</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Órgano representativo de los estudiantes de la carrera de Ingeniería en Tecnologías de la Información — ESPOCH Morona Santiago.
          </p>
        </div>

        {/* Visión y Misión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">◎</span> Misión
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Representar y defender los derechos e intereses de los estudiantes de la carrera de TI,
              promoviendo la participación activa, la transparencia y el desarrollo integral de la comunidad
              estudiantil a través de iniciativas que fortalezcan la identidad y el compromiso académico.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">◎</span> Visión
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Ser un consejo estudiantil líder y propositivo que impulse el cambio positivo en la institución,
              consolidando espacios de diálogo, participación y desarrollo de competencias profesionales y
              ciudadanas entre los estudiantes de Tecnologías de la Información.
            </CardContent>
          </Card>
        </div>

        {/* Directiva */}
        <Card>
          <CardHeader>
            <CardTitle>Directiva del Consejo Estudiantil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {directiva.map((miembro) => (
                <div
                  key={miembro.cargo}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 hover:bg-muted/70 transition-colors"
                >
                  <Badge variant="secondary" className="w-fit text-xs">
                    {miembro.cargo}
                  </Badge>
                  <p className="font-semibold text-foreground">{miembro.nombre}</p>
                  {miembro.email && (
                    <p className="text-xs text-muted-foreground truncate">{miembro.email}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatutos */}
        <Card>
          <CardHeader>
            <CardTitle>Estatutos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Los estatutos del Consejo Estudiantil regulan la organización, funciones y responsabilidades
              de sus miembros, garantizando una gestión transparente y democrática.
            </p>
            <p>
              <strong>Capítulo I — De la Naturaleza y Objetivos:</strong> El Consejo Estudiantil es el órgano
              de representación estudiantil encargado de velar por los derechos y deberes de los estudiantes
              de la carrera.
            </p>
            <p>
              <strong>Capítulo II — De la Estructura Organizativa:</strong> El consejo está conformado por la
              directiva ejecutiva y representantes de cada nivel académico, elegidos mediante votación democrática.
            </p>
            <p>
              <strong>Capítulo III — De las Atribuciones:</strong> Son funciones del consejo promover la
              participación estudiantil, mediar en conflictos, gestionar proyectos estudiantiles y mantener
              comunicación con las autoridades académicas.
            </p>
            <p className="text-sm italic border-l-2 border-primary pl-3">
              Los estatutos completos estarán disponibles próximamente en formato PDF para consulta de toda la comunidad.
            </p>
          </CardContent>
        </Card>

        {/* Funciones */}
        <Card>
          <CardHeader>
            <CardTitle>Principales Funciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>Representar oficialmente a los estudiantes ante las autoridades de la carrera y la institución.</li>
              <li>Promover y organizar actividades académicas, culturales y deportivas.</li>
              <li>Velar por el cumplimiento de los derechos y deberes estudiantiles.</li>
              <li>Canalizar inquietudes y propuestas de mejora desde la comunidad estudiantil.</li>
              <li>Fomentar la participación activa en instancias de toma de decisiones académicas.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
