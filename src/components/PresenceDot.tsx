import { cn } from "@/lib/utils";

interface PresenceDotProps {
  color?: "cyan" | "magenta" | "green";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const PresenceDot = ({ color = "green", size = "md", animate = true }: PresenceDotProps) => {
  const colors = {
    cyan: "bg-neon-cyan",
    magenta: "bg-neon-magenta",
    green: "bg-neon-green",
  };

  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span className="relative inline-flex">
      <span className={cn(sizes[size], colors[color], "rounded-full")} />
      {animate && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            colors[color],
            "animate-ping-slow"
          )}
        />
      )}
    </span>
  );
};
