/**
 * @fileoverview Sign in component wrapper that uses the generic AuthForm component
 */
import { AuthForm } from './components/AuthForm';

/**
 * Sign in component that wraps AuthForm with signin mode
 */
export function SignIn() {
  return (
    <AuthForm mode="signin" />
  );
}

export default SignIn;