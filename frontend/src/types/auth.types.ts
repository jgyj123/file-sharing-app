// Authentication-related TypeScript types

export interface User {
  email: string;
  userId: string;
  isEmailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmSignUpData {
  email: string;
  confirmationCode: string;
}

export interface AuthContextType {
  // State
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  confirmSignUp: (data: ConfirmSignUpData) => Promise<void>;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}
