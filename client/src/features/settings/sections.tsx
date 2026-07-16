import React, { useState } from 'react';
import {
  User, Shield, Globe, Info,
  Camera, Check, ExternalLink,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useLanguage } from '../../i18n/useLanguage';
import { useAuthStore } from '../../store/authStore';
import type { SupportedLocale } from '../../i18n/locales';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
    </div>
  </div>
);

export const ProfileSection: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [username, setUsername] = useState(user?.username ?? '');

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div>
      <SectionHeader icon={<User size={20} />} title={t('settings.profile.title')} description={t('settings.profile.description')} />
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              {initials}
            </div>
            <button className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{name || 'User'}</p>
            {username && <p className="text-xs text-slate-500 dark:text-slate-400">@{username}</p>}
          </div>
        </div>
        <Input
          label={t('settings.profile.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={t('settings.profile.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">{t('settings.profile.bio')}</label>
          <textarea
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            rows={3}
            placeholder="Tell us about yourself..."
            defaultValue={user?.bio ?? ''}
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm">{t('settings.saveChanges')}</Button>
        </div>
      </div>
    </div>
  );
};

export const AccountSection: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuthStore();

  return (
    <div>
      <SectionHeader icon={<Shield size={20} />} title={t('settings.account.title')} description={t('settings.account.description')} />
      <div className="space-y-5">
        <Input
          label={t('settings.account.email')}
          type="email"
          value={user?.email ?? ''}
          disabled
        />
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">{t('settings.account.password')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label={t('settings.account.newPassword')} type="password" />
            <Input label={t('settings.account.confirmPassword')} type="password" />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="primary" size="sm">{t('settings.account.updatePassword')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LanguageSection: React.FC = () => {
  const { t, locale, setLocale } = useLanguage();

  return (
    <div>
      <SectionHeader icon={<Globe size={20} />} title={t('settings.language.title')} description={t('settings.language.description')} />
      <div className="space-y-2 max-w-sm">
        {([
          { code: 'bn' as SupportedLocale, label: 'বাংলা', native: 'বাংলা (Bangla)' },
          { code: 'en' as SupportedLocale, label: 'English', native: 'English' },
        ]).map((lang) => {
          const active = locale === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{lang.code === 'bn' ? '🇧🇩' : '🇺🇸'}</span>
                <span>{lang.label}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">({lang.native})</span>
              </span>
              {active && <Check size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { label: t('settings.about.github'), href: 'https://github.com/anomalyco/KnowledgeOS' },
    { label: t('settings.about.privacy'), href: '#' },
    { label: t('settings.about.terms'), href: '#' },
  ];

  return (
    <div>
      <SectionHeader icon={<Info size={20} />} title={t('settings.about.title')} description={t('settings.about.description')} />
      <div className="space-y-6 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('settings.about.appVersion')}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">v1.2.0</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{t('settings.about.frontendVersion')}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">v1.0.0</p>
          </div>
        </div>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{link.label}</span>
              <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
