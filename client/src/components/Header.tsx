import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Package, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import { useState } from 'react';

export default function Header() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/search', label: t.nav.search },
    { path: '/create-trip', label: t.nav.publishTrip },
    { path: '/my-trips', label: t.nav.myTrips },
  ];

  const getUserInitials = () => {
    if (!user?.fullName) return 'U';
    return user.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 -mx-3 -my-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ColisVoyageur</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? 'secondary' : 'ghost'}
                  size="sm"
                  data-testid={`link-${item.path.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-user-menu" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold" data-testid="text-user-name">{user?.fullName}</span>
                      <span className="text-xs text-muted-foreground" data-testid="text-user-email">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-trips" className="cursor-pointer">
                      <Package className="h-4 w-4 mr-2" />
                      Mes trajets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-trips" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-destructive cursor-pointer"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button size="sm" data-testid="button-login">
                  {t.nav.login}
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.path.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/profile';
                  }}
                  data-testid="mobile-link-profile"
                >
                  <User className="h-4 w-4 mr-2" />
                  Mon profil
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  data-testid="mobile-button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
