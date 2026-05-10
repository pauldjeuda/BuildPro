# BUILDPRO - Structure du Projet

## 📁 Architecture Générale

BUILDPRO utilise une **architecture modulaire Next.js 16 avec React 19**, organisée par modules métier ERP.

```
v0-project/
├── app/                          # Routage App Router Next.js 16
│   ├── dashboard/                # Module Tableau de Bord
│   ├── chantiers/                # Module Chantiers
│   │   ├── page.tsx              # Liste chantiers
│   │   ├── [id]/page.tsx         # Détails chantier
│   │   └── nouveau/page.tsx      # Création chantier
│   ├── rapports/                 # Module Rapports Journaliers
│   │   └── nouveau/page.tsx      # Nouveau rapport
│   ├── stock/                    # Module Stock
│   │   └── inventaire/page.tsx   # Gestion inventaire
│   ├── finance/                  # Module Finance
│   │   └── dashboards/page.tsx   # Dashboard financier
│   ├── achats/                   # Module Achats
│   ├── hse/                      # Module HSE
│   │   └── incidents/page.tsx    # Gestion incidents
│   ├── engins/                   # Module Engins
│   │   └── parc/page.tsx         # Parc d'engins
│   ├── settings/                 # Configuration
│   │   ├── page.tsx              # Accueil settings
│   │   └── permissions/page.tsx  # RBAC
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Accueil
│   └── globals.css               # Styles globaux
│
├── components/
│   ├── ui/                       # Composants UI de base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   └── toast.tsx
│   │
│   ├── erp/                      # Composants métier ERP
│   │   ├── kpi-card.tsx          # Carte KPI
│   │   ├── status-badge.tsx      # Badge statut
│   │   ├── progress-bar.tsx      # Barre progression
│   │   ├── empty-state.tsx       # État vide
│   │   ├── data-table.tsx        # Tableau données
│   │   └── index.ts              # Index composants
│   │
│   └── layout/                   # Composants layout
│       ├── sidebar.tsx           # Navigation latérale
│       ├── topbar.tsx            # Barre supérieure
│       └── erp-layout.tsx        # Wrapper layout ERP
│
├── lib/
│   ├── types/
│   │   ├── auth.ts               # Types authentification
│   │   └── erp.ts                # Types métier ERP
│   │
│   ├── constants/
│   │   └── modules.ts            # Configuration modules
│   │
│   ├── services/
│   │   └── api.ts                # Couche API
│   │
│   ├── hooks/
│   │   └── use-fetch.ts          # Hooks data fetching
│   │
│   ├── utils.ts                  # Utilitaires
│   └── cn.ts                     # Classname utility
│
├── public/                       # Assets statiques
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── README.md
└── STRUCTURE.md
```

## 🎯 Modules Métier

### 1. Dashboard (Tableau de Bord)
**Route**: `/dashboard`
**Niveau**: 40% du MVP
**Contenu**:
- KPI cards pour DG, DAF, CDT, Chantier
- Tableau activité
- Statistiques en temps réel

### 2. Chantiers
**Route**: `/chantiers`
**Niveau**: 50% du MVP
**Pages**:
- `/chantiers` - Liste des chantiers avec filtres
- `/chantiers/[id]` - Détails chantier avec progression, budget, documents
- `/chantiers/nouveau` - Création nouveau chantier
**Fonctionnalités**:
- Progression chantier
- Budget tracking
- Équipes assignées
- Documents et photos
- Incidents

### 3. Rapports Journaliers
**Route**: `/rapports`
**Niveau**: 55% du MVP
**Pages**:
- `/rapports` - Liste des rapports
- `/rapports/nouveau` - Création rapport terrain
**Fonctionnalités**:
- Saisie rapide terrain
- Méteo et effectifs
- Travaux réalisés
- Photos/vidéos
- Historique

### 4. Stock
**Route**: `/stock`
**Niveau**: 50% du MVP
**Pages**:
- `/stock` - Dashboard stock
- `/stock/inventaire` - Gestion inventaire
**Fonctionnalités**:
- Mouvements stock
- Alertes seuil
- Inventaires
- Transferts chantier

### 5. Finance
**Route**: `/finance`
**Niveau**: 50% du MVP
**Pages**:
- `/finance` - Dashboard financier
- `/finance/dashboards` - Dashboards métier
**Fonctionnalités**:
- Dépenses et budgets
- Cashflow
- Factures et paiements
- Rentabilité

### 6. Achats
**Route**: `/achats`
**Niveau**: 50% du MVP
**Fonctionnalités**:
- Demandes d'achat
- Validations
- Commandes
- Suivi livraisons

