import { useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ArrowRight,
  Calendar,
  Clock,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  Star,
  CheckCircle,
  MessageCircle,
  CreditCard,
} from 'lucide-react';
import maleAvatar from '@assets/generated_images/Male_user_avatar_08fceb1b.png';
import femaleAvatar from '@assets/generated_images/Female_user_avatar_249300ec.png';

export default function TripDetail() {
  const [, params] = useRoute('/trip/:id');
  const [, setLocation] = useLocation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  // TODO: Replace with actual API call
  const trip = {
    id: params?.id || '1',
    from: 'Paris',
    to: 'Lyon',
    date: '15 Nov 2025',
    time: '14:00',
    status: 'available',
    availableWeight: 10,
    price: 45,
    description: 'Je fais ce trajet régulièrement pour le travail. Je peux transporter des colis de taille moyenne en toute sécurité.',
    transporter: {
      id: '1',
      name: 'Pierre Martin',
      avatar: maleAvatar,
      rating: 4.8,
      reviewCount: 24,
      verified: true,
      memberSince: 'Mars 2024',
      vehicleType: 'Berline',
      vehicleModel: 'Renault Mégane',
      carLicense: 'AB-123-CD',
    },
  };

  const handleConfirmBooking = () => {
    console.log('Booking confirmed');
    setConfirmDialogOpen(false);
    // Navigate to payment
    setLocation('/payment');
  };

  const handleContact = () => {
    setLocation(`/messages/${trip.transporter.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <Button variant="ghost" onClick={() => window.history.back()} className="mb-6" data-testid="button-back">
        ← Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-3">
                    <span data-testid="text-from">{trip.from}</span>
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    <span data-testid="text-to">{trip.to}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span data-testid="text-date">{trip.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span data-testid="text-time">{trip.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary" data-testid="text-price">{trip.price}€</div>
                  <p className="text-sm text-muted-foreground">par kg</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Capacité disponible
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium" data-testid="text-capacity">
                    {trip.availableWeight} kg disponible
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Description du trajet</h3>
                <p className="text-muted-foreground" data-testid="text-description">
                  {trip.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Itinéraire détaillé
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500 mt-1.5"></div>
                    <div>
                      <p className="font-medium">Départ</p>
                      <p className="text-sm text-muted-foreground">{trip.from}</p>
                    </div>
                  </div>
                  <div className="ml-1.5 h-12 w-0.5 bg-border"></div>
                  <div className="flex items-start gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500 mt-1.5"></div>
                    <div>
                      <p className="font-medium">Arrivée</p>
                      <p className="text-sm text-muted-foreground">{trip.to}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informations du véhicule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium" data-testid="text-vehicle-type">{trip.transporter.vehicleType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modèle</p>
                  <p className="font-medium" data-testid="text-vehicle-model">{trip.transporter.vehicleModel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plaque</p>
                  <p className="font-medium" data-testid="text-vehicle-license">{trip.transporter.carLicense}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Transporter Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transporteur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={trip.transporter.avatar} />
                  <AvatarFallback>{trip.transporter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" data-testid="text-transporter-name">{trip.transporter.name}</h3>
                    {trip.transporter.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" data-testid="icon-verified" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium" data-testid="text-rating">{trip.transporter.rating}</span>
                    <span className="text-muted-foreground">({trip.transporter.reviewCount})</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Membre depuis {trip.transporter.memberSince}</span>
                </div>
              </div>

              <Link href={`/profile/${trip.transporter.id}`}>
                <Button variant="outline" className="w-full" data-testid="button-view-profile">
                  Voir le profil
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg" data-testid="button-confirm">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Réserver ce trajet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer la réservation</DialogTitle>
                    <DialogDescription>
                      Vous allez réserver un espace pour votre colis sur ce trajet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">Message au transporteur (optionnel)</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ajoutez des détails sur votre colis..."
                        data-testid="input-booking-message"
                      />
                    </div>
                    <div className="bg-muted/50 rounded-md p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Trajet</span>
                        <span className="font-medium">{trip.from} → {trip.to}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Date</span>
                        <span className="font-medium">{trip.date}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total à payer</span>
                        <span className="text-primary">{trip.price}€</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConfirmDialogOpen(false)} className="flex-1">
                      Annuler
                    </Button>
                    <Button onClick={handleConfirmBooking} className="flex-1" data-testid="button-proceed-payment">
                      Procéder au paiement
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full" onClick={handleContact} data-testid="button-contact">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contacter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
