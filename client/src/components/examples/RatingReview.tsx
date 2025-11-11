import { LanguageProvider } from '@/contexts/LanguageContext';
import RatingReview from '../RatingReview';

export default function RatingReviewExample() {
  return (
    <LanguageProvider>
      <RatingReview />
    </LanguageProvider>
  );
}
