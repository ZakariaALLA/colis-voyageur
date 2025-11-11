import { LanguageProvider } from '@/contexts/LanguageContext';
import TripCard from '../TripCard';

export default function TripCardExample() {
  return (
    <LanguageProvider>
      <div className="p-8 max-w-sm">
        <TripCard
          id="1"
          from="Paris"
          to="Lyon"
          date="15 Nov 2025"
          availableWeight={10}
          price={45}
          transporter={{
            name: 'Jean Dupont',
            rating: 4.8,
            reviewCount: 24,
          }}
        />
      </div>
    </LanguageProvider>
  );
}
