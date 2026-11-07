import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonCard() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <Skeleton className="w-3 h-3 rounded-full mt-5 flex-shrink-0" />
        <div className="w-px flex-1 bg-border mt-1" />
      </div>
      <div className="flex-1 bg-card border border-border rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}
