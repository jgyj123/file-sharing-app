import { useState, useEffect } from 'react';
import { AuthPage } from './components/auth/AuthPage';
import { authService } from './services/auth.service';
import { validateConfig } from './config/aws-config';
import type { LoginCredentials, SignUpCredentials, ConfirmSignUpData } from './types/auth.types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Validate AWS configuration on app start
  useEffect(() => {
    validateConfig();
  }, []);

  const handleLogin = async (data: LoginCredentials) => {
    setLoading(true);
    setError(undefined);
    
    try {
      const user = await authService.signIn(data);
      console.log('Login successful:', user);
      // TODO: Redirect to dashboard or set authenticated state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpCredentials) => {
    setLoading(true);
    setError(undefined);
    
    try {
      await authService.signUp(data);
      console.log('Sign up successful - check email for confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (data: ConfirmSignUpData) => {
    setLoading(true);
    setError(undefined);
    
    try {
      await authService.confirmSignUp(data);
      console.log('Email confirmation successful');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <AuthPage
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onConfirmSignUp={handleConfirmSignUp}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;