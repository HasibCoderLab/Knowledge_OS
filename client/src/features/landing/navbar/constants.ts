export interface NavItem {
  labelKey: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.features', href: '#features' },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.subjects', href: 'https://paathai-io.vercel.app/subjects', external: true },
  { labelKey: 'nav.aiRooms', href: 'https://paathai-io.vercel.app/ai-room', external: true },
  { labelKey: 'nav.practice', href: 'https://paathai-io.vercel.app/practice', external: true },
  { labelKey: 'nav.faq', href: '#faq' },
];
