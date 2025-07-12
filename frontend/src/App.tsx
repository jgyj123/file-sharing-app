import { useState, useEffect } from 'react';
import { AuthPage } from './components/auth/AuthPage';
import { HomePage } from './components/pages/HomePage';
import { authService } from './services/auth.service';
import { validateConfig } from './config/aws-config';
import type { LoginCredentials, SignUpCredentials, ConfirmSignUpData, User } from './types/auth.types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        validateConfig();
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (data: LoginCredentials) => {
    setLoading(true);
    setError(undefined);
    
    try {
      const loggedInUser = await authService.signIn(data);
      console.log('Login successful:', loggedInUser);
      setUser(loggedInUser);
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

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show HomePage if user is authenticated
  if (user) {
    return <HomePage />;
  }

  // Show AuthPage if user is not authenticated
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