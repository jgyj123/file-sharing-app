import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import { awsConfig } from '../config/aws-config';
import type { 
  LoginCredentials, 
  SignUpCredentials, 
  ConfirmSignUpData,
  User 
} from '../types/auth.types';

export class AuthService {
  private client: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: awsConfig.region,
    });
    this.userPoolId = awsConfig.cognito.userPoolId;
    this.clientId = awsConfig.cognito.userPoolClientId;
  }

  // Sign up a new user
  async signUp(credentials: SignUpCredentials): Promise<void> {
    try {
      const command = new SignUpCommand({
        ClientId: this.clientId,
        Username: credentials.email,
        Password: credentials.password,
        UserAttributes: [
          {
            Name: 'email',
            Value: credentials.email,
          },
        ],
      });

      const response = await this.client.send(command);
      console.log('Sign up successful:', response);
    } catch (error) {
      console.error('Sign up error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Confirm sign up with verification code
  async confirmSignUp(data: ConfirmSignUpData): Promise<void> {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: data.email,
        ConfirmationCode: data.confirmationCode,
      });

      await this.client.send(command);
      console.log('Email confirmation successful');
    } catch (error) {
      console.error('Confirm sign up error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign in user
  async signIn(credentials: LoginCredentials): Promise<User> {
    try {
      const command = new InitiateAuthCommand({
        ClientId: this.clientId,
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: credentials.email,
          PASSWORD: credentials.password,
        },
      });

      const response = await this.client.send(command);
      
      if (!response.AuthenticationResult) {
        throw new Error('Authentication failed');
      }

      const tokens = response.AuthenticationResult;
      
      // Parse the ID token to get user info
      const userInfo = this.parseJWTToken(tokens.IdToken!);
      
      const user: User = {
        email: userInfo.email,
        userId: userInfo.sub,
        isEmailVerified: userInfo.email_verified === 'true',
      };

      // Store tokens in localStorage (you might want to use a more secure method in production)
      localStorage.setItem('accessToken', tokens.AccessToken!);
      localStorage.setItem('refreshToken', tokens.RefreshToken!);
      localStorage.setItem('idToken', tokens.IdToken!);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      // Clear stored tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('user');
      
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Sign out failed');
    }
  }

  // Get current user from stored tokens
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      
      if (!userStr || !accessToken) {
        return null;
      }

      // TODO: Add token expiration check
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Parse JWT token to extract user information
  private parseJWTToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      throw new Error('Invalid token');
    }
  }

  // Handle authentication errors
  private handleAuthError(error: any): Error {
    if (error.name === 'UserNotConfirmedException') {
      return new Error('Please confirm your email address before signing in.');
    }
    if (error.name === 'NotAuthorizedException') {
      return new Error('Invalid email or password.');
    }
    if (error.name === 'UserNotFoundException') {
      return new Error('User not found.');
    }
    if (error.name === 'CodeMismatchException') {
      return new Error('Invalid confirmation code.');
    }
    if (error.name === 'ExpiredCodeException') {
      return new Error('Confirmation code has expired.');
    }
    if (error.name === 'UsernameExistsException') {
      return new Error('An account with this email already exists.');
    }
    if (error.name === 'InvalidParameterException') {
      return new Error('Invalid parameters. Please check your input.');
    }
    if (error.name === 'InvalidPasswordException') {
      return new Error('Password does not meet requirements.');
    }
    
    return new Error(error.message || 'Authentication error occurred.');
  }
}

// Export singleton instance
export const authService = new AuthService();
