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
    <div className="relative border border-line bg-surface px-5 py-6 shadow-[0_18px_38px_rgba(27,28,26,0.05)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-copper to-transparent" />
      <p className="font-label text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">{label}</p>
      <p className="mt-5 font-headline text-5xl font-semibold tracking-[-0.06em] text-foreground">{value}</p>
      <p className="mt-4 max-w-xs text-sm leading-7 text-muted">{hint}</p>
    </div>
  );
}
