import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Package, ArrowRight, ArrowLeft, User, Mail, Lock, Phone, Car, MapPin } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function RegisterForm() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'sender' | 'transporter'>('sender');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    carLicense: '',
    vehicleType: '',
    vehicleModel: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        ...formData,
        userType,
      });
      alert('Inscription réussie! Bienvenue sur ColisVoyageur.');
      setLocation('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl" data-testid="text-register-title">
            {t.auth.register}
          </CardTitle>
          <CardDescription>
            Créez votre compte pour commencer à utiliser ColisVoyageur
          </CardDescription>
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Type de compte</span>
              <span>Informations</span>
              <span>Confirmation</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">{t.auth.userType}</Label>
                <RadioGroup value={userType} onValueChange={(value: 'sender' | 'transporter') => setUserType(value)}>
                  <Card className={`cursor-pointer transition-all ${userType === 'sender' ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value="sender" id="sender" data-testid="radio-sender" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="sender" className="text-base font-semibold cursor-pointer">
                            {t.auth.sender}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            J'ai besoin d'envoyer des colis via des voyageurs
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer transition-all ${userType === 'transporter' ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value="transporter" id="transporter" data-testid="radio-transporter" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="transporter" className="text-base font-semibold cursor-pointer">
                            {t.auth.transporter}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Je voyage régulièrement et peux transporter des colis
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">
                    <User className="h-4 w-4 inline mr-2" />
                    {t.auth.fullName}
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jean Dupont"
                    data-testid="input-fullname"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="jean.dupont@email.com"
                  data-testid="input-email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">
                    <Lock className="h-4 w-4 inline mr-2" />
                    {t.auth.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="••••••••"
                    data-testid="input-password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">
                    <Lock className="h-4 w-4 inline mr-2" />
                    {t.auth.confirmPassword}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Ville
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Paris"
                    data-testid="input-city"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="123 Rue Example"
                    data-testid="input-address"
                  />
                </div>
              </div>

              {userType === 'transporter' && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Informations du véhicule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="carLicense">{t.auth.carLicense}</Label>
                        <Input
                          id="carLicense"
                          value={formData.carLicense}
                          onChange={(e) => updateField('carLicense', e.target.value)}
                          placeholder="AB-123-CD"
                          data-testid="input-car-license"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleType">{t.auth.vehicleType}</Label>
                        <Input
                          id="vehicleType"
                          value={formData.vehicleType}
                          onChange={(e) => updateField('vehicleType', e.target.value)}
                          placeholder="Berline, SUV, etc."
                          data-testid="input-vehicle-type"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vehicleModel">Modèle du véhicule</Label>
                      <Input
                        id="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={(e) => updateField('vehicleModel', e.target.value)}
                        placeholder="Renault Clio, Peugeot 308, etc."
                        data-testid="input-vehicle-model"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Vérifiez vos informations</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 py-3 border-b">
                  <span className="text-muted-foreground">Type de compte:</span>
                  <span className="col-span-2 font-medium" data-testid="text-confirm-user-type">
                    {userType === 'sender' ? 'Expéditeur' : 'Transporteur'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-b">
                  <span className="text-muted-foreground">Nom complet:</span>
                  <span className="col-span-2 font-medium" data-testid="text-confirm-name">{formData.fullName}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-b">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="col-span-2 font-medium" data-testid="text-confirm-email">{formData.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-b">
                  <span className="text-muted-foreground">Téléphone:</span>
                  <span className="col-span-2 font-medium" data-testid="text-confirm-phone">{formData.phone}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-b">
                  <span className="text-muted-foreground">Ville:</span>
                  <span className="col-span-2 font-medium" data-testid="text-confirm-city">{formData.city}</span>
                </div>

                {userType === 'transporter' && (
                  <>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 gap-4 py-3 border-b">
                      <span className="text-muted-foreground">Plaque:</span>
                      <span className="col-span-2 font-medium" data-testid="text-confirm-license">{formData.carLicense}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-3 border-b">
                      <span className="text-muted-foreground">Type véhicule:</span>
                      <span className="col-span-2 font-medium" data-testid="text-confirm-vehicle-type">{formData.vehicleType}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <span className="text-muted-foreground">Modèle:</span>
                      <span className="col-span-2 font-medium" data-testid="text-confirm-vehicle-model">{formData.vehicleModel}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-muted/50 rounded-md p-4 text-sm text-muted-foreground">
                En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              </div>
            </div>
          )}

          <div className="flex justify-between gap-4 pt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                data-testid="button-previous"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
            )}
            
            <div className="flex-1" />

            {step < 3 ? (
              <Button onClick={handleNext} data-testid="button-next">
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} data-testid="button-submit" className="min-w-[140px]" disabled={isLoading}>
                {isLoading ? 'Chargement...' : "S'inscrire"}
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Déjà membre ? </span>
            <Link href="/auth">
              <Button variant="ghost" className="p-0 h-auto text-primary" data-testid="link-login">
                Se connecter
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
