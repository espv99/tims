import React from 'react'
import { Header } from '@/sections/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DirectivaItem {
  nombre: string
  cargo: string
  email?: string
}

const directiva: DirectivaItem[] = [
  { nombre: 'Por definir', cargo: 'Presidente', email: '' },
  { nombre: 'Por definir', cargo: 'Vicepresidente', email: '' },
  { nombre: 'Por definir', cargo: 'Secretario/a', email: '' },
  { nombre: 'Por definir', cargo: 'Tesorero/a', email: '' },
  { nombre: 'Por definir', cargo: 'Vocal Principal', email: '' },
]

export default function ClubPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Club TIMS</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Espacio estudiantil de la carrera de Ingeniería en Tecnologías de la Información — ESPOCH Morona Santiago.
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
              Fomentar el desarrollo académico, técnico y profesional de los estudiantes de TI mediante actividades
              extracurriculares, proyectos colaborativos y la vinculación con la industria tecnológica, fortaleciendo
              el aprendizaje continuo y el trabajo en equipo.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">◎</span> Visión
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Ser el referente estudiantil de innovación tecnológica en la región, formando profesionales íntegros
              capaces de liderar proyectos de impacto social y económico, integrando los avances en inteligencia
              artificial, ciberseguridad y transformación digital.
            </CardContent>
          </Card>
        </div>

        {/* Directiva */}
        <Card>
          <CardHeader>
            <CardTitle>Directiva del Club</CardTitle>
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
      </div>
    </div>
  )
}
