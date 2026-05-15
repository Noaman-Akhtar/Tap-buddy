export const MockData = {
  student: {
    name: "Aman",
    grade: "8",
    streak: 12,
    accessRate: 85,
    submissionRate: 60,
  },
  inProgressUnits: [
    {
      id: "u1",
      title: "Intro to Fractions",
      course: "Science",
      progress: 60,
      accentColor: "#d9f3e1",
    },
    {
      id: "u2",
      title: "Basic Loops in Python",
      course: "Coding",
      progress: 25,
      accentColor: "#dcecfa",
    },
    {
      id: "u3",
      title: "Color Theory Basics",
      course: "Arts",
      progress: 80,
      accentColor: "#ffe8d4",
    },
  ],
  courses: [
    { id: "c1", title: "Coding", label: "STEM - Coding", color: "#dcecfa", icon: "laptop-outline" },
    { id: "c2", title: "Science", label: "STEM - Science", color: "#d9f3e1", icon: "flask-outline" },
    { id: "c3", title: "Arts", label: "Visual Arts", color: "#ffe8d4", icon: "color-palette-outline" },
    { id: "c4", title: "Dance", label: "Performing Arts", color: "#fde0ec", icon: "musical-notes-outline" },
    { id: "c5", title: "Financial", label: "Financial Literacy", color: "#e6e0f5", icon: "cash-outline" },
  ],
  chatMessages: [
    {
      id: "m1",
      role: "bot",
      content: "Hi Aman! I'm TAP Buddy, your AI tutor. What would you like to learn today? 🌟",
      time: "10:00 AM",
    },
    {
      id: "m2",
      role: "user",
      content: "Can you explain how loops work in Python?",
      time: "10:05 AM",
    },
    {
      id: "m3",
      role: "bot",
      content: "Absolutely! Think of a loop like a repeating alarm. Instead of writing the same code 10 times, you write it once and tell Python to repeat it.\n\nFor example:\nfor i in range(3):\n    print('Hello!')\n\nThis prints 'Hello!' three times!",
      time: "10:05 AM",
    },
  ],
};
