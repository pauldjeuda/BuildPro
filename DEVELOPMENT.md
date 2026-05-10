# Guide de Développement BUILDPRO

## 🚀 Démarrage Rapide

### Installation
```bash
# Cloner le projet
git clone https://github.com/pauldjeuda/BuildPro.git
cd BuildPro

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000
```

### Build Production
```bash
npm run build
npm start
```

---

## 📁 Structure du Projet

```
app/
├── (auth)/                    # Pages non authentifiées (à implémenter)
├── dashboard/                 # Module Dashboard
├── chantiers/                 # Module Chantiers
├── rapports/                  # Module Rapports
├── stock/                     # Module Stock
├── finance/                   # Module Finance
├── achats/                    # Module Achats
├── hse/                       # Module HSE
├── engins/                    # Module Engins
└── settings/                  # Configuration

components/
├── ui/                        # Composants UI de base
├── erp/                       # Composants métier ERP
└── layout/                    # Layout et navigation

lib/
├── types/                     # Définitions TypeScript
├── constants/                 # Configuration
├── services/                  # Couches API
└── hooks/                     # Custom hooks
```

---

## 🎯 Conventions de Code

### Naming
```typescript
// Composants React
export function ComponentName() { }

// Types et Interfaces
interface User {
  id: string;
  name: string;
}

type Status = 'actif' | 'inactif';

// Constantes
const PRIMARY_MODULES = [...];

// Hooks personnalisés
function useChantier(id: string) { }

// Utilitaires
function formatDate(date: Date) { }
```

### Imports
```typescript
// Ordonnez dans cet ordre:
// 1. React et Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Composants externes
import { Button } from 'lucide-react';

// 3. Composants locaux
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/erp';

// 4. Types
import { Chantier } from '@/lib/types/erp';

// 5. Utils et constants
import { cn } from '@/lib/utils';
import { PRIMARY_MODULES } from '@/lib/constants/modules';
```

### Composants
```typescript
'use client'; // Si client-side rendering

import { ComponentType } from 'react';
import { Card } from '@/components/ui/card';

interface MyComponentProps {
  title: string;
  onSubmit?: (data: any) => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  return (
    <Card>
      <h1>{title}</h1>
    </Card>
  );
}
```

---

## 🎨 Utiliser les Composants

### UI Components
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Utilisation
<Button variant="outline" size="sm">Cliquez-moi</Button>
<Badge variant="destructive">Critique</Badge>
<Card>
  <CardHeader><h2>Titre</h2></CardHeader>
  <CardContent>Contenu</CardContent>
</Card>
```

### ERP Components
```typescript
import { KPICard, StatusBadge, ProgressBar, DataTable, EmptyState } from '@/components/erp';

// KPI Cards
<KPICard
  title="Chiffre d'Affaires"
  value="2.5M €"
  trend="up"
  icon={<TrendingUp />}
/>

// Status Badge
<StatusBadge status="en_cours" />

// Progress Bar
<ProgressBar value={65} />

// Data Table
<DataTable
  columns={columns}
  data={data}
  onSort={handleSort}
/>
```

---

## 🔄 Patterns Courants

### Créer une Page Module
```typescript
// app/monmodule/page.tsx
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/erp';

