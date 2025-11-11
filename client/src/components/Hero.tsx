import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';
import heroImage from '@assets/generated_images/Airport_traveler_hero_image_5d217a8a.png';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-primary/20 text-primary-foreground backdrop-blur-sm border-primary/30" data-testid="badge-trust">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t.hero.trustBadge}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
            {t.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base font-semibold bg-primary/90 backdrop-blur-sm hover:bg-primary"
              data-testid="button-become-transporter"
              onClick={() => console.log('Become transporter clicked')}
            >
              {t.hero.becomeTransporter}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-send-package"
              onClick={() => console.log('Send package clicked')}
            >
              {t.hero.sendPackage}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