### 7. HSE (Santé, Sécurité, Environnement)
**Route**: `/hse`
**Niveau**: 50% du MVP
**Pages**:
- `/hse/incidents` - Gestion incidents
**Fonctionnalités**:
- Déclaration incidents
- Suivi actions correctives
- Inspections
- Rapports compliance

### 8. Engins
**Route**: `/engins`
**Niveau**: 50% du MVP
**Pages**:
- `/engins/parc` - Parc d'engins
**Fonctionnalités**:
- Suivi parc
- Maintenance préventive
- Consommation carburant
- Historique pannes

### 9. Settings
**Route**: `/settings`
**Pages**:
- `/settings` - Accueil settings
- `/settings/permissions` - Gestion RBAC
**Fonctionnalités**:
- Permissions par rôle
- Gestion utilisateurs
- Paramètres système

## 🎨 Composants UI

### De Base (shadcn/ui style)
- **Button**: Boutons avec variantes
- **Card**: Conteneurs cartes
- **Input**: Champs texte
- **Textarea**: Zones texte
- **Badge**: Labels et statuts
- **Table**: Tableaux de données
- **Tabs**: Onglets navigation
- **Modal**: Dialogues
- **Select**: Listes déroulantes
- **Skeleton**: Loading placeholders
- **Toast**: Notifications

### Métier ERP
- **KPICard**: Affichage KPI avec tendance
- **StatusBadge**: Statuts avec couleurs
- **ProgressBar**: Barres de progression
- **EmptyState**: États vides
- **DataTable**: Tableaux avec pagination

## 🔐 Sécurité & RBAC

### Rôles Prédéfinis
1. **Admin** - Accès complet
2. **DG** - Dashboards stratégiques
3. **DAF** - Finance et comptabilité
4. **CDT** - Chantiers et équipes
5. **Ouvrier** - Accès chantier limité

### Permissions
Basées sur:
- Modules accessibles
- Actions autorisées
- Données visibles
- Menus dynamiques

## 🛠️ Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **UI**: Tailwind CSS 3
- **Composants**: Radix UI
- **Icônes**: Lucide React
- **Types**: TypeScript
- **API**: Axios (prêt)
- **State**: Context API (extensible)

## 📦 Dépendances Principales

```json
{
  "next": "15.x",
  "react": "19.x",
  "tailwindcss": "3.x",
  "@radix-ui/react-tabs": "latest",
  "lucide-react": "0.396.x",
  "axios": "1.x"
}
```

## 🚀 Avancement par Module

| Module | Niveau | Pages | Statut |
|--------|--------|-------|--------|
| Dashboard | 40% | 1 | ✓ Structuré |
| Chantiers | 50% | 3 | ✓ Opérationnel |
| Rapports | 55% | 2 | ✓ Opérationnel |
| Stock | 50% | 2 | ✓ Structuré |
| Finance | 50% | 2 | ✓ Structuré |
| Achats | 50% | - | 🔲 Prévu |
| HSE | 50% | 1 | ✓ Structuré |
| Engins | 50% | 1 | ✓ Structuré |
| Settings | 60% | 2 | ✓ Opérationnel |
| **TOTAL MVP** | **~45-55%** | **14** | ✓ |

## 🔄 Flux de Données

```
Page Component
  ↓
ERP Layout (Sidebar + Topbar)
  ↓
UI Components + ERP Components
  ↓
Services (API Layer)
  ↓
Backend APIs (À implémenter)
```

## 📝 Conventions de Code

### Naming
- Composants: `PascalCase` (Button.tsx)
- Types: `PascalCase` (User, Chantier)
- Hooks: `useXxx` (useFetch)
- Constants: `UPPER_SNAKE_CASE` (PRIMARY_MODULES)

### Structure Fichier
```tsx
'use client';  // Si client-side

import { imports }

// Types/Interfaces
interface ComponentProps { ... }

// Composant
export default function Component({ props }) { ... }
```

### Imports
- UI: `@/components/ui`
- ERP: `@/components/erp`
- Layout: `@/components/layout`
- Types: `@/lib/types`
- Utils: `@/lib/utils`

## 🎯 Prochaines Étapes (Phase 2)

1. **Backend Integration**
   - APIs pour chaque module
   - Authentification réelle
   - WebSocket pour sync temps réel

2. **UX Avancée**
   - Micro-interactions
   - Animations
   - Dark mode
   - Mobile optimisé

3. **Performance**
   - Lazy loading routes
   - Code splitting
   - Image optimization
   - Caching strategy

4. **Production**
   - Tests unitaires
   - E2E tests
   - Monitoring/Logs
   - Error boundaries
