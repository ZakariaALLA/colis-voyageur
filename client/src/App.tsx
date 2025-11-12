import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import SearchTrips from "@/components/SearchTrips";
import CreateTripForm from "@/components/CreateTripForm";
import PackageRequestForm from "@/components/PackageRequestForm";
import RatingReview from "@/components/RatingReview";
import UserProfile from "@/components/UserProfile";
import AuthPage from "@/components/AuthPage";
import RegisterForm from "@/components/RegisterForm";
import MyTrips from "@/pages/MyTrips";
import TripDetail from "@/pages/TripDetail";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchTrips} />
      <Route path="/create-trip" component={CreateTripForm} />
      <Route path="/request-package" component={PackageRequestForm} />
      <Route path="/rate" component={RatingReview} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/my-trips" component={MyTrips} />
      <Route path="/trip/:id" component={TripDetail} />
      <Route path="/messages/:userId?" component={Messages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
            </div>
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
