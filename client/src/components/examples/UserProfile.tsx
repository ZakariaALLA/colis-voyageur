import { LanguageProvider } from '@/contexts/LanguageContext';
import UserProfile from '../UserProfile';

export default function UserProfileExample() {
  return (
    <LanguageProvider>
      <UserProfile />
    </LanguageProvider>
  );
}
