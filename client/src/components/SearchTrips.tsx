import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, SlidersHorizontal } from 'lucide-react';
import TripCard from './TripCard';
import emptyStateImage from '@assets/generated_images/Empty_state_illustration_1db84fac.png';

export default function SearchTrips() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState([200]);
  const [minRating, setMinRating] = useState([4]);

  const mockTrips = [
    {
      id: '1',
      from: 'Paris',
      to: 'Lyon',
      date: '15 Nov 2025',
      availableWeight: 10,
      price: 45,
      transporter: {
        name: 'Jean Dupont',
        rating: 4.8,
        reviewCount: 24,
      },
    },
    {
      id: '2',
      from: 'Paris',
      to: 'Marseille',
      date: '16 Nov 2025',
      availableWeight: 15,
      price: 65,
      transporter: {
        name: 'Marie Martin',
        rating: 4.9,
        reviewCount: 31,
      },
    },
    {
      id: '3',
      from: 'Paris',
      to: 'Toulouse',
      date: '17 Nov 2025',
      availableWeight: 8,
      price: 55,
      transporter: {
        name: 'Pierre Dubois',
        rating: 4.7,
        reviewCount: 18,
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8" data-testid="text-search-title">
        {t.search.title}
      </h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="from">{t.search.from}</Label>
              <Input
                id="from"
                placeholder="Paris"
                data-testid="input-from"
              />
            </div>
            <div>
              <Label htmlFor="to">{t.search.to}</Label>
              <Input
                id="to"
                placeholder="Lyon"
                data-testid="input-to"
              />
            </div>
            <div>
              <Label htmlFor="date">{t.search.date}</Label>
              <Input
                id="date"
                type="date"
                data-testid="input-date"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button className="flex-1" data-testid="button-search">
                <Search className="h-4 w-4 mr-2" />
                {t.search.searchBtn}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
              <div>
                <Label>{t.search.maxPrice}: {maxPrice[0]}€</Label>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={300}
                  step={10}
                  className="mt-2"
                  data-testid="slider-max-price"
                />
              </div>
              <div>
                <Label>{t.search.minRating}: {minRating[0]}</Label>
                <Slider
                  value={minRating}
                  onValueChange={setMinRating}
                  max={5}
                  step={0.5}
                  className="mt-2"
                  data-testid="slider-min-rating"
                />
              </div>
              <div>
                <Label>{t.search.sortBy}</Label>
                <Select defaultValue="price">
                  <SelectTrigger data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Prix croissant</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="rating">Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {mockTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <img
            src={emptyStateImage}
            alt="No results"
            className="w-48 h-48 mx-auto mb-6 opacity-60"
          />
          <h3 className="text-xl font-semibold mb-2">{t.search.noResults}</h3>
          <Button variant="outline" className="mt-4" data-testid="button-create-alert">
            {t.search.createAlert}
          </Button>
        </div>
      )}
    </div>
  );
}
