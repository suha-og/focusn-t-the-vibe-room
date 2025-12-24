import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { PresenceDot } from "@/components/PresenceDot";
import { Button } from "@/components/ui/button";
import { roomNames, getRandomUsers, getRandomNumber } from "@/data/fakeData";
import { ArrowLeft, Users, Sparkles } from "lucide-react";

interface Room {
  id: number;
  name: string;
  userCount: number;
  users: string[];
}

const StudyRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Generate random rooms
    const generatedRooms = roomNames.slice(0, 8).map((name, index) => {
      const userCount = getRandomNumber(3, 15);
      return {
        id: index,
        name,
        userCount,
        users: getRandomUsers(Math.min(userCount, 4)),
      };
    });
    setRooms(generatedRooms);

    // Randomly update user counts
    const interval = setInterval(() => {
      setRooms((prev) =>
        prev.map((room) => ({
          ...room,
          userCount: Math.max(1, room.userCount + getRandomNumber(-2, 3)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-magenta/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <Button
            variant="glass"
            size="sm"
            onClick={() => navigate("/")}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Reality
          </Button>

          <div className="flex items-center gap-2 text-muted-foreground">
            <PresenceDot color="green" />
            <span className="text-sm">
              {rooms.reduce((sum, room) => sum + room.userCount, 0)} pretending
              to study
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Fake Study Rooms
          </h1>
          <p className="text-muted-foreground">
            Join a room. Pretend to focus. Repeat.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room, index) => (
            <GlassCard
              key={room.id}
              glow="cyan"
              className="cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` } as React.CSSProperties}
            >
              <div onClick={() => navigate(`/room/${room.id}`)}>
                {/* Room header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {room.name}
                  </h3>
                  <Sparkles className="w-5 h-5 text-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* User count */}
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{room.userCount} "studying"</span>
                </div>

                {/* Presence dots */}
                <div className="flex items-center gap-3 mb-4">
                  {room.users.slice(0, 4).map((user, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <PresenceDot
                        color={["cyan", "magenta", "green"][i % 3] as "cyan" | "magenta" | "green"}
                        size="sm"
                      />
                    </div>
                  ))}
                  {room.userCount > 4 && (
                    <span className="text-xs text-muted-foreground">
                      +{room.userCount - 4} more
                    </span>
                  )}
                </div>

                {/* Sample users */}
                <div className="flex flex-wrap gap-1">
                  {room.users.slice(0, 3).map((user, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                    >
                      {user}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom chaos message */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground text-sm">
            <span className="text-neon-magenta">Warning:</span> No actual
            studying has ever occurred in these rooms
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyRooms;