export default function MonModulePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Titre */}
        <div>
          <h1 className="text-3xl font-bold">Mon Module</h1>
          <p className="text-muted-foreground">Description</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard title="Métrique 1" value="100" trend="up" />
        </div>

        {/* Contenu */}
        <Card>
          <CardHeader>
            <h2>Section</h2>
          </CardHeader>
          <CardContent>
            {/* Votre contenu */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

### Ajouter un Formulaire
```typescript
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Soumis:', formData);
  };

  return (
    <Card>
      <CardHeader>
        <h2>Formulaire</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez le nom..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Entrez la description..."
            />
          </div>
          <Button type="submit">Soumettre</Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Utiliser une Table
```typescript
'use client';

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Item {
  id: string;
  name: string;
  status: string;
}

export function MyTable({ items }: { items: Item[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Badge variant={item.status === 'active' ? 'default' : 'outline'}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Modifier</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

---

## 🌐 Préparation API Integration

### Structure Service
```typescript
// lib/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// Intercepteurs pour l'authentification
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Chantiers
export const chantiersAPI = {
  list: () => API.get('/chantiers'),
  getById: (id: string) => API.get(`/chantiers/${id}`),
  create: (data: any) => API.post('/chantiers', data),
  update: (id: string, data: any) => API.put(`/chantiers/${id}`, data),
  delete: (id: string) => API.delete(`/chantiers/${id}`),
};

// Autres modules...
export const rapportsAPI = { /* ... */ };
export const stockAPI = { /* ... */ };
export const financeAPI = { /* ... */ };
```

### Hook Data Fetching
```typescript
// lib/hooks/use-fetch.ts
import { useState, useEffect } from 'react';

export function useFetch<T>(
  fn: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const result = await fn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
}
```

### Utilisation
```typescript
'use client';

import { useFetch } from '@/lib/hooks/use-fetch';
import { chantiersAPI } from '@/lib/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/erp';

export function ChantiersPage() {
  const { data: chantiers, loading, error } = useFetch(
    () => chantiersAPI.list(),
    []
  );

  if (loading) return <Skeleton className="h-32" />;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!chantiers?.length) return <EmptyState title="Aucun chantier" />;

  return (
    <div>
      {/* Render chantiers */}
    </div>
  );
}
```

---

## 📚 Types & Interfaces

### Types Chantier
```typescript
// lib/types/erp.ts
export interface Chantier {
  id: string;
  name: string;
  address: string;
  client: string;
  status: ChantierStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  teams: number;
  createdAt: string;
  updatedAt: string;
}

export type ChantierStatus = 'lance' | 'en_cours' | 'termine' | 'suspendu';
```

### Types Authentification
```typescript
// lib/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export type Role = 'admin' | 'dg' | 'daf' | 'cdt' | 'worker';

export interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

---

## 🧪 Tester Localement

### Pages à Tester

**Accueil**
- http://localhost:3000

**Dashboard**
- http://localhost:3000/dashboard

**Chantiers**
- http://localhost:3000/chantiers
- http://localhost:3000/chantiers/1
- http://localhost:3000/chantiers/nouveau

**Rapports**
- http://localhost:3000/rapports
- http://localhost:3000/rapports/nouveau

**Stock**
- http://localhost:3000/stock
- http://localhost:3000/stock/inventaire

**Finance**
- http://localhost:3000/finance
- http://localhost:3000/finance/dashboards

**HSE**
- http://localhost:3000/hse
- http://localhost:3000/hse/incidents

**Engins**
- http://localhost:3000/engins
- http://localhost:3000/engins/parc

**Settings**
- http://localhost:3000/settings
- http://localhost:3000/settings/permissions

---

## 🚨 Débogage

### Logs
```typescript
console.log('[v0] Debug info:', data);
```

### Browser DevTools
- F12 pour ouvrir DevTools
- Onglet "Elements" pour inspecter le HTML
- Onglet "Console" pour les logs
- Onglet "Network" pour les requêtes API

### Next.js Debug
```bash
# Mode verbeux
npm run dev -- --debug
```

---

## 📦 Déploiement

### Sur Vercel
```bash
# Connecter le repo GitHub
# Déployer depuis la branche main
git push origin main
```

### Variables d'Environnement
Ajouter dans Vercel:
- `NEXT_PUBLIC_API_URL` - URL de l'API
- `DATABASE_URL` - Connection string DB
- Autres variables selon `.env.example`

---

## 🤝 Contribution

### Branches
- `main` - Production
- `develop` - Développement
- `feature/*` - Nouvelles fonctionnalités
- `bugfix/*` - Corrections

### Commits
```bash
git commit -m "feat(chantiers): ajouter filtres avancés"
git commit -m "fix(dashboard): corriger calcul KPI"
git commit -m "docs: mettre à jour README"
```

### Commits Conventionnels
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactorisation
- `test:` Tests
- `chore:` Maintenance

---

## 📞 Support

Pour des questions ou problèmes:
1. Consulter la documentation dans `/README.md` et `/STRUCTURE.md`
2. Vérifier les issues GitHub existantes
3. Créer une nouvelle issue si nécessaire

---

**Bonne contribution à BUILDPRO !** 🚀
