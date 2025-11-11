import { LanguageProvider } from '@/contexts/LanguageContext';
import PackageRequestForm from '../PackageRequestForm';

export default function PackageRequestFormExample() {
  return (
    <LanguageProvider>
      <PackageRequestForm />
    </LanguageProvider>
  );
}
