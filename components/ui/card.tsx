import { cn } from "@/lib/utils";

export function Card({ children, className }: any) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-premium",
        className
      )}
    >
      {children}
    </div>
  );
}
