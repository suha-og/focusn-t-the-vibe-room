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
  "Let's pretend we understand this and move on.",
];

export const excuses = [
  "Network issues during submission",
  "Laptop updated itself emotionally",
  "ChatGPT misunderstood my intentions",
  "My code worked on my machine",
  "The deadline was in a different timezone",
  "I was debugging my life choices",
  "GitHub ate my homework",
  "My IDE had commitment issues",
  "The WiFi was having an identity crisis",
  "My brain's RAM was full",
  "Stack Overflow was down (emotionally)",
  "I was caught in a merge conflict with reality",
  "My motivation was on airplane mode",
  "The compiler didn't understand my vision",
  "I was refactoring my sleep schedule",
];

export const deluluAffirmations = [
  "You will top. Manifesting ✨",
  "Understanding is optional.",
  "You're just built different 💫",
  "Main character energy activated",
  "The exam will be easy because you believe ✨",
  "You don't need notes, you have vibes",
  "Topper material, fr fr 🌟",
  "The curve will save you, trust",
  "You studied in your past life 💅",
  "Academic weapon loading... ✨",
  "Failure is not in your vocabulary (neither is the syllabus)",
];

export const futureYouMessages = [
  "Hey. It's you from results day. You survived.",
  "Backlogs cleared. Mentally not.",
  "You passed. Don't ask how.",
  "Future you says thanks for at least opening the notes.",
  "It worked out. The method was questionable.",
  "Spoiler: you get the job. After 47 rejections.",
  "You're reading this in a better place. Same room though.",
  "The all-nighter was worth it. Barely.",
  "You'll laugh about this later. Nervously.",
  "Things get better. The imposter syndrome doesn't.",
  "You made it. Your sleep schedule didn't.",
  "Plot twist: you become the person others ask for help.",
  "Future you is proud. And still confused.",
  "The anxiety was unnecessary. The panic was valid though.",
  "You survived the viva. The PTSD remains.",
];

export const leaderboardData = {
  mostTabsOpen: [
    { name: "TabHoarder9000", score: 847 },
    { name: "YOU", score: 423 },
    { name: "ChromeCrasher", score: 312 },
    { name: "RAMDestroyer", score: 287 },
    { name: "BrowserBreaker", score: 201 },
  ],
  leastStudyingDone: [
    { name: "ProcrastiPro", score: "0.3 mins" },
    { name: "YOU", score: "2.1 mins" },
    { name: "DistractedDan", score: "4.7 mins" },
    { name: "NetflixNinja", score: "8.2 mins" },
    { name: "ScrollQueen", score: "12.4 mins" },
  ],
  highestConfidence: [
    { name: "DeluluDev", score: "99%" },
    { name: "YOU", score: "97%" },
    { name: "OverconfidentOllie", score: "94%" },
    { name: "CluelesCarl", score: "91%" },
    { name: "WingItWendy", score: "88%" },
  ],
};

export const backgroundSounds = [
  { id: "keyboard", label: "Keyboard Smashing", emoji: "⌨️" },
  { id: "roommate", label: "Hostel Roommate", emoji: "🗣️" },
  { id: "fan", label: "Fan Noise", emoji: "🌀" },
  { id: "construction", label: "Construction", emoji: "🔨" },
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
