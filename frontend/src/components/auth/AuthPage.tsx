import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ConfirmSignUpForm } from './ConfirmSignUpForm';
import { FileText, Shield, Users, Zap } from 'lucide-react';

import type { LoginCredentials, SignUpCredentials, ConfirmSignUpData } from '@/types/auth.types';

type AuthMode = 'login' | 'signup' | 'confirm';

interface AuthPageProps {
  onLogin: (data: LoginCredentials) => Promise<void>;
  onSignUp: (data: SignUpCredentials) => Promise<void>;
  onConfirmSignUp: (data: ConfirmSignUpData) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLogin,
  onSignUp,
  onConfirmSignUp,
  loading = false,
  error
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [pendingEmail, setPendingEmail] = useState<string>('');

  const handleSignUp = async (data: SignUpCredentials) => {
    await onSignUp(data);
    setPendingEmail(data.email);
    setMode('confirm');
  };

  const handleConfirmSignUp = async (data: ConfirmSignUpData) => {
    await onConfirmSignUp(data);
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold">
                  SecureShare
                </h1>
              </div>
              <p className="text-xl text-slate-300">
                Share files securely with end-to-end encryption and enterprise-grade security.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-semibold">Enterprise Security</h3>
                  <p className="text-sm text-slate-300">
                    Bank-level encryption and secure authentication
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-semibold">Any File Type</h3>
                  <p className="text-sm text-slate-300">
                    Share documents, images, videos, and more
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-semibold">Team Collaboration</h3>
                  <p className="text-sm text-slate-300">
                    Collaborate with your team in real-time
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Zap className="h-6 w-6 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-semibold">Lightning Fast</h3>
                  <p className="text-sm text-slate-300">
                    Upload and download files at blazing speeds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {mode === 'login' && (
              <LoginForm
                onSubmit={onLogin}
                loading={loading}
                error={error}
                onSwitchToSignUp={() => setMode('signup')}
              />
            )}
            
            {mode === 'signup' && (
              <SignUpForm
                onSubmit={handleSignUp}
                loading={loading}
                error={error}
                onSwitchToLogin={() => setMode('login')}
              />
            )}
            
            {mode === 'confirm' && (
              <ConfirmSignUpForm
                onSubmit={handleConfirmSignUp}
                loading={loading}
                error={error}
                email={pendingEmail}
                onBackToLogin={() => setMode('login')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
