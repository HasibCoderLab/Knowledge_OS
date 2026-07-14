import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthLayout from '../../features/auth/components/AuthLayout';
import LoginForm from '../../features/auth/components/LoginForm';

export const Login: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
