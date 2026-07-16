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
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakeError, setShakeError] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = t('auth.login.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('auth.login.errors.emailInvalid');
    }

    if (!password) {
      newErrors.password = t('auth.login.errors.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('auth.login.errors.passwordMin');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await login(email, password);
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
          {t('auth.login.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
          {t('auth.login.subtitle')}
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
          label={t('auth.login.emailLabel')}
          type="email"
          placeholder={t('auth.login.emailPlaceholder')}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => { const { email: _, ...r } = p; return r; }); }}
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />

        <PasswordInput
          label={t('auth.login.passwordLabel')}
          placeholder={t('auth.login.passwordPlaceholder')}
          value={password}
          onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => { const { password: _, ...r } = p; return r; }); }}
          error={errors.password}
          autoComplete="current-password"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">{t('auth.login.rememberMe')}</span>
          </label>
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
          >
            {t('auth.login.forgotPassword')}
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full group"
        >
          {t('auth.login.submit')}
          {!isLoading && <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />}
        </Button>
      </motion.form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t('auth.login.noAccount')}{' '}
        <Link
          to="/auth/register"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {t('auth.login.createAccount')}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
