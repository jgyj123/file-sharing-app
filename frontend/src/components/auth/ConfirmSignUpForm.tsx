import React, { useState } from 'react';
import { Mail, Check, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { ConfirmSignUpData } from '@/types/auth.types';

interface ConfirmSignUpFormProps {
  onSubmit: (data: ConfirmSignUpData) => Promise<void>;
  loading?: boolean;
  error?: string;
  email: string;
  onBackToLogin: () => void;
}

export const ConfirmSignUpForm: React.FC<ConfirmSignUpFormProps> = ({ 
  onSubmit, 
  loading = false, 
  error,
  email,
  onBackToLogin 
}) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [codeError, setCodeError] = useState<string>('');

  const validateForm = (): boolean => {
    if (!confirmationCode) {
      setCodeError('Confirmation code is required');
      return false;
    }
    if (confirmationCode.length !== 6) {
      setCodeError('Confirmation code must be 6 digits');
      return false;
    }
    if (!/^\d{6}$/.test(confirmationCode)) {
      setCodeError('Confirmation code must contain only numbers');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit({ email, confirmationCode });
    } catch (err) {
      // Error handling is done in parent component
    }
  };

  const handleInputChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setConfirmationCode(numericValue);
    
    // Clear error when user starts typing
    if (codeError) {
      setCodeError('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Confirm your email
        </CardTitle>
        <CardDescription className="text-center">
          We've sent a confirmation code to
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <Mail className="h-4 w-4" />
            <p className="text-sm">
              Check your email for the 6-digit confirmation code
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirmationCode">Confirmation Code</Label>
            <Input
              id="confirmationCode"
              type="text"
              placeholder="Enter 6-digit code"
              className="text-center text-lg tracking-wider"
              value={confirmationCode}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={loading}
              maxLength={6}
            />
            {codeError && (
              <p className="text-sm text-destructive">{codeError}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !confirmationCode}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Confirming...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Confirm email
              </>
            )}
          </Button>
        </form>

        <div className="space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code? Check your spam folder or{' '}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              disabled={loading}
              onClick={() => {
                // TODO: Implement resend functionality
                console.log('Resend code');
              }}
            >
              resend code
            </button>
          </p>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
