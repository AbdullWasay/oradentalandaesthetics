export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-sans-tight text-muted-foreground">
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}
