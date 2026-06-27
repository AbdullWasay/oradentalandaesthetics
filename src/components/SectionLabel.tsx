import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-sans-tight text-muted-foreground", className)}>
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}
