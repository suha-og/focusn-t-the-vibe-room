import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Coffee, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Floating icons */}
        <div className="absolute top-20 left-10 md:left-20 animate-float opacity-30">
          <Coffee className="w-8 h-8 text-neon-cyan" />
        </div>
        <div className="absolute top-40 right-10 md:right-20 animate-float opacity-30" style={{ animationDelay: "-2s" }}>
          <Brain className="w-10 h-10 text-neon-magenta" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float opacity-30" style={{ animationDelay: "-4s" }}>
          <Zap className="w-6 h-6 text-neon-purple" />
        </div>

        {/* Main content */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-neon-cyan animate-pulse-glow" />
            <span className="text-sm font-body text-muted-foreground tracking-widest uppercase">
              100% unproductive
            </span>
            <Sparkles className="w-6 h-6 text-neon-magenta animate-pulse-glow" />
          </div>
        </div>

        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6 animate-fade-in gradient-text"
          style={{ animationDelay: "0.4s" }}
        >
          Focusn't
        </h1>

        <p 
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-body animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          A study app that does{" "}
          <span className="text-neon-magenta neon-text-magenta">everything</span>{" "}
          except help you study
        </p>

        <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button 
            variant="neon" 
            size="xl" 
            onClick={() => navigate("/rooms")}
            className="group"
          >
            <span>Enter the Delusion</span>
            <Zap className="w-5 h-5 ml-2 group-hover:animate-wiggle" />
          </Button>
        </div>

        {/* Stats bar */}
        <div 
          className="mt-20 flex flex-wrap justify-center gap-8 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          {[
            { value: "0%", label: "Productivity" },
            { value: "∞", label: "Procrastination" },
            { value: "100%", label: "Vibes" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary neon-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-muted-foreground animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <p className="text-sm font-body">
          <span className="gradient-text font-semibold">0% logic. 100% vibes.</span>
        </p>
        <p className="text-xs mt-1 opacity-60">Built using vibe coding only.</p>
      </footer>
    </div>
  );
};

export default Index;
