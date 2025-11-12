import { LanguageProvider } from '@/contexts/LanguageContext';
import MyTrips from '@/pages/MyTrips';

export default function MyTripsExample() {
  return (
    <LanguageProvider>
      <MyTrips />
    </LanguageProvider>
  );
}
