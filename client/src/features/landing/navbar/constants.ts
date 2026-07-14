export interface NavItem {
  labelKey: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.ai', href: 'https://paathai-io.vercel.app/ai', external: true },
  { labelKey: 'nav.paathai', href: 'https://paathai-io.vercel.app', external: true },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.features', href: '#features' },
  { labelKey: 'nav.faq', href: '#faq' },
];
