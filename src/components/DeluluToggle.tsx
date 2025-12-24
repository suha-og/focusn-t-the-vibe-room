import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";

interface DeluluToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const DeluluToggle = ({ enabled, onToggle }: DeluluToggleProps) => {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
      enabled 
        ? "bg-neon-pink/20 border border-neon-pink/50" 
        : "bg-muted/50 border border-border/30"
    }`}>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-neon-pink"
      />
      <span className={`text-sm font-display flex items-center gap-2 ${
        enabled ? "text-neon-pink" : "text-muted-foreground"
      }`}>
        {enabled && <Sparkles className="w-4 h-4 animate-sparkle" />}
        Delulu Mode
        {enabled && <Sparkles className="w-4 h-4 animate-sparkle" />}
      </span>
    </div>
  );
};
