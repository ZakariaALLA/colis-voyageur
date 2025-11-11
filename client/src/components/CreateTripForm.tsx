import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function CreateTripForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    weight: '',
    volume: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Trip published:', formData);
    alert('Trajet publié avec succès!');
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" data-testid="text-form-title">{t.createTrip.title}</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t.createTrip.step1}</span>
              <span>{t.createTrip.step2}</span>
              <span>{t.createTrip.step3}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="from">{t.createTrip.from}</Label>
                <Input
                  id="from"
                  value={formData.from}
                  onChange={(e) => updateField('from', e.target.value)}
                  placeholder="Paris"
                  data-testid="input-from"
                />
              </div>
              <div>
                <Label htmlFor="to">{t.createTrip.to}</Label>
                <Input
                  id="to"
                  value={formData.to}
                  onChange={(e) => updateField('to', e.target.value)}
                  placeholder="Lyon"
                  data-testid="input-to"
                />
              </div>
              <div>
                <Label htmlFor="date">{t.createTrip.departureDate}</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  data-testid="input-date"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">{t.createTrip.availableWeight}</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  placeholder="10"
                  data-testid="input-weight"
                />
              </div>
              <div>
                <Label htmlFor="volume">{t.createTrip.availableVolume}</Label>
                <Input
                  id="volume"
                  type="number"
                  value={formData.volume}
                  onChange={(e) => updateField('volume', e.target.value)}
                  placeholder="50"
                  data-testid="input-volume"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t.createTrip.step3}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">{t.createTrip.from}:</span>
                  <span className="font-medium" data-testid="text-confirm-from">{formData.from}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">{t.createTrip.to}:</span>
                  <span className="font-medium" data-testid="text-confirm-to">{formData.to}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">{t.createTrip.departureDate}:</span>
                  <span className="font-medium" data-testid="text-confirm-date">{formData.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">{t.createTrip.availableWeight}:</span>
                  <span className="font-medium" data-testid="text-confirm-weight">{formData.weight} kg</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">{t.createTrip.availableVolume}:</span>
                  <span className="font-medium" data-testid="text-confirm-volume">{formData.volume} L</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            data-testid="button-previous"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.createTrip.previous}
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext} data-testid="button-next">
              {t.createTrip.next}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} data-testid="button-publish">
              <Check className="h-4 w-4 mr-2" />
              {t.createTrip.publish}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
