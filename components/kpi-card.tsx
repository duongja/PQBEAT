export function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[28px] border border-line bg-panel p-6 shadow-[0_10px_30px_rgba(22,24,29,0.04)]">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-3 max-w-xs text-sm leading-7 text-muted">{hint}</p>
    </div>
  );
}
