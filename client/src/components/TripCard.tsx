import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Calendar, Package, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TripCardProps {
  id: string;
  from: string;
  to: string;
  date: string;
  availableWeight: number;
  price: number;
  transporter: {
    name: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
  };
}

export default function TripCard({ from, to, date, availableWeight, price, transporter }: TripCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="min-h-[280px] flex flex-col hover-elevate" data-testid="card-trip">
      <CardContent className="flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xl font-semibold mb-1">
              <span data-testid="text-from">{from}</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <span data-testid="text-to">{to}</span>
            </div>
          </div>
          <Badge className="text-lg font-bold px-3 py-1" data-testid="text-price">
            {price}€
          </Badge>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-date">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span data-testid="text-available-space">
              {t.trip.availableSpace}: {availableWeight} {t.trip.kg}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t">
          <Avatar className="h-10 w-10">
            <AvatarImage src={transporter.avatar} />
            <AvatarFallback>{transporter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate" data-testid="text-transporter-name">{transporter.name}</p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="font-medium" data-testid="text-rating">{transporter.rating}</span>
              <span className="text-muted-foreground">({transporter.reviewCount})</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          data-testid="button-view-details"
          onClick={() => console.log('View details clicked')}
        >
          {t.trip.viewDetails}
        </Button>
      </CardFooter>
    </Card>
  );
}
