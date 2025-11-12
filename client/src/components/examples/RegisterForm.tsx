import { LanguageProvider } from '@/contexts/LanguageContext';
import RegisterForm from '../RegisterForm';

export default function RegisterFormExample() {
  return (
    <LanguageProvider>
      <RegisterForm />
    </LanguageProvider>
  );
}
