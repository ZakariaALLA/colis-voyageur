import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package } from 'lucide-react';

export default function AuthPage() {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('sender');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    carLicense: '',
    vehicleType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { isLogin, userType, formData });
    alert(isLogin ? 'Connexion réussie!' : 'Inscription réussie!');
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl" data-testid="text-auth-title">
            {isLogin ? t.auth.login : t.auth.register}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="fullName">{t.auth.fullName}</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    data-testid="input-fullname"
                  />
                </div>

                <div>
                  <Label>{t.auth.userType}</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sender" id="sender" data-testid="radio-sender" />
                      <Label htmlFor="sender" className="font-normal cursor-pointer">
                        {t.auth.sender}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transporter" id="transporter" data-testid="radio-transporter" />
                      <Label htmlFor="transporter" className="font-normal cursor-pointer">
                        {t.auth.transporter}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {userType === 'transporter' && (
                  <>
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
                  </>
                )}
              </>
            )}

            <div>
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                data-testid="input-email"
              />
            </div>

            <div>
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                data-testid="input-password"
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  data-testid="input-confirm-password"
                />
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
              {t.auth.submit}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Pas encore membre ? " : "Déjà membre ? "}
              </span>
              <Button
                type="button"
                variant="ghost"
                className="p-0 h-auto text-primary"
                onClick={() => {
                  if (isLogin) {
                    window.location.href = '/register';
                  } else {
                    setIsLogin(true);
                  }
                }}
                data-testid="button-toggle-auth"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
