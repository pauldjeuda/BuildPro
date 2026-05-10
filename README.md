# BUILDPRO - Gestion ERP BTP

Plateforme complète de gestion pour entreprises de Bâtiment et Travaux Publics.

## 📋 Architecture

```
BUILDPRO/
├── app/                      # Pages et routes Next.js
│   ├── dashboard/            # Module Dashboard
│   ├── chantiers/            # Module Gestion des Chantiers
│   ├── rapports/             # Module Rapports Journaliers
│   ├── stock/                # Module Stock
│   ├── achats/               # Module Achats
│   ├── finance/              # Module Finance
│   ├── hse/                  # Module HSE
│   └── engins/               # Module Engins & Parc
├── components/
│   ├── ui/                   # Composants UI génériques
│   ├── erp/                  # Composants métier ERP
│   └── layout/               # Layouts (Sidebar, Topbar)
├── lib/
│   ├── constants/            # Constantes et configurations
│   ├── types/                # Types TypeScript
│   ├── services/             # Services API
│   ├── hooks/                # Hooks React personnalisés
│   └── utils.ts              # Utilitaires
└── public/                   # Fichiers statiques
```

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Accédez à http://localhost:3000

### Build Production

```bash
npm run build
npm run start
```

## 📦 Technologies

- **Framework**: Next.js 16 avec React 19
- **Styling**: Tailwind CSS
- **UI Components**: Composants personnalisés avec CVA (class-variance-authority)
- **HTTP Client**: Axios avec intercepteurs
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 🏗️ Modules

### Dashboard
- Vue d'ensemble des KPIs
- Statistiques en temps réel
- Activité récente
- Alertes et notifications

### Chantiers
- Liste et détails des chantiers
- Progression et budget
- Affectation des équipes
- Documents et photos

### Rapports Journaliers
- Formulaires terrain
- Observations et incidents
- Uploadde photos
- Validation en workflow

### Stock
- Inventaire des matériaux
- Mouvements de stock
- Alertes de pénurie
- Transferts entre chantiers

### Finance
- Budgets par chantier
- Suivi des dépenses
- Factures et paiements
- Dashboards financiers

### HSE
- Déclaration d'incidents
- Actions correctives
- Inspections de sécurité
- Suivi des risques

### Engins
- Parc d'équipements
- Maintenance planifiée
- Carburant et pannes
- Affectation aux chantiers

### Achats
- Demandes d'achat
- Validations budgétaires
- Commandes fournisseurs
- Réceptions et factures

## 🔐 Sécurité et RBAC

Système de contrôle d'accès basé sur les rôles:

- **Admin**: Accès complet
- **Directeur Général (DG)**: Dashboards et validations
- **Directeur Administratif (DAF)**: Gestion financière
- **Chef de Chantier (CDT)**: Gestion chantiers et rapports
- **Chef d'Équipe**: Rapports et pointage
- **Opérateur**: Rapports terrain
- **Magasinier**: Gestion stock
- **Comptable**: Gestion finance

## 📊 Design System

### Couleurs (3-5 couleurs professionnelles)
- **Primary**: Bleu moderne (#0ea5e9)
- **Secondary**: Gris ardoise (#64748b)
- **Accent**: Cyan (#06b6d4)
- **Success**: Vert (#10b981)
- **Warning**: Ambre (#f59e0b)
- **Destructive**: Rouge (#ef4444)

### Typographie
- **Sans**: Inter
- **Mono**: Fira Code

### Composants Standards
- Button, Input, Select, Textarea
- Card, Badge, Table
- Modal, Toast, Skeleton
- KPI Card, Status Badge, Progress Bar
- Data Table, Empty State

## 🔌 Integration Backend

### Endpoints Disponibles

```typescript
// Chantiers
GET    /api/chantiers
POST   /api/chantiers
GET    /api/chantiers/:id
PUT    /api/chantiers/:id
DELETE /api/chantiers/:id

// Rapports
GET    /api/rapports
POST   /api/rapports
GET    /api/rapports/:id
PUT    /api/rapports/:id

// Stock
GET    /api/stock
POST   /api/stock/mouvements
GET    /api/stock/:id

// Finance
GET    /api/finance
GET    /api/dashboard/kpis

// Upload
POST   /api/upload
```

## 📝 Configuration

Variables d'environnement:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🛠️ Développement

### Ajouter un nouveau module

1. Créer le dossier `app/[module]/`
2. Créer `page.tsx` avec `<ERPLayout>`
3. Ajouter le module dans `lib/constants/modules.ts`
4. Créer les composants dans `components/[module]/`

### Ajouter un composant UI

1. Créer le fichier dans `components/ui/`
2. Exporter depuis `components/ui/index.ts`
3. Utiliser les design tokens Tailwind

## 📄 Licence

Propriétaire - BUILDPRO 2024
