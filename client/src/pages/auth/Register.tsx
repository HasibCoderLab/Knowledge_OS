import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthLayout from '../../features/auth/components/AuthLayout';
import RegisterForm from '../../features/auth/components/RegisterForm';

export const Register: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout mode="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
