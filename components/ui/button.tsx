import { cn } from "@/lib/utils";

export function Button({
  children,
  className,
  variant = "primary",
}: any) {
  const base =
    "px-6 py-3 rounded-2xl font-medium transition-all duration-200";

  const styles = {
    primary:
      "bg-white text-black hover:scale-[1.02] shadow-glow",
    secondary:
      "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-xl",
    ghost: "text-white hover:bg-white/5",
  };

  return (
    <button className={cn(base, styles[variant], className)}>
      {children}
    </button>
  );
}
