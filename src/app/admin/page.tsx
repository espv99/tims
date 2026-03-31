import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <Card className="h-96 flex items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle>Panel de Administración TIMS</CardTitle>
          <CardDescription>
            Gestiona noticias y eventos desde aquí.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-x-4">
            <Button asChild>
              <Link href="/admin/news">Gestionar Noticias</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/events">Gestionar Eventos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}