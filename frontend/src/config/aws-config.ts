// AWS Configuration for Cognito
export const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'ap-southeast-1',
  
  // Cognito Configuration
  cognito: {
    userPoolId: import.meta.env.VITE_USER_POOL_ID || '',
    userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || '',
  },
};

// Validation helper
export const validateConfig = () => {
  const requiredEnvVars = [
    'VITE_USER_POOL_ID',
    'VITE_USER_POOL_CLIENT_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.log('Please check your .env.local file');
    return false;
  }
  
  console.log('✅ AWS Config validated successfully');
  return true;
};
