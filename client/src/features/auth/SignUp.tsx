/**
 * @fileoverview Sign up component wrapper that uses the generic AuthForm component
 */
import { AuthForm } from './components/AuthForm';

/**
 * Sign up component that wraps AuthForm with register mode
 */
export function SignUp() {
  return (
    <AuthForm mode="register" />
  );
}

export default SignUp;