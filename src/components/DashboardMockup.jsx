const bars = [40, 65, 50, 80, 58, 90, 72];
const kpis = ['Ventes', 'Clients', 'Stock'];

/** Aperçu décoratif d'interface, sans données réelles de client. */
export default function DashboardMockup() {
  return (
    <div className="mx-auto max-w-4xl">
      <div
        aria-hidden="true"
        className="rounded-4xl border hairline bg-surface p-2 shadow-float sm:p-3"
      >
        <div className="overflow-hidden rounded-3xl bg-surface-2/60">
          <div className="flex items-center gap-1.5 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="mx-auto h-5 w-40 rounded-full bg-surface" />
          </div>

          <div className="grid grid-cols-[52px_1fr] gap-3 p-3 sm:grid-cols-[64px_1fr] sm:gap-4 sm:p-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface py-4">
              <span className="h-7 w-7 rounded-xl bg-accent" />
              <span className="h-7 w-7 rounded-xl bg-surface-2" />
              <span className="h-7 w-7 rounded-xl bg-surface-2" />
              <span className="h-7 w-7 rounded-xl bg-surface-2" />
            </div>

            <div className="min-w-0 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {kpis.map((label) => (
                  <div key={label} className="rounded-2xl bg-surface p-3 sm:p-4">
                    <div className="h-2 w-10 rounded-full bg-muted/30" />
                    <div className="mt-3 h-4 w-14 rounded-full bg-text/80" />
                    <span className="sr-only">{label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-surface p-4 sm:p-5">
                <div className="flex h-28 items-end gap-2 sm:h-40 sm:gap-3">
                  {bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-lg bg-accent/85"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-surface p-3 sm:p-4">
                  <div className="h-2 w-full rounded-full bg-surface-2" />
                  <div className="mt-2.5 h-2 w-3/4 rounded-full bg-surface-2" />
                  <div className="mt-2.5 h-2 w-1/2 rounded-full bg-surface-2" />
                </div>
                <div className="rounded-2xl bg-surface p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-full bg-accent-soft" />
                    <div className="h-2 flex-1 rounded-full bg-surface-2" />
                  </div>
                  <div className="mt-3 h-2 w-2/3 rounded-full bg-surface-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
