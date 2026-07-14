export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const settingsSections: SettingsSection[] = [
  { id: 'profile', title: 'Profile', description: 'Your personal information', icon: 'User', keywords: ['profile', 'name', 'username', 'bio', 'avatar'] },
  { id: 'account', title: 'Account', description: 'Email and password', icon: 'Shield', keywords: ['account', 'email', 'password', 'login'] },
  { id: 'language', title: 'Language', description: 'Display language', icon: 'Globe', keywords: ['language', 'lang', 'bangla', 'english', 'bn', 'en'] },
  { id: 'about', title: 'About', description: 'Version and legal', icon: 'Info', keywords: ['about', 'version', 'github', 'privacy', 'terms', 'legal'] },
];
