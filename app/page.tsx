'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="container mx-auto px-4 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Building2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">BUILDPRO</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestion complète d&apos;entreprises BTP
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            Accéder au Tableau de Bord
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/chantiers')}
          >
            Voir les Chantiers
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-border">
          {[
            { label: 'Chantiers', count: '12' },
            { label: 'Équipes', count: '34' },
            { label: 'Modules', count: '8' },
            { label: 'Utilisateurs', count: '156' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-3xl font-bold text-primary">{stat.count}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
