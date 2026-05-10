'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { User, Lock, Bell, LogOut, Save } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Jean Dupont</h3>
                <p className="text-sm text-muted-foreground">Chef de Chantier</p>
              </div>
              <Badge variant="outline">Actif</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Entreprise</p>
                <p className="text-sm font-medium">BUILDPRO SAS</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Rôle</p>
                <p className="text-sm font-medium">Chef de Chantier</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Département</p>
                <p className="text-sm font-medium">Chantiers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="security">Sécurité</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Prénom</label>
                      <Input defaultValue="Jean" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nom</label>
                      <Input defaultValue="Dupont" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      defaultValue="jean.dupont@buildpro.fr"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input
                      type="tel"
                      defaultValue="+33 6 12 34 56 78"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      defaultValue="Chef de chantier avec 10 ans d'expérience dans le BTP"
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-4 mt-6">
                  <div>
                    <label className="text-sm font-medium">Mot de passe actuel</label>
                    <Input type="password" className="mt-1" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Nouveau mot de passe</label>
                    <Input type="password" className="mt-1" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Confirmer le mot de passe
                    </label>
                    <Input type="password" className="mt-1" placeholder="••••••••" />
                  </div>

                  <Button className="gap-2">
                    <Lock className="h-4 w-4" />
                    Mettre à jour le mot de passe
                  </Button>

                  <div className="mt-6 pt-6 border-t space-y-4">
                    <div>
                      <h4 className="font-medium">Sessions actives</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vous êtes connecté sur 2 appareils
                      </p>
                    </div>
                    <Button variant="outline">Déconnecter tous les appareils</Button>
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    {[
                      { id: 'email', label: 'Notifications par email', enabled: true },
                      {
                        id: 'updates',
                        label: 'Mises à jour de chantier',
                        enabled: true,
                      },
                      {
                        id: 'reports',
                        label: 'Alertes de rapport',
                        enabled: true,
                      },
                      {
                        id: 'finance',
                        label: 'Alertes financières',
                        enabled: false,
                      },
                      {
                        id: 'marketing',
                        label: 'Messages promotionnels',
                        enabled: false,
                      },
                    ].map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <label className="text-sm font-medium cursor-pointer">
                          {notification.label}
                        </label>
                        <input
                          type="checkbox"
                          defaultChecked={notification.enabled}
                          className="rounded border-border"
                        />
                      </div>
                    ))}
                  </div>

                  <Button className="gap-2">
                    <Bell className="h-4 w-4" />
                    Enregistrer les préférences
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de danger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Déconnexion</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Déconnectez-vous de votre compte sur cet appareil
            </p>
            <Button variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
