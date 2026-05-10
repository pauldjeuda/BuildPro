'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Building2, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@buildpro.fr');
  const [password, setPassword] = useState('demo123');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary text-white">
              <Building2 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">BUILDPRO</h1>
          <p className="text-muted-foreground">
            Gestion complète d&apos;entreprises BTP
          </p>
        </div>

        {/* Login Card */}
        <Card className="border border-border shadow-lg">
          <div className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <span className="text-muted-foreground">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-primary hover:text-primary-hover transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full gap-2 mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se Connecter'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Demo Info */}
            <div className="pt-6 border-t border-border space-y-3">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Compte démo prérempli
              </p>
              <div className="bg-primary-light p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Email: <span className="font-semibold text-primary">demo@buildpro.fr</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Mot de passe: <span className="font-semibold text-primary">demo123</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          BUILDPRO MVP v1.0 • 50% du projet complet
        </p>
      </div>
    </div>
  );
}
