'use client';

import React, { useState } from 'react';
import { Users, Shield, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'admin',
      name: 'Administrateur',
      description: 'Accès complet à tous les modules',
      color: 'bg-red-100 text-red-800',
      users: 2,
    },
    {
      id: 'dg',
      name: 'Directeur Général',
      description: 'Dashboards et rapports stratégiques',
      color: 'bg-blue-100 text-blue-800',
      users: 1,
    },
    {
      id: 'daf',
      name: 'Directeur Administratif & Financier',
      description: 'Gestion finance et comptabilité',
      color: 'bg-green-100 text-green-800',
      users: 2,
    },
    {
      id: 'cdt',
      name: 'Chef de Travaux',
      description: 'Gestion des chantiers et équipes',
      color: 'bg-yellow-100 text-yellow-800',
      users: 3,
    },
    {
      id: 'worker',
      name: 'Ouvrier',
      description: 'Accès limité au chantier assigné',
      color: 'bg-gray-100 text-gray-800',
      users: 25,
    },
  ];

  const modules = [
    { id: 'dashboard', name: 'Tableau de Bord', icon: '📊' },
    { id: 'chantiers', name: 'Chantiers', icon: '🏗️' },
    { id: 'rapports', name: 'Rapports', icon: '📝' },
    { id: 'stock', name: 'Stock', icon: '📦' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'achats', name: 'Achats', icon: '🛒' },
    { id: 'hse', name: 'HSE', icon: '⚠️' },
    { id: 'engins', name: 'Engins', icon: '🚗' },
  ];

  const rolePermissions: Record<string, Record<string, boolean>> = {
    admin: {
      dashboard: true,
      chantiers: true,
      rapports: true,
      stock: true,
      finance: true,
      achats: true,
      hse: true,
      engins: true,
    },
    dg: {
      dashboard: true,
      chantiers: true,
      rapports: true,
      stock: false,
      finance: true,
      achats: false,
      hse: true,
      engins: false,
    },
    daf: {
      dashboard: true,
      chantiers: false,
      rapports: false,
      stock: false,
      finance: true,
      achats: true,
      hse: false,
      engins: false,
    },
    cdt: {
      dashboard: true,
      chantiers: true,
      rapports: true,
      stock: true,
      finance: false,
      achats: false,
      hse: true,
      engins: true,
    },
    worker: {
      dashboard: false,
      chantiers: true,
      rapports: true,
      stock: false,
      finance: false,
      achats: false,
      hse: true,
      engins: false,
    },
  };

  const currentPermissions = selectedRole ? rolePermissions[selectedRole] : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Gestion des Permissions
            </h1>
            <p className="text-muted-foreground">Contrôle d&apos;accès basé sur les rôles (RBAC)</p>
          </div>
        </div>

        {/* Roles Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Rôles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  selectedRole === role.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <Badge variant="outline">{role.users} utilisateurs</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      ID: {role.id}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Permissions Detail */}
        {currentPermissions && selectedRole && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Permissions pour {roles.find((r) => r.id === selectedRole)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((module) => {
                  const hasAccess = currentPermissions[module.id];
                  return (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border ${
                        hasAccess
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{module.icon}</span>
                          <span className="font-medium text-foreground">{module.name}</span>
                        </div>
                        <Badge
                          variant={hasAccess ? 'default' : 'destructive'}
                        >
                          {hasAccess ? '✓ Accès' : '✗ Refusé'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matrix View */}
        <Card>
          <CardHeader>
            <CardTitle>Matrice des Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    {roles.map((role) => (
                      <TableHead key={role.id} className="text-center">
                        {role.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.name}</TableCell>
                      {roles.map((role) => {
                        const hasAccess = rolePermissions[role.id][module.id];
                        return (
                          <TableCell key={`${role.id}-${module.id}`} className="text-center">
                            {hasAccess ? (
                              <Badge variant="outline" className="bg-green-50">
                                ✓
                              </Badge>
                            ) : (
                              <Badge variant="destructive">✗</Badge>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Permissions Section */}
        {selectedRole && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Éditer les Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les modules accessibles pour {roles.find((r) => r.id === selectedRole)?.name}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    Éditer les Permissions
                  </Button>
                  <Button variant="outline" size="sm">
                    Réinitialiser par Défaut
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
