export const roomNames = [
  "Studying but Crying",
  "Exam Tomorrow, Vibes Today",
  "Opened VS Code, Did Nothing",
  "Pretending to Focus",
  "Brain.exe Has Crashed",
  "Ctrl+C My Life Choices",
  "404: Motivation Not Found",
  "Panic Room (Literally)",
  "Speedrunning Burnout",
  "The Procrastination Station",
  "One More YouTube Video",
  "Stack Overflow Therapy",
];

export const fakeUsernames = [
  "DelusionalDev",
  "CaffeineCrash",
  "SleepIsForTheWeak",
  "CodeAndCry",
  "BugHunterPro",
  "StackOverflowSurvivor",
  "TabbedOut",
  "NullPointerNinja",
  "SyntaxErrorSam",
  "DebugDespair",
  "GitPushAndPray",
  "CompileTimeAnxiety",
  "LofiAndLoneliness",
  "KeyboardWarrior",
  "CopyPasteChaos",
  "UndefinedUncle",
  "RecursiveRegret",
  "AsyncAnxiety",
  "PromiseRejecter",
  "CatchBlockClaude",
];

export const demotivationalQuotes = [
  "Topper started yesterday.",
  "You still have time. (You don't.)",
  "Your code works? That's suspicious.",
  "Sleep is for people who aren't failing.",
  "Google can't save you now.",
  "The deadline was a suggestion, right?",
  "At least you opened the textbook.",
  "Your imposter syndrome is accurate.",
  "Coffee won't fix this.",
  "The tutorial looked so easy...",
  "Maybe next semester.",
  "Your IDE judges you silently.",
  "That bug will haunt your dreams.",
  "Remember when you had hope?",
  "The syllabus was optional, right?",
];

export const peerPressureMessages = [
  "🚨 42 students just finished 5 chapters",
  "Your friend solved 3 LeetCode hards",
  "Someone in your batch got a Google offer",
  "15 people just completed their projects",
  "Your roommate is on a 100-day streak",
  "The class average is 95%",
  "Everyone's internship is confirmed except yours",
  "Your junior just published a research paper",
  "The topper has already revised twice",
  "2,847 people are studying right now (you're not)",
];

export const aiResponses = [
  "Have you tried turning your brain off and on again?",
  "The answer is definitely 42. Trust me.",
  "That's a great question! I'm going to pretend I didn't see it.",
  "According to my calculations... *error noise*",
  "Just wing it, what's the worst that could happen?",
  "Your professor probably doesn't know either.",
  "Copy from Stack Overflow like a real developer.",
  "I would help, but I'm also having an existential crisis.",
  "The real answer was the friends we made along the way.",
  "Bold of you to assume I know things.",
  "Have you considered a career change?",
  "That's above my pay grade (I don't get paid).",
  "Let me consult my source: pure chaos.",
  "The answer is somewhere between 'maybe' and 'probably not'.",
  "I'm just a parody AI, I have no idea what I'm doing.",
];

export const moods = [
  { id: "confused", emoji: "😵", label: "Confused", color: "cyan" as const },
  { id: "regret", emoji: "😭", label: "Regret", color: "magenta" as const },
  { id: "delusional", emoji: "🤡", label: "Delusional", color: "purple" as const },
  { id: "overconfident", emoji: "😎", label: "Overconfident", color: "green" as const },
];

export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomUsers = (count: number): string[] => {
  const shuffled = [...fakeUsernames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
