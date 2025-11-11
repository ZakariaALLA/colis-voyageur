import { LanguageProvider } from '@/contexts/LanguageContext';
import Hero from '../Hero';

export default function HeroExample() {
  return (
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
}
