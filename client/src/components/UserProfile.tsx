import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Star, Calendar, TrendingUp, Car } from 'lucide-react';
import maleAvatar from '@assets/generated_images/Male_user_avatar_08fceb1b.png';

export default function UserProfile() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');

  const user = {
    name: 'Jean Dupont',
    avatar: maleAvatar,
    rating: 4.8,
    reviewCount: 24,
    completedTrips: 42,
    successRate: 98,
    memberSince: 'Janvier 2024',
    verified: true,
    carLicense: 'AB-123-CD',
    vehicleType: 'Berline',
  };

  const reviews = [
    {
      id: 1,
      author: 'Marie L.',
      rating: 5,
      date: '10 Nov 2025',
      comment: 'Excellente expérience! Très professionnel et ponctuel.',
    },
    {
      id: 2,
      author: 'Pierre M.',
      rating: 4,
      date: '8 Nov 2025',
      comment: 'Bon service, colis bien livré.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/10" />
        <CardContent className="relative px-6 pb-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background -mt-12 md:-mt-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="mt-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2" data-testid="text-user-name">
                  {user.name}
                  {user.verified && (
                    <CheckCircle className="h-6 w-6 text-primary" data-testid="icon-verified" />
                  )}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold" data-testid="text-rating">{user.rating}</span>
                    <span className="text-muted-foreground text-sm">({user.reviewCount} avis)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <div className="text-2xl font-bold" data-testid="text-completed-trips">{user.completedTrips}</div>
                <div className="text-sm text-muted-foreground">{t.profile.completedTrips}</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold" data-testid="text-success-rate">
                  {user.successRate}%
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">{t.profile.successRate}</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <div className="flex items-center justify-center gap-1 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-member-since">{user.memberSince}</span>
                </div>
                <div className="text-sm text-muted-foreground">{t.profile.memberSince}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about" data-testid="tab-about">{t.profile.about}</TabsTrigger>
          <TabsTrigger value="reviews" data-testid="tab-reviews">{t.profile.reviews}</TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">{t.profile.history}</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  {t.profile.carInfo}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plaque:</span>
                    <Badge variant="outline" data-testid="text-car-license">{user.carLicense}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span data-testid="text-vehicle-type">{user.vehicleType}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold" data-testid={`text-reviewer-${review.id}`}>{review.author}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-review-date-${review.id}`}>{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm" data-testid={`text-review-comment-${review.id}`}>{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Historique des trajets à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
