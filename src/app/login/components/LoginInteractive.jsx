'use client';

import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SecurityBadges from './SecurityBadges';
import BenefitsSection from './BenefitsSection';
import DistributorCTA from './DistributorCTA';
import Header from '@/components/common/Header';

export default function LoginInteractive() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('chemclean_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartItemCount={0} />
      <main className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6 md:space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3">
                  Bienvenido de Nuevo
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Inicia sesión para acceder a tu cuenta y gestionar tus pedidos
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-elevation-2">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </div>

              <SecurityBadges />
            </div>

            <div className="space-y-6 md:space-y-8">
              <BenefitsSection />
              <DistributorCTA />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} ChemClean Commerce. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}