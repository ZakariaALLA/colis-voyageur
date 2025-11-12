import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Calendar, Package, MapPin, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Link } from 'wouter';
import femaleAvatar from '@assets/generated_images/Female_user_avatar_249300ec.png';
import maleAvatar from '@assets/generated_images/Male_user_avatar_08fceb1b.png';

export default function MyTrips() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');

  const activeTrips = [
    {
      id: '1',
      from: 'Paris',
      to: 'Lyon',
      date: '15 Nov 2025',
      time: '14:00',
      status: 'confirmed',
      availableWeight: 10,
      bookedWeight: 5,
      price: 45,
      type: 'transporter',
      client: {
        name: 'Marie Dubois',
        avatar: femaleAvatar,
      },
    },
    {
      id: '2',
      from: 'Marseille',
      to: 'Paris',
      date: '18 Nov 2025',
      time: '09:30',
      status: 'pending',
      weight: 8,
      price: 60,
      type: 'sender',
      transporter: {
        name: 'Pierre Martin',
        avatar: maleAvatar,
      },
    },
  ];

  const pastTrips = [
    {
      id: '3',
      from: 'Lyon',
      to: 'Toulouse',
      date: '5 Nov 2025',
      status: 'completed',
      weight: 12,
      price: 55,
      type: 'transporter',
      rating: 5,
    },
    {
      id: '4',
      from: 'Paris',
      to: 'Bordeaux',
      date: '1 Nov 2025',
      status: 'completed',
      weight: 6,
      price: 50,
      type: 'sender',
      rating: 4,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400" data-testid={`badge-status-confirmed`}><CheckCircle className="h-3 w-3 mr-1" />Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" data-testid={`badge-status-pending`}><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" data-testid={`badge-status-completed`}><CheckCircle className="h-3 w-3 mr-1" />Complété</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" data-testid={`badge-status-cancelled`}><XCircle className="h-3 w-3 mr-1" />Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-my-trips-title">
          Mes trajets
        </h1>
        <Link href="/create-trip">
          <Button data-testid="button-create-new-trip">
            Publier un nouveau trajet
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="active" data-testid="tab-active-trips">
            Trajets actifs
            <Badge className="ml-2" variant="secondary">{activeTrips.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="past" data-testid="tab-past-trips">
            Historique
            <Badge className="ml-2" variant="secondary">{pastTrips.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeTrips.length > 0 ? (
            activeTrips.map((trip) => (
              <Card key={trip.id} data-testid={`card-trip-${trip.id}`} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xl font-semibold mb-2">
                        <span data-testid={`text-from-${trip.id}`}>{trip.from}</span>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        <span data-testid={`text-to-${trip.id}`}>{trip.to}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span data-testid={`text-date-${trip.id}`}>{trip.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span data-testid={`text-time-${trip.id}`}>{trip.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(trip.status)}
                      <Badge className="text-lg font-bold px-3 py-1" data-testid={`text-price-${trip.id}`}>
                        {trip.price}€
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {trip.type === 'transporter' ? (
                        <span data-testid={`text-capacity-${trip.id}`}>
                          Capacité: {trip.bookedWeight}/{trip.availableWeight} kg
                        </span>
                      ) : (
                        <span data-testid={`text-weight-${trip.id}`}>
                          Poids: {trip.weight} kg
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" data-testid={`badge-type-${trip.id}`}>
                      {trip.type === 'transporter' ? 'Transporteur' : 'Expéditeur'}
                    </Badge>
                  </div>

                  {trip.type === 'transporter' && trip.client && (
                    <div className="flex items-center gap-3 pt-3 border-t">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={trip.client.avatar} />
                        <AvatarFallback>{trip.client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium" data-testid={`text-client-${trip.id}`}>{trip.client.name}</p>
                      </div>
                    </div>
                  )}

                  {trip.type === 'sender' && trip.transporter && (
                    <div className="flex items-center gap-3 pt-3 border-t">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={trip.transporter.avatar} />
                        <AvatarFallback>{trip.transporter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">Transporteur</p>
                        <p className="font-medium" data-testid={`text-transporter-${trip.id}`}>{trip.transporter.name}</p>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button className="flex-1" variant="outline" data-testid={`button-details-${trip.id}`}>
                    Voir détails
                  </Button>
                  {trip.status === 'pending' && (
                    <Button className="flex-1" data-testid={`button-confirm-${trip.id}`}>
                      Confirmer
                    </Button>
                  )}
                  {trip.status === 'confirmed' && (
                    <Button className="flex-1" variant="outline" data-testid={`button-contact-${trip.id}`}>
                      Contacter
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucun trajet actif</h3>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas de trajet en cours pour le moment
                </p>
                <Link href="/create-trip">
                  <Button>Publier un trajet</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastTrips.length > 0 ? (
            pastTrips.map((trip) => (
              <Card key={trip.id} data-testid={`card-past-trip-${trip.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xl font-semibold mb-2">
                        <span>{trip.from}</span>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        <span>{trip.to}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{trip.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(trip.status)}
                      <Badge variant="outline">{trip.price}€</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="flex gap-2">
                  <Button className="flex-1" variant="outline" data-testid={`button-details-past-${trip.id}`}>
                    Voir détails
                  </Button>
                  {trip.status === 'completed' && !trip.rating && (
                    <Link href="/rate" className="flex-1">
                      <Button className="w-full" data-testid={`button-rate-${trip.id}`}>
                        Évaluer
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
                <p className="text-muted-foreground">
                  Vos trajets complétés apparaîtront ici
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
