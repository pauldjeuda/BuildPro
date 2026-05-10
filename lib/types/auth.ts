/**
 * Types pour système d'authentification et RBAC
 */

export enum UserRole {
  ADMIN = 'admin',
  DG = 'dg', // Directeur Général
  DAF = 'daf', // Directeur Administratif et Financier
  CDT = 'cdt', // Chef de Chantier/Travaux
  CHEF_EQUIPE = 'chef_equipe',
  OPERATEUR = 'operateur',
  MAGASINIER = 'magasinier',
  COMPTABLE = 'comptable',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Permissions par rôle
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: [
    'view_all',
    'edit_all',
    'delete_all',
    'manage_users',
    'manage_settings',
  ],
  [UserRole.DG]: [
    'view_dashboard',
    'view_finance',
    'view_chantiers',
    'approve_budgets',
  ],
  [UserRole.DAF]: [
    'view_finance',
    'manage_budgets',
    'manage_factures',
    'view_reports',
  ],
  [UserRole.CDT]: [
    'view_chantiers',
    'edit_chantiers',
    'create_rapports',
    'manage_stock_chantier',
    'view_engins',
  ],
  [UserRole.CHEF_EQUIPE]: [
    'view_chantiers',
    'create_rapports',
    'view_pointage',
  ],
  [UserRole.OPERATEUR]: [
    'create_rapports',
    'view_chantiers',
    'view_pointage',
  ],
  [UserRole.MAGASINIER]: [
    'view_stock',
    'manage_stock_mouvements',
    'create_inventaire',
  ],
  [UserRole.COMPTABLE]: [
    'view_finance',
    'manage_factures',
    'view_reports',
  ],
};
