type PqbeatWordmarkProps = {
  className?: string;
};

export function PqbeatWordmark({ className = "" }: PqbeatWordmarkProps) {
  return (
    <span className={`inline-flex items-end leading-none uppercase ${className}`.trim()}>
      <span className="text-[1.55rem] font-black tracking-[0.28em] text-accent">PQ</span>
      <span className="relative ml-2 inline-block text-[1.55rem] font-black tracking-[0.24em] text-foreground">
        BEAT
        <span className="absolute -right-0.5 bottom-0 left-0 h-[3px] rounded-full bg-accent/80" />
      </span>
    </span>
  );
}
