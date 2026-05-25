import { cn } from "@/lib/ui/cn";

export function Card({ className, ...props }: any) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5",
        className
      )}
    />
  );
}
