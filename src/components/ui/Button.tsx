import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: { className?: string, variant?: "primary" | "secondary" | "outline" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-opacity-90",
    secondary: "bg-brand-coral text-white hover:bg-opacity-90",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-full font-semibold transition-all active:scale-95",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
