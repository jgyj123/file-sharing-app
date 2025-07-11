import { AuthPage } from './components/auth/AuthPage';
import type { LoginCredentials, SignUpCredentials, ConfirmSignUpData } from './types/auth.types';

function App() {
  // Mock authentication functions for now
  const handleLogin = async (data: LoginCredentials) => {
    console.log('Login attempt:', data);
    // TODO: Integrate with Cognito
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  const handleSignUp = async (data: SignUpCredentials) => {
    console.log('Sign up attempt:', data);
    // TODO: Integrate with Cognito
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  const handleConfirmSignUp = async (data: ConfirmSignUpData) => {
    console.log('Confirm sign up attempt:', data);
    // TODO: Integrate with Cognito
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <div className="App">
      <AuthPage
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onConfirmSignUp={handleConfirmSignUp}
        loading={false}
        error={undefined}
      />
    </div>
  );
}

export default App;