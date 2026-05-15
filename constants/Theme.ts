export const Theme = {
  colors: {
    primary: '#2ead4b',
    primaryLight: '#d9f3e1',
    primaryPale: '#edf8f0',
    onPrimary: '#ffffff',
    canvas: '#f5f1ec',
    surface: '#ffffff',
    ink: '#1a1a1a',
    inkSecondary: '#5d5b54',
    inkMuted: '#787671',
    hairline: '#e5e3df',
    // Pastel Subject Tints
    tintCoding: '#dcecfa', // Sky
    tintScience: '#d9f3e1', // Mint
    tintLanguage: '#fde0ec', // Rose
    tintArts: '#ffe8d4', // Peach
    tintFinancial: '#e6e0f5', // Lavender
    tintGeneric: '#f8f5e8',
    // Semantic
    success: '#2ead4b',
    warning: '#dd5b00',
    error: '#d03238',
    // Chat
    chatUserBubble: '#2ead4b',
    chatBotBubble: '#ffffff',
    chatBotBorder: '#e5e3df',
    // Tab bar
    tabIconDefault: '#787671',
    tabIconSelected: '#2ead4b',
  },
  typography: {
    display: { fontSize: 28, lineHeight: 32, fontWeight: '700' as const },
    heading1: { fontSize: 24, lineHeight: 29, fontWeight: '600' as const },
    heading2: { fontSize: 20, lineHeight: 25, fontWeight: '600' as const },
    heading3: { fontSize: 17, lineHeight: 22, fontWeight: '600' as const },
    body: { fontSize: 15, lineHeight: 23, fontWeight: '400' as const },
    bodySm: { fontSize: 13, lineHeight: 20, fontWeight: '400' as const },
    button: { fontSize: 15, lineHeight: 18, fontWeight: '600' as const },
    caption: { fontSize: 12, lineHeight: 17, fontWeight: '400' as const },
    tab: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  rounded: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#1a1a1a',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#1a1a1a',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
  }
};
