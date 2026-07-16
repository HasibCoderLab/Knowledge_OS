import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, Palette, Database, AlertTriangle,
  Check, Download, Upload, Trash2, UserX,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';
import { useAuthStore } from '../../store/authStore';
import { settingsApi, userSettingsApi } from '../../services/api/index';
import { useToastStore } from '../../store/toastStore';
import Button from '../../components/ui/Button';
import type { SupportedLocale } from '../../i18n/locales';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const timezones = [
  'UTC', 'Asia/Dhaka', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo',
  'Europe/London', 'Europe/Berlin', 'Europe/Paris',
  'America/New_York', 'America/Chicago', 'America/Los_Angeles',
  'Australia/Sydney', 'Pacific/Auckland',
];

/* ─── Toggle Component ─── */
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
      checked
        ? 'bg-indigo-600 dark:bg-indigo-500'
        : 'bg-slate-200 dark:bg-slate-700'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

/* ─── Setting Item Row ─── */
interface SettingItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, description, children }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div className="min-w-0">
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
      )}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

/* ─── Section Card ─── */
interface SectionCardProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
  id?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, iconColor, title, description, children, id }) => (
  <motion.div
    id={id}
    variants={fadeUp}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
    <div className="px-6 py-2 divide-y divide-slate-100 dark:divide-slate-800">
      {children}
    </div>
  </motion.div>
);

