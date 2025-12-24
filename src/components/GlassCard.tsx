import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "magenta" | "purple" | "none";
  style?: CSSProperties;
}

export const GlassCard = ({ children, className, hover = true, glow = "none", style }: GlassCardProps) => {
  const glowStyles = {
    cyan: "hover:shadow-[0_0_30px_hsla(180,100%,50%,0.3)]",
    magenta: "hover:shadow-[0_0_30px_hsla(320,100%,60%,0.3)]",
    purple: "hover:shadow-[0_0_30px_hsla(280,100%,60%,0.3)]",
    none: "",
  };

  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        hover && "transition-all duration-300 hover:bg-card/50 hover:border-primary/40",
        glowStyles[glow],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
