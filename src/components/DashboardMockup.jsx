const bars = [40, 65, 50, 80, 58, 90, 72];
const kpis = ['Ventes', 'Clients', 'Stock'];

/** Aperçu décoratif d'interface, sans données réelles de client. */
export default function DashboardMockup() {
  return (
    <div aria-hidden="true" className="rounded-2xl border border-border bg-surface p-3 shadow-xl shadow-accent/5">
      <div className="flex items-center gap-1.5 border-b border-border px-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 h-2 w-32 rounded bg-surface-2" />
      </div>

      <div className="grid grid-cols-[48px_1fr] gap-3 pt-3">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-surface-2 py-3">
          <span className="h-6 w-6 rounded-md bg-accent" />
          <span className="h-6 w-6 rounded-md bg-border" />
          <span className="h-6 w-6 rounded-md bg-border" />
          <span className="h-6 w-6 rounded-md bg-border" />
        </div>

        <div className="min-w-0 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {kpis.map((label) => (
              <div key={label} className="rounded-lg border border-border bg-bg p-3">
                <div className="h-2 w-12 rounded bg-muted/40" />
                <div className="mt-3 h-4 w-14 rounded bg-text/80" />
                <span className="sr-only">{label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-bg p-4">
            <div className="flex h-36 items-end gap-2">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-accent/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-bg p-3">
              <div className="h-2 w-full rounded bg-surface-2" />
              <div className="mt-2 h-2 w-3/4 rounded bg-surface-2" />
              <div className="mt-2 h-2 w-1/2 rounded bg-surface-2" />
            </div>
            <div className="rounded-lg border border-border bg-bg p-3">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-accent-soft" />
                <div className="h-2 flex-1 rounded bg-surface-2" />
              </div>
              <div className="mt-3 h-2 w-2/3 rounded bg-surface-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