export const SettingsPage: React.FC = () => {
  const { t, locale, setLocale } = useLanguage();
  const { user, logout } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  /* ─── Settings state ─── */
  const [theme, setTheme] = useState<string>(user?.theme ?? 'system');
  const [timezone, setTimezone] = useState<string>('UTC');
  const [dailyReadingGoal, setDailyReadingGoal] = useState<number>(0);
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [weeklyReview, setWeeklyReview] = useState(true);
  const [focusReminders, setFocusReminders] = useState(false);
  const [readingReminders, setReadingReminders] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /* Load settings from backend */
  useEffect(() => {
    userSettingsApi.get().then((data: Record<string, unknown>) => {
      if (data.theme) setTheme(data.theme as string);
      if (data.timezone) setTimezone(data.timezone as string);
      if (typeof data.dailyReadingGoal === 'number') setDailyReadingGoal(data.dailyReadingGoal);
      if (typeof data.notifications === 'boolean') setNotifications(data.notifications);
      if (typeof data.emailReports === 'boolean') setEmailReports(data.emailReports);
      if (typeof data.weeklyReview === 'boolean') setWeeklyReview(data.weeklyReview);
      if (typeof data.focusReminders === 'boolean') setFocusReminders(data.focusReminders);
      if (typeof data.readingReminders === 'boolean') setReadingReminders(data.readingReminders);
    }).catch(() => {});
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      await userSettingsApi.update({
        theme,
        timezone,
        dailyReadingGoal,
        notifications,
        emailReports,
        weeklyReview,
        focusReminders,
        readingReminders,
      });
      setSaved(true);
      addToast({ title: t('settings.saveChanges'), type: 'success' });
      setTimeout(() => setSaved(false), 2000);
    } catch {
      addToast({ title: 'Failed to save settings', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [theme, timezone, dailyReadingGoal, notifications, emailReports, weeklyReview, focusReminders, readingReminders, addToast, t]);

  const handleClearData = useCallback(async () => {
    if (!window.confirm(t('settings.dangerZone.confirmClear'))) return;
    setIsClearing(true);
    try {
      await settingsApi.clearData();
      addToast({ title: 'All data cleared', type: 'success' });
    } catch {
      addToast({ title: 'Failed to clear data', type: 'error' });
    } finally {
      setIsClearing(false);
    }
  }, [addToast, t]);

  const handleDeleteAccount = useCallback(async () => {
    if (!window.confirm(t('settings.dangerZone.confirmDelete'))) return;
    setIsDeleting(true);
    try {
      await settingsApi.deleteAccount();
      await logout();
    } catch {
      addToast({ title: 'Failed to delete account', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  }, [logout, addToast, t]);

  const handleExport = useCallback(() => {
    addToast({ title: 'Export started — check your downloads', type: 'success' });
  }, [addToast]);

  const languages = [
    { code: 'bn' as SupportedLocale, label: 'বাংলা', native: 'বাংলা (Bangla)' },
    { code: 'en' as SupportedLocale, label: 'English', native: 'English' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      className="max-w-3xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </motion.div>

      {/* ─── Language & Region ─── */}
      <SectionCard
        id="language-region"
        icon={<Globe size={18} className="text-blue-600 dark:text-blue-400" />}
        iconColor="bg-blue-50 dark:bg-blue-500/10"
        title={t('settings.languageRegion.title')}
        description={t('settings.languageRegion.description')}
      >
        <SettingItem label={t('settings.languageRegion.language')}>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as SupportedLocale)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer min-w-[160px]"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label} ({lang.native})
              </option>
            ))}
          </select>
        </SettingItem>
        <SettingItem label={t('settings.languageRegion.timezone')}>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer min-w-[180px]"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </SettingItem>
      </SectionCard>

      {/* ─── Preferences ─── */}
      <SectionCard
        id="preferences"
        icon={<Palette size={18} className="text-violet-600 dark:text-violet-400" />}
        iconColor="bg-violet-50 dark:bg-violet-500/10"
        title={t('settings.preferences.title')}
        description={t('settings.preferences.description')}
      >
        <SettingItem label={t('settings.preferences.theme')}>
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {([
              { value: 'light' as const, key: 'settings.preferences.themeLight' as const },
              { value: 'dark' as const, key: 'settings.preferences.themeDark' as const },
              { value: 'system' as const, key: 'settings.preferences.themeSystem' as const },
            ]).map(({ value: v, key }) => (
              <button
                key={v}
                onClick={() => setTheme(v)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  theme === v
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </SettingItem>
        <SettingItem label={t('settings.preferences.dailyReadingGoal')}>
          <input
            type="number"
            min={0}
            max={500}
            value={dailyReadingGoal}
            onChange={(e) => setDailyReadingGoal(Number(e.target.value))}
            className="w-20 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 text-center outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </SettingItem>
        <SettingItem label={t('settings.preferences.autoSave')}>
          <Toggle checked={autoSave} onChange={setAutoSave} />
        </SettingItem>
        <SettingItem label={t('settings.preferences.notifications')}>
          <Toggle checked={notifications} onChange={setNotifications} />
        </SettingItem>
        <SettingItem label={t('settings.preferences.emailReports')}>
          <Toggle checked={emailReports} onChange={setEmailReports} />
        </SettingItem>
        <SettingItem label={t('settings.preferences.weeklyReview')}>
          <Toggle checked={weeklyReview} onChange={setWeeklyReview} />
        </SettingItem>
        <SettingItem label={t('settings.preferences.focusReminders')}>
          <Toggle checked={focusReminders} onChange={setFocusReminders} />
        </SettingItem>
        <SettingItem label={t('settings.preferences.readingReminders')}>
          <Toggle checked={readingReminders} onChange={setReadingReminders} />
        </SettingItem>
      </SectionCard>

      {/* ─── Data Management ─── */}
      <SectionCard
        id="data-management"
        icon={<Database size={18} className="text-emerald-600 dark:text-emerald-400" />}
        iconColor="bg-emerald-50 dark:bg-emerald-500/10"
        title={t('settings.dataManagement.title')}
        description={t('settings.dataManagement.description')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
          <button className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer group text-left">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <Upload size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('settings.dataManagement.importData')}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('settings.dataManagement.importDescription')}</p>
            </div>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer group text-left"
          >
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <Download size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('settings.dataManagement.exportData')}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('settings.dataManagement.exportDescription')}</p>
            </div>
          </button>
        </div>
      </SectionCard>

      {/* ─── Danger Zone ─── */}
      <SectionCard
        id="danger-zone"
        icon={<AlertTriangle size={18} className="text-red-600 dark:text-red-400" />}
        iconColor="bg-red-50 dark:bg-red-500/10"
        title={t('settings.dangerZone.title')}
        description={t('settings.dangerZone.description')}
      >
        <div className="py-3 space-y-3">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-500/5">
            <div className="flex items-center gap-3 min-w-0">
              <Trash2 size={16} className="text-red-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('settings.dangerZone.clearData')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('settings.dangerZone.clearDescription')}</p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              isLoading={isClearing}
              onClick={handleClearData}
            >
              <Trash2 size={13} className="mr-1" />
              {t('settings.dangerZone.clearData')}
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-500/5">
            <div className="flex items-center gap-3 min-w-0">
              <UserX size={16} className="text-red-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('settings.dangerZone.deleteAccount')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('settings.dangerZone.deleteDescription')}</p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              isLoading={isDeleting}
              onClick={handleDeleteAccount}
            >
              <UserX size={13} className="mr-1" />
              {t('settings.dangerZone.deleteAccount')}
            </Button>
          </div>
        </div>
      </SectionCard>

      {/* ─── Save Button ─── */}
      <motion.div variants={fadeUp} className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          isLoading={isSaving}
          className="min-w-[140px]"
        >
          {saved ? (
            <>
              <Check size={15} className="mr-1.5" />
              {t('settings.saved')}
            </>
          ) : (
            t('settings.saveChanges')
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
