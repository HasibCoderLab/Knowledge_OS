import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useLanguage } from '../../../i18n/useLanguage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import PasswordInput from './PasswordInput';
import SocialLogin from './SocialLogin';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakeError, setShakeError] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('auth.register.errors.nameRequired');
    } else if (name.trim().length < 2) {
      newErrors.name = t('auth.register.errors.nameMin');
    }

    if (!email.trim()) {
      newErrors.email = t('auth.register.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('auth.register.errors.emailInvalid');
    }

    if (!password) {
      newErrors.password = t('auth.register.errors.passwordRequired');
    } else if (password.length < 8) {
      newErrors.password = t('auth.register.errors.passwordMin');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = t('auth.register.errors.passwordComplexity');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.confirmRequired');
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.confirmMismatch');
    }

    if (!acceptTerms) {
      newErrors.terms = t('auth.register.errors.termsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await register(name, email, password, username || undefined);
      navigate('/dashboard');
    } catch {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('auth.register.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
          {t('auth.register.subtitle')}
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin disabled={isLoading} />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 dark:bg-slate-950 px-3 text-slate-400 dark:text-slate-500 font-medium tracking-wider">
            {t('common.or')}
          </span>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400 font-medium"
          role="alert"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        animate={shakeError ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-4"
        noValidate
      >
        <Input
          label={t('auth.register.nameLabel')}
          type="text"
          placeholder={t('auth.register.namePlaceholder')}
          value={name}
          onChange={(e) => { setName(e.target.value); clearFieldError('name'); }}
          error={errors.name}
          autoComplete="name"
          disabled={isLoading}
        />

        <Input
          label={t('auth.register.usernameLabel')}
          type="text"
          placeholder={t('auth.register.usernamePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          disabled={isLoading}
        />

        <Input
          label={t('auth.register.emailLabel')}
          type="email"
          placeholder={t('auth.register.emailPlaceholder')}
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />

        <PasswordInput
          label={t('auth.register.passwordLabel')}
          placeholder={t('auth.register.passwordPlaceholder')}
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
          error={errors.password}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <PasswordInput
          label={t('auth.register.confirmPasswordLabel')}
          placeholder={t('auth.register.confirmPasswordPlaceholder')}
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={isLoading}
        />

        {/* Terms */}
        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => { setAcceptTerms(e.target.checked); clearFieldError('terms'); }}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
              {t('auth.register.terms')}{' '}
              <button type="button" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                {t('auth.register.termsOfService')}
              </button>{' '}
              {t('auth.register.and')}{' '}
              <button type="button" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                {t('auth.register.privacyPolicy')}
              </button>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-red-500 font-medium ml-6">{errors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full group"
        >
          {t('auth.register.submit')}
          {!isLoading && <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />}
        </Button>
      </motion.form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t('auth.register.hasAccount')}{' '}
        <Link
          to="/auth/login"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {t('auth.register.signIn')}
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
