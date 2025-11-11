import { LanguageProvider } from '@/contexts/LanguageContext';
import SearchTrips from '../SearchTrips';

export default function SearchTripsExample() {
  return (
    <LanguageProvider>
      <SearchTrips />
    </LanguageProvider>
  );
}
