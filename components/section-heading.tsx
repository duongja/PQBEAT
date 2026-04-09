export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl space-y-4">
      <p className="font-label text-[11px] font-semibold tracking-[0.32em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">{description}</p>
    </div>
  );
}
