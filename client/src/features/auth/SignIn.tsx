/**
 * @fileoverview Sign in component wrapper that uses the generic AuthForm component
 */
import { AuthForm } from './components/AuthForm';

interface SignInProps {
  onNavigateToLanding?: () => void;
}

/**
 * Sign in component that wraps AuthForm with signin mode
 * @param onNavigateToLanding - Optional callback to navigate back to landing page
 */
export function SignIn({ onNavigateToLanding }: SignInProps) {
  return (
    <AuthForm 
      mode="signin" 
      onNavigateToLanding={onNavigateToLanding}
    />
  );
}

export default SignIn;