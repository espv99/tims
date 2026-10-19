import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Header } from '@/sections/header/Header'
import { Mail } from 'lucide-react'

export default async function PersonalDocentePage() {
  const t = await getTranslations('teachers')
  const teachers = await prisma.teacher.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>

        {teachers.length === 0 ? (
          <p className="text-center text-muted-foreground">{t('empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center"
              >
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-border mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground border-2 border-border mb-4">
                    {teacher.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <h2 className="font-semibold text-foreground">{teacher.name}</h2>
                {teacher.title && <p className="text-sm text-primary font-medium mt-0.5">{teacher.title}</p>}
                {teacher.specialty && <p className="text-sm text-muted-foreground mt-1">{teacher.specialty}</p>}
                {teacher.email && (
                  <a
                    href={`mailto:${teacher.email}`}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-2 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {teacher.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
