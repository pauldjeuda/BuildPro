'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, Users, Building2, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const settingsSections = [
    {
      id: 'general',
      title: 'Paramètres Généraux',
      description: 'Informations de l\'entreprise et préférences',
      icon: <Building2 className="h-6 w-6" />,
      href: '/settings/general',
    },
    {
      id: 'users',
      title: 'Gestion des Utilisateurs',
      description: 'Ajouter, modifier, supprimer des utilisateurs',
      icon: <Users className="h-6 w-6" />,
      href: '/settings/users',
    },
    {
      id: 'permissions',
      title: 'Permissions & Rôles',
      description: 'Contrôle d\'accès basé sur les rôles',
      icon: <Shield className="h-6 w-6" />,
      href: '/settings/permissions',
    },
    {
      id: 'integrations',
      title: 'Intégrations',
      description: 'Connecter les services externes',
      icon: <Zap className="h-6 w-6" />,
      href: '/settings/integrations',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Paramètres
          </h1>
          <p className="text-muted-foreground">Gérez la configuration de votre instance BUILDPRO</p>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section) => (
            <Link key={section.id} href={section.href}>
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-primary">{section.icon}</div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                      <p className="text-sm text-muted-foreground mt-2">{section.description}</p>
                    </div>
                    <div>
                      <Button variant="outline" className="w-full">
                        Accéder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* System Info */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Informations Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Version</p>
                <p className="text-lg font-semibold">0.1.0</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Environnement</p>
                <p className="text-lg font-semibold">Production</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Base de Données</p>
                <p className="text-lg font-semibold">PostgreSQL</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Dernière Mise à Jour</p>
                <p className="text-lg font-semibold">2024-05-10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
