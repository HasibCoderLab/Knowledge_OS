import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  User, Mail, MapPin, Link, Settings, Camera, Save, X, ArrowLeft, GitBranch, MessageSquare,
} from 'lucide-react';
import { useAuthStore, type AuthUser } from '../../store/authStore';
import { settingsApi, type UserProfile } from '../../services/api/index';
import { useToastStore } from '../../store/toastStore';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useLanguage } from '../../i18n/useLanguage';

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

interface SettingsProfileFormData {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const initialFormData: SettingsProfileFormData = {
  name: '',
  username: '',
  bio: '',
  location: '',
  website: '',
  github: '',
  linkedin: '',
  twitter: '',
};

export const SettingsProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setAuth } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const [formData, setFormData] = useState<SettingsProfileFormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<SettingsProfileFormData>>({});

  const { data: profileData } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await settingsApi.get();
      return response.data as UserProfile;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (profileData) {
      setFormData(prev => ({
        ...prev,
        name: profileData.name ?? '',
        username: profileData.username ?? '',
        bio: profileData.bio ?? '',
        location: profileData.location ?? '',
      }));
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name ?? '',
        username: user.username ?? '',
        bio: user.bio ?? '',
        location: user.location ?? '',
      }));
    }
  }, [profileData, user]);

  const validate = (): boolean => {
    const newErrors: Partial<SettingsProfileFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must be a valid URL (http:// or https://)';
    }

    if (formData.github && !/^[a-zA-Z0-9-]+$/.test(formData.github)) {
      newErrors.github = 'GitHub username can only contain letters, numbers, and hyphens';
    }

    if (formData.linkedin && !/^[a-zA-Z0-9-]+$/.test(formData.linkedin)) {
      newErrors.linkedin = 'LinkedIn username can only contain letters, numbers, and hyphens';
    }

    if (formData.twitter && !/^[a-zA-Z0-9_]+$/.test(formData.twitter)) {
      newErrors.twitter = 'Twitter/X handle can only contain letters, numbers, and underscores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof SettingsProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    try {
      const updateData = {
        name: formData.name,
        username: formData.username.toLowerCase(),
        bio: formData.bio,
        location: formData.location,
      };

      const response = await settingsApi.update(updateData);
      const updatedUser = response.data as UserProfile;

      const authUpdate: Partial<AuthUser> = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        theme: updatedUser.theme,
        language: updatedUser.language,
        createdAt: updatedUser.createdAt,
      };
      if (updatedUser.username !== undefined && updatedUser.username !== null) authUpdate.username = updatedUser.username;
      if (updatedUser.avatar !== undefined && updatedUser.avatar !== null) authUpdate.avatar = updatedUser.avatar;
      if (updatedUser.bio !== undefined && updatedUser.bio !== null) authUpdate.bio = updatedUser.bio;
      if (updatedUser.location !== undefined && updatedUser.location !== null) authUpdate.location = updatedUser.location;

      setAuth(authUpdate as AuthUser, null);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      addToast({ title: 'Profile updated', type: 'success' });
      navigate('/profile');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? ((err as { response: { data: { message: string } } }).response?.data?.message ?? 'Failed to update profile')
          : err instanceof Error
            ? err.message
            : 'Failed to update profile. Please try again.';
      addToast({ title: 'Update failed', description: message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl mx-auto space-y-8 pb-12">

      {/* Header */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to Profile
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('settings.profile.title') || 'Edit Profile'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('settings.profile.description') || 'Manage your personal information and preferences'}
          </p>
        </div>
      </motion.div>

      {/* Profile Photo Section */}
      <motion.div variants={fadeIn}>
        <Card className="p-5 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <User size={16} className="text-indigo-500" />
            Profile Photo
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative group shrink-0">
              <Avatar src={user?.avatar ?? undefined} name={user?.name} size="xl" className="!w-20 !h-20 ring-4 ring-white dark:ring-slate-800 shadow-xl" />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
                aria-label="Change avatar"
              >
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your avatar is synced with your Gravatar account. Update it there to change your profile photo.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                We use the email associated with your account to fetch your Gravatar.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Personal Information */}
      <motion.div variants={fadeIn}>
        <Card className="p-5 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <User size={16} className="text-indigo-500" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <Input
              label={t('settings.profile.name') || 'Full Name'}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              error={errors.name}
              autoFocus
            />
            <Input
              label={t('settings.profile.username') || 'Username'}
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value.toLowerCase())}
              placeholder="Enter username"
              error={errors.username}
              helpText="Letters, numbers, and underscores only"
            />
            <Input
              label={t('settings.account.email') || 'Email'}
              type="email"
              value={user?.email ?? ''}
              disabled
              helpText="Email cannot be changed from here. Contact support if needed."
            />
          </div>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div variants={fadeIn}>
        <Card className="p-5 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Link size={16} className="text-emerald-500" />
            About
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                {t('settings.profile.bio') || 'Bio'}
              </label>
              <textarea
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                rows={4}
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </div>
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Enter your location"
            />
            <Input
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              error={errors.website}
            />
          </div>
        </Card>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={fadeIn}>
        <Card className="p-5 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <GitBranch size={16} className="text-slate-500" />
            Social Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GitHub"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="yourusername"
              helpText="github.com/yourusername"
              error={errors.github}
            />
            <Input
              label="LinkedIn"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="yourusername"
              helpText="linkedin.com/in/yourusername"
              error={errors.linkedin}
            />
            <Input
              label="Twitter / X"
              value={formData.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
              placeholder="yourhandle"
              helpText="twitter.com/yourhandle"
              error={errors.twitter}
            />
          </div>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={fadeIn}>
        <Card className="p-5 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings size={16} className="text-violet-500" />
            Preferences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Language"
              value={user?.language ?? 'en'}
              onChange={(e) => handleChange('language' as keyof SettingsProfileFormData, e.target.value)}
              placeholder="en"
            />
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
        <Button variant="outline" size="md" onClick={handleCancel}>
          <X size={14} className="mr-1" />
          Cancel
        </Button>
        <Button variant="primary" size="md" onClick={handleSave} isLoading={isSaving}>
          <Save size={14} className="mr-1" />
          Save Changes
        </Button>
      </motion.div>

    </motion.div>
  );
};

export default SettingsProfilePage;