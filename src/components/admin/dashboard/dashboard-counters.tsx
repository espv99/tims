import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export interface DashboardCounter {
  label: string
  value: number
  href: string
  icon: LucideIcon
}

interface DashboardCountersProps {
  heading: string
  counters: DashboardCounter[]
}

export function DashboardCounters({ heading, counters }: DashboardCountersProps) {
  return (
    <section aria-labelledby="dashboard-counters-heading">
      <h2 id="dashboard-counters-heading" className="sr-only">
        {heading}
      </h2>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:flex">
        {counters.map(({ label, value, href, icon: Icon }) => (
          <li key={href} className="bg-card lg:flex-1">
            <Link
              href={href}
              className="flex min-h-11 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-lg font-semibold tabular-nums text-foreground">{value}</span>
              <span className="truncate text-sm text-muted-foreground">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
