type PqbeatWordmarkProps = {
  className?: string;
};

export function PqbeatWordmark({ className = "" }: PqbeatWordmarkProps) {
  return (
    <span className={`inline-flex items-end leading-none uppercase ${className}`.trim()}>
      <span className="font-label text-[1.15rem] font-semibold tracking-[0.42em] text-accent">PQ</span>
      <span className="relative ml-2 inline-block font-headline text-[2rem] font-semibold tracking-[-0.08em] text-foreground">
        BEAT
        <span className="absolute -right-1 bottom-0 left-0 h-px bg-copper/70" />
      </span>
    </span>
  );
}
