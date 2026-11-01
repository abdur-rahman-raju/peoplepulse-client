export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-box border border-base-300">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-4 w-2/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton h-2 w-full" />
        <div className="skeleton h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading events">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}