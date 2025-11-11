import { LanguageProvider } from '@/contexts/LanguageContext';
import CreateTripForm from '../CreateTripForm';

export default function CreateTripFormExample() {
  return (
    <LanguageProvider>
      <CreateTripForm />
    </LanguageProvider>
  );
}
