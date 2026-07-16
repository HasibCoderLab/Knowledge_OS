import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Save, Globe, MapPin, MessageCircle, GitBranch } from 'lucide-react';
import { usersApi } from '../../services/api/index';
import { useAuthStore, type AuthUser } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? '');
  const [username, setUsername] = useState(user?.username ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      useToastStore.getState().addToast({ title: 'Name is required', type: 'error' });
      return;
    }
    setIsSaving(true);
    try {
      const updateData: Record<string, unknown> = {
        name: name.trim(),
        username: username.trim().toLowerCase() || undefined,
        bio: bio.trim() || null,
        location: location.trim() || null,
      };

      if (avatarFile) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(avatarFile);
        });
        updateData.avatar = base64;
      }

      const updatedUser = await usersApi.updateProfile(updateData);
      setAuth(updatedUser as AuthUser, null);
      useToastStore.getState().addToast({ title: 'Profile updated', type: 'success' });
      navigate('/profile');
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to update profile', description: 'Please try again', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Back + Header */}
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer mb-4"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update your personal information and how others see you.
          </p>
        </div>
      </motion.div>

      {/* Avatar Upload */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-6">
            <div className="relative group shrink-0">
              <Avatar
                src={avatarPreview ?? undefined}
                name={name}
                size="xl"
                className="ring-4 ring-white dark:ring-slate-800 shadow-xl"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                aria-label="Change avatar"
              >
                <Camera size={20} className="text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white text-sm">{name || 'Your Name'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                JPG, PNG or GIF. 1MB max.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Upload new photo
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              helpText="Letters, numbers, and underscores only"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Bio</label>
            <textarea
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
              rows={3}
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-[38px] text-slate-400 pointer-events-none" />
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Dhaka, Bangladesh"
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Globe size={16} className="absolute left-3.5 top-[38px] text-slate-400 pointer-events-none" />
              <Input
                label="Website"
                value=""
                onChange={() => {}}
                placeholder="yourwebsite.com"
                className="pl-9"
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <MessageCircle size={16} className="absolute left-3.5 top-[38px] text-slate-400 pointer-events-none" />
              <Input
                label="Twitter"
                value=""
                onChange={() => {}}
                placeholder="@username"
                className="pl-9"
                disabled
              />
            </div>
            <div className="relative">
              <GitBranch size={16} className="absolute left-3.5 top-[38px] text-slate-400 pointer-events-none" />
              <Input
                label="GitHub"
                value=""
                onChange={() => {}}
                placeholder="github.com/username"
                className="pl-9"
                disabled
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex items-center justify-end gap-3 pb-12">
        <Button variant="outline" onClick={() => navigate('/profile')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
          <Save size={15} className="mr-1.5" />
          Save Changes
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EditProfile;
