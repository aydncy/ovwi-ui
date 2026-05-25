import { cn } from "@/lib/ui/cn";

export function Button({ className, ...props }: any) {
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-medium transition",
        className
      )}
    />
  );
}
