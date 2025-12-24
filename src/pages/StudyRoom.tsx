import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PopupProvider } from "@/hooks/usePopupManager";
import { GlassCard } from "@/components/GlassCard";
import { PresenceDot } from "@/components/PresenceDot";
import { Button } from "@/components/ui/button";
import { SoundPanel } from "@/components/SoundPanel";
import { DeluluToggle } from "@/components/DeluluToggle";
import { DeluluAffirmation } from "@/components/DeluluAffirmation";
import { Leaderboard } from "@/components/Leaderboard";
import { ExcuseGenerator } from "@/components/ExcuseGenerator";
import { RealityCheck } from "@/components/RealityCheck";
import { PanicButton } from "@/components/PanicButton";
import {
  roomNames,
  demotivationalQuotes,
  peerPressureMessages,
  aiResponses,
  moods,
  getRandomItem,
  getRandomNumber,
  getRandomUsers,
} from "@/data/fakeData";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Send,
  X,
  Skull,
} from "lucide-react";

const StudyRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [timerValue, setTimerValue] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(getRandomItem(demotivationalQuotes));
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [popup, setPopup] = useState<string | null>(null);
  const [users] = useState(getRandomUsers(getRandomNumber(5, 12)));
  const [deluluMode, setDeluluMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const roomName = roomNames[Number(roomId) % roomNames.length];

  // Broken timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // 20% chance to do something chaotic
      if (Math.random() < 0.2) {
        const chaos = Math.random();
        if (chaos < 0.3) {
          // Timer goes backwards
          setTimerValue((prev) => prev + getRandomNumber(1, 10));
        } else if (chaos < 0.6) {
          // Timer jumps randomly
          setTimerValue((prev) => prev + getRandomNumber(-30, 30));
        } else {
          // Normal decrement
          setTimerValue((prev) => Math.max(0, prev - 1));
        }
      } else {
        setTimerValue((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Random quote changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(getRandomItem(demotivationalQuotes));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Peer pressure popups
  useEffect(() => {
    const showPopup = () => {
      setPopup(getRandomItem(peerPressureMessages));
      setTimeout(() => setPopup(null), 5000);
    };

    const interval = setInterval(showPopup, getRandomNumber(15000, 30000));
    // Show first popup after 5 seconds
    const timeout = setTimeout(showPopup, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? "-" : "";
    return `${sign}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    // 30% chance button does nothing
    if (Math.random() < 0.3) {
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", content: inputMessage }]);
    setInputMessage("");

    // Delayed AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", content: getRandomItem(aiResponses) },
      ]);
    }, getRandomNumber(500, 1500));
  };

  const getMoodStyles = () => {
    if (!selectedMood) return {};

    const moodColors: Record<string, string> = {
      confused: "from-neon-cyan/20 to-neon-blue/20",
      regret: "from-neon-magenta/20 to-destructive/20",
      delusional: "from-neon-purple/20 to-neon-magenta/20",
      overconfident: "from-neon-green/20 to-neon-cyan/20",
    };

    return {
      background: `linear-gradient(135deg, ${moodColors[selectedMood]})`,
    };
  };

  return (
    <PopupProvider>
    <div 
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${deluluMode ? "delulu-mode" : ""}`}
      style={getMoodStyles()}
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        deluluMode 
          ? "bg-gradient-to-br from-neon-pink/10 via-background to-neon-purple/10" 
          : "bg-gradient-to-br from-background via-background to-muted"
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-500 ${
          deluluMode ? "bg-neon-pink/10" : "bg-neon-cyan/5"
        }`} />
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-500 ${
          deluluMode ? "bg-neon-purple/10" : "bg-neon-magenta/5"
        }`} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Peer pressure popup */}
      {popup && (
        <div className="fixed top-4 right-4 z-50 animate-bounce-in">
          <div className="bg-background/95 backdrop-blur-md border-2 border-neon-magenta/60 rounded-2xl p-4 shadow-2xl shadow-neon-magenta/20 max-w-sm">
            <div className="flex items-start gap-3">
              <Skull className="w-6 h-6 text-neon-magenta flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{popup}</p>
              </div>
              <button
                onClick={() => setPopup(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Button
              variant="chaos"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setPopup(null)}
            >
              Ignore Reality
            </Button>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in flex-wrap gap-4">
          <Button
            variant="glass"
            size="sm"
            onClick={() => navigate("/rooms")}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Escape
          </Button>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Delulu Toggle */}
            <DeluluToggle enabled={deluluMode} onToggle={setDeluluMode} />

            <div className="flex items-center gap-2">
              {users.slice(0, 5).map((_, i) => (
                <PresenceDot
                  key={i}
                  color={["cyan", "magenta", "green"][i % 3] as "cyan" | "magenta" | "green"}
                  size="sm"
                />
              ))}
              <span className="text-xs text-muted-foreground">
                +{users.length - 5} vibing
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted-foreground hover:text-primary"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Room title */}
        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className={`text-3xl md:text-4xl font-display font-bold mb-2 ${deluluMode ? "gradient-text" : "gradient-text"}`}>
            {roomName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {deluluMode ? "✨ Manifesting productivity ✨" : "A safe space for productive procrastination"}
          </p>
        </div>

        {/* Delulu Affirmation */}
        {deluluMode && (
          <div className="mb-8 animate-fade-in">
            <DeluluAffirmation />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Timer, quote, mood, sounds */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer */}
            <GlassCard glow={deluluMode ? "magenta" : "cyan"} className="animate-fade-in" style={{ animationDelay: "0.2s" } as React.CSSProperties}>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2 font-display">
                  {deluluMode ? "MANIFESTING TIMER™" : "BROKEN POMODORO™"}
                </p>
                <div
                  className={`text-7xl md:text-8xl font-display font-bold mb-6 transition-all ${
                    timerValue < 0 ? "text-destructive animate-glitch" : deluluMode ? "text-neon-pink neon-text-magenta" : "text-primary neon-text"
                  } ${isRunning ? "animate-pulse-glow" : ""}`}
                >
                  {formatTime(timerValue)}
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant={isRunning ? "outline" : "neon"}
                    size="lg"
                    onClick={handleStartStop}
                    className="min-w-[180px]"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Maybe Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Focus Session
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Timer may or may not work as expected
                </p>
              </div>
            </GlassCard>

            {/* Quote */}
            <GlassCard glow="magenta" className="animate-fade-in" style={{ animationDelay: "0.3s" } as React.CSSProperties}>
              <p className="text-lg md:text-xl text-center font-body italic text-foreground">
                "{currentQuote}"
              </p>
              <p className="text-sm text-center text-muted-foreground mt-3">
                — Your Conscience
              </p>
            </GlassCard>

            {/* Sound Panel */}
            <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <SoundPanel />
            </div>

            {/* Mood selector */}
            <GlassCard className="animate-fade-in" style={{ animationDelay: "0.4s" } as React.CSSProperties}>
              <p className="text-sm text-muted-foreground mb-4 font-display">
                CURRENT MOOD
              </p>
              <div className="flex flex-wrap gap-3">
                {moods.map((mood) => (
                  <Button
                    key={mood.id}
                    variant={selectedMood === mood.id ? "neon" : "glass"}
                    size="lg"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex-1 min-w-[100px] ${
                      selectedMood === mood.id ? "animate-wiggle" : ""
                    }`}
                  >
                    <span className="text-2xl mr-2">{mood.emoji}</span>
                    {mood.label}
                  </Button>
                ))}
              </div>
            </GlassCard>

            {/* Action buttons row */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.45s" }}>
              <RealityCheck />
              <PanicButton />
            </div>

            {/* ExcuseGenerator is now a fixed floating button - rendered outside the grid */}
          </div>

          {/* Right column - AI Chat and Leaderboard */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {/* AI Chat */}
            <GlassCard glow="purple" className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <PresenceDot color="magenta" />
                <h3 className="font-display font-semibold text-foreground">
                  AI Study Partner
                </h3>
                <span className="text-xs text-muted-foreground">(unhelpful)</span>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-3 mb-4 pr-2">
                {chatMessages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Ask me anything! I probably won't help.
                  </p>
                )}
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your doubts..."
                  className="flex-1 bg-muted/50 border border-border/50 rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button variant="neon" size="icon" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>

            {/* Leaderboard */}
            <Leaderboard />
          </div>
        </div>

        {/* Users list - with safe zone spacing for popups */}
        <div className="mt-16 md:mt-20 lg:mt-24 pt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <GlassCard>
            <p className="text-sm text-muted-foreground mb-4 font-display">
              FELLOW PROCRASTINATORS
            </p>
            <div className="flex flex-wrap gap-2">
              {users.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/30"
                >
                  <PresenceDot
                    color={["cyan", "magenta", "green"][i % 3] as "cyan" | "magenta" | "green"}
                    size="sm"
                  />
                  <span className="text-sm text-foreground">{user}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 mb-24 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <p className="text-sm">
            <span className="gradient-text font-semibold">0% logic. 100% vibes.</span>
          </p>
          <p className="text-xs mt-1 opacity-60">Built using vibe coding only.</p>
        </footer>
      </div>
    </div>

      {/* Fixed floating Excuse Generator - outside main content flow */}
      <ExcuseGenerator />
    </PopupProvider>
  );
};

export default StudyRoom;