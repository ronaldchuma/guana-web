export default function TripLoading() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-md">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full rounded-2xl bg-cream-light p-8 text-center shadow-card">
            <div className="mx-auto h-20 w-20 animate-pulse rounded-2xl bg-teal/20" />
            <div className="mx-auto mt-6 h-7 w-48 animate-pulse rounded bg-deep/10" />
            <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-deep/5" />
            <div className="mt-6 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal/20 border-t-teal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
