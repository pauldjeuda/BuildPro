/**
 * BUILDPRO - Structure des Modules ERP
 * Organisation métier cohérente selon la vision produit
 */

export const MODULES = {
  DASHBOARD: {
    id: 'dashboard',
    name: 'Tableaux de Bord',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    description: 'Vue d\'ensemble et KPIs',
    level: 1,
  },
  CHANTIERS: {
    id: 'chantiers',
    name: 'Chantiers',
    path: '/chantiers',
    icon: 'Building2',
    description: 'Gestion des chantiers et progression',
    level: 1,
  },
  RAPPORTS: {
    id: 'rapports',
    name: 'Rapports Journaliers',
    path: '/rapports',
    icon: 'FileText',
    description: 'Rapports terrains et observations',
    level: 1,
  },
  STOCK: {
    id: 'stock',
    name: 'Stock',
    path: '/stock',
    icon: 'Package',
    description: 'Gestion des matériaux et inventaires',
    level: 2,
  },
  ACHATS: {
    id: 'achats',
    name: 'Achats',
    path: '/achats',
    icon: 'ShoppingCart',
    description: 'Commandes et réceptions',
    level: 2,
  },
  FINANCE: {
    id: 'finance',
    name: 'Finance',
    path: '/finance',
    icon: 'DollarSign',
    description: 'Budgets, dépenses et factures',
    level: 1,
  },
  HSE: {
    id: 'hse',
    name: 'HSE',
    path: '/hse',
    icon: 'AlertCircle',
    description: 'Hygiène, Sécurité, Environnement',
    level: 2,
  },
  ENGINS: {
    id: 'engins',
    name: 'Engins & Parc',
    path: '/engins',
    icon: 'Truck',
    description: 'Maintenance et gestion des équipements',
    level: 2,
  },
} as const;

export type ModuleId = keyof typeof MODULES;

export const PRIMARY_MODULES = Object.values(MODULES)
  .filter(m => m.level === 1)
  .sort((a, b) => {
    const order = ['DASHBOARD', 'CHANTIERS', 'RAPPORTS', 'FINANCE'];
    return order.indexOf(a.id.toUpperCase()) - order.indexOf(b.id.toUpperCase());
  });

export const SECONDARY_MODULES = Object.values(MODULES)
  .filter(m => m.level === 2);

export const ALL_MODULES = Object.values(MODULES);
