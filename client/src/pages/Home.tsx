import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Shield, CreditCard, Star, TrendingUp } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Paiements protégés et vérification des utilisateurs',
    },
    {
      icon: CreditCard,
      title: 'Économique',
      description: 'Prix compétitifs calculés automatiquement',
    },
    {
      icon: Star,
      title: 'Fiable',
      description: 'Système de notation et avis vérifiés',
    },
    {
      icon: TrendingUp,
      title: 'Populaire',
      description: 'Plus de 10,000 livraisons réussies',
    },
  ];

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi choisir ColisVoyageur?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La plateforme de confiance pour connecter voyageurs et expéditeurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Prêt à commencer?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" data-testid="button-search-trips">
                Rechercher un trajet
              </Button>
            </Link>
            <Link href="/create-trip">
              <Button size="lg" variant="outline" data-testid="button-publish-trip">
                Publier un trajet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
