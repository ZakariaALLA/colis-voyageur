import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator } from 'lucide-react';

export default function PackageRequestForm() {
  const { t } = useLanguage();
  const [weight, setWeight] = useState(5);
  const [volume, setVolume] = useState(20);
  const [description, setDescription] = useState('');

  const distance = 450;
  const baseRate = distance * 0.08;
  const weightCharge = weight * 2;
  const volumeCharge = volume * 0.5;
  const total = baseRate + weightCharge + volumeCharge;

  const handleSubmit = () => {
    console.log('Package request submitted:', { weight, volume, description, total });
    alert('Demande soumise avec succès!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" data-testid="text-package-title">{t.package.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">{t.package.weight} (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min="1"
                max="50"
                data-testid="input-weight"
              />
            </div>
            <div>
              <Label htmlFor="volume">{t.package.volume} (L)</Label>
              <Input
                id="volume"
                type="number"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                min="1"
                max="200"
                data-testid="input-volume"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">{t.package.description}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre colis..."
              rows={3}
              data-testid="textarea-description"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Calculator className="h-5 w-5 text-primary" />
              <span>{t.package.costEstimate}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.package.baseRate} ({distance} km):</span>
                <span data-testid="text-base-rate">{baseRate.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.package.weightCharge} ({weight} kg):</span>
                <span data-testid="text-weight-charge">{weightCharge.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.package.volumeCharge} ({volume} L):</span>
                <span data-testid="text-volume-charge">{volumeCharge.toFixed(2)}€</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>{t.package.total}:</span>
                <span className="text-primary" data-testid="text-total">{total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleSubmit} data-testid="button-submit">
            {t.package.submit}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
