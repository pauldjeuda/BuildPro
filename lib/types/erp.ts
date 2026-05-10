/**
 * Types principaux de l'ERP BUILDPRO
 */

export enum ChantierStatus {
  PREVISIONNEL = 'previsionnel',
  LANCE = 'lance',
  EN_COURS = 'en_cours',
  SUSPENDU = 'suspendu',
  TERMINE = 'termine',
  CLOTURE = 'cloture',
}

export interface Chantier {
  id: string;
  numero: string;
  nom: string;
  adresse: string;
  client: string;
  status: ChantierStatus;
  dateDebut: Date;
  dateFinPrevue: Date;
  dateFinReelle?: Date;
  chefEquipe: string;
  budget: number;
  deptActuel: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RapportStatus {
  BROUILLON = 'brouillon',
  SOUMIS = 'soumis',
  VALIDE = 'valide',
  REJETE = 'rejete',
}

export interface RapportJournalier {
  id: string;
  chantier: string;
  date: Date;
  status: RapportStatus;
  meteo: string;
  effectifs: number;
  travaux: string;
  incidents?: string;
  observations?: string;
  photos: string[];
  auteur: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum StockStatus {
  DISPONIBLE = 'disponible',
  EN_PENURIE = 'en_penurie',
  EPUISE = 'epuise',
}

export interface StockItem {
  id: string;
  reference: string;
  nom: string;
  description: string;
  quantite: number;
  quantiteMin: number;
  unite: string;
  prix: number;
  emplacement: string;
  status: StockStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMouvement {
  id: string;
  item: string;
  type: 'entree' | 'sortie' | 'ajustement';
  quantite: number;
  reference?: string;
  chantier?: string;
  motif?: string;
  date: Date;
}

export enum AchatStatus {
  DEMANDE = 'demande',
  VALIDEE = 'validee',
  COMMANDEE = 'commandee',
  LIVREE = 'livree',
  FACTUREE = 'facturee',
}

export interface CommandeAchat {
  id: string;
  numero: string;
  status: AchatStatus;
  fournisseur: string;
  dateCreation: Date;
  dateCommandee?: Date;
  dateLivraison?: Date;
  items: CommandeItem[];
  montantTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommandeItem {
  id: string;
  item: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  montant: number;
}

export enum IncidentStatus {
  DECLARE = 'declare',
  ENQUETE = 'enquete',
  ACTIONS = 'actions',
  CLOS = 'clos',
}

export interface Incident {
  id: string;
  chantier: string;
  date: Date;
  type: string;
  description: string;
  severity: 'basse' | 'moyenne' | 'haute' | 'critique';
  status: IncidentStatus;
  assigneA?: string;
  actionsCorrectives: ActionCorrective[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionCorrective {
  id: string;
  description: string;
  responsable: string;
  dateEcheance: Date;
  statut: 'ouverte' | 'fermee';
  dateCompletion?: Date;
}

export interface Engin {
  id: string;
  reference: string;
  type: string;
  marque: string;
  modele: string;
  dateAcquisition: Date;
  valeur: number;
  chantierActuel?: string;
  horaire: number;
  carburant: number;
  maintenance: MaintenanceItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceItem {
  id: string;
  date: Date;
  type: string;
  description: string;
  cout: number;
  prochaine?: Date;
}

export interface KPI {
  id: string;
  nom: string;
  valeur: number;
  unite: string;
  tendance?: 'hausse' | 'baisse';
  pourcentage?: number;
  period: 'jour' | 'semaine' | 'mois' | 'annee';
}
