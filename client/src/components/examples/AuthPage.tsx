import { LanguageProvider } from '@/contexts/LanguageContext';
import AuthPage from '../AuthPage';

export default function AuthPageExample() {
  return (
    <LanguageProvider>
      <AuthPage />
    </LanguageProvider>
  );
}
